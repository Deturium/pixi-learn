import * as PIXI from 'pixi.js'
import { WEBGL_WIDTH, WEBGL_HEIGHT } from '@/constants'

type IData = number[][]
const data1: IData = require('@/data/email-Eu-core-temporal-week-diff.json')

const data = data1.slice(0, 5)

const app = new PIXI.Application(WEBGL_WIDTH, WEBGL_HEIGHT, {
  backgroundColor: 0xffffff,
})
document.body.appendChild(app.view)


// const point = new PIXI.Graphics()
//   .beginFill(0x66ccff)
//   .drawCircle(0, 0, 2)
// const texture = app.renderer.generateTexture(point, PIXI.SCALE_MODES.LINEAR)

const container = new PIXI.Container()

const col = data.length
const row = data[0].length

function computeX(x: number) {
  return WEBGL_WIDTH / col * x + 50
}

function computeY(y: number) {
  return (WEBGL_HEIGHT - 80) * (0.7 - y) + 40
}

const pi_1_3 = Math.PI / 3
const pi_2_3 = Math.PI * 2 / 3

function computeColor(t: number) {
  t = (0.5 - t) * Math.PI
  let x: number
  const r = 255 * (x = Math.sin(t)) * x
  const g = 255 * (x = Math.sin(t + pi_1_3)) * x
  const b = 255 * (x = Math.sin(t + pi_2_3)) * x

  return r << 16 | g << 8 | b
}

const colorMap: number[] = data[0].map(v => computeColor(v))

for (let i = 0; i < col; i++) {
  for (let j = 0; j < row; j++) {
    const x = computeX(i)
    const y = computeY(data[i][j])

    // const sprite = new PIXI.Sprite(texture)
    // sprite.anchor.set(0.5)
    // sprite.x = x
    // sprite.y = y

    const point = new PIXI.Graphics()
      .beginFill(colorMap[j])
      .drawCircle(0, 0, 2)

    point.x = x
    point.y = y
    container.addChild(point)

    if (i >= 1) {
      const line = new PIXI.Graphics()

      line
        .lineStyle(1, colorMap[j], 0.4)
        .moveTo(x, y)
        .lineTo(
          computeX(i - 1),
          computeY(data[i - 1][j]),
        )

      container.addChild(line)
    }
  }
}

app.stage.addChild(container)

const board = new PIXI.Graphics()
  .beginFill(0, 0)
  .drawRect(0, 0, WEBGL_WIDTH, WEBGL_HEIGHT)

app.stage.addChild(board)

board.interactive = true
board.buttonMode = false

let brushPos = {
  flag: false,
  x: 0,
  y: 0,
}

const brushStart = (event: PIXI.interaction.InteractionEvent) => {
  const global = event.data.global

  brushPos = {
    flag: true,
    x: global.x,
    y: global.y,
  }

  board.removeChildren()
}

const brushEnd = (_: PIXI.interaction.InteractionEvent) => {
  brushPos.flag = false
}

const brushMove = (event: PIXI.interaction.InteractionEvent) => {
  if (!brushPos.flag) {
    return
  }

  board.removeChildren()
  const { x: x1, y: y1 } = brushPos
  const { x: x2, y: y2 } = event.data.global

  // if (x2 - x1 < 4 || y2 - y1 < 4) {
  //   return
  // }

  const rect = new PIXI.Graphics()
    .beginFill(0x66ccff, 0.3)
    .drawRect(x1, y1, x2 - x1, y2 - y1)

  board.addChild(rect)
}

board.on('pointerdown', brushStart)
board.on('pointermove', brushMove)
board.on('pointerup', brushEnd)

// app.ticker.add(_ => {
//
// })
