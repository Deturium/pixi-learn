import * as PIXI from 'pixi.js'
import EE from '@/EventEmitter'

import { Node, Link, TimeInfo } from '@my/data'

const linksData: Link[] = require('../../../data/college-msg/linksData.json')
const nodesData: Node[] = require('../../../data/college-msg/nodesData.json')
const timeInfoData: TimeInfo[] = require('../../../data/college-msg/timeInfo.json')


const CANVAS_SIZE = {
  width: 1200,
  height: 900,
}

const month = 6
const day = 24

const state = {
  startTime: new Date(2004, month - 1, day - 1),
  endTime: new Date(2004, month - 1, day + 1)
}

const app = new PIXI.Application({
  ...CANVAS_SIZE,
  backgroundColor: 0xeeeeee,
})

const nodesSet = new Set()
const linksSet = new Set()

/**
 * 计算在指定时间内的点线集合
 */
function computeVisibleSet(timeStart: Date, timeEnd: Date) {
  nodesSet.clear()
  linksSet.clear()

  timeInfoData
    .filter(term => {
      const time = parseInt(term.timestamp)
      return time >= timeStart.valueOf()
        && time < timeEnd.valueOf()
    })
    .forEach(term => {
      term.nodes.forEach(node => nodesSet.add(node))
      term.links.forEach(link => linksSet.add(link))
    })
}

/**
 * 画出力图
 */
function draw() {
  computeVisibleSet(state.startTime, state.endTime)

  const NODE_RADIUS = 2
  const LINE_THICKNESS = 0.7

  linksData
    .filter(link => linksSet.has(link.id))
    .forEach(link => {
      const line = new PIXI.Graphics()
        .lineStyle(LINE_THICKNESS, 0x888888, 0.7)
        .moveTo(link.source.x, link.source.y)
        .lineTo(link.target.x, link.target.y)

      app.stage.addChild(line)
    })

  nodesData
    .filter(node => nodesSet.has(node.id))
    .forEach(node => {
      const circle = new PIXI.Graphics()
        .lineStyle(0.5, 0xe0e0e0, 0.5)
        .beginFill(0x666666)
        .drawCircle(node.x, node.y, NODE_RADIUS)
        .endFill()

      app.stage.addChild(circle)
    })
}

draw()


function updateTimeSelection(timeStart: Date, timeEnd: Date) {
  state.startTime = timeStart
  state.endTime = timeEnd

  app.stage.removeChildren()
  draw()
}

EE.on('UPDATE_TIME_SELECTION', updateTimeSelection)


export default app
