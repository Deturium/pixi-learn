import * as PIXI from 'pixi.js'

type IData = number[][]
const rawData: IData = require('@/data/email-Eu-core-temporal-week-diff.json')

const data = rawData.slice(0, 20).map(a => a.slice(0, 200))

const CANVAS_SIZE = {
  width: 1200,
  height: 800,
}

const app = new PIXI.Application({
  ...CANVAS_SIZE,
  backgroundColor: 0xffffff,
})

const lineChartContainer = new PIXI.Container()

const col = data.length
const row = data[0].length

function computeX(x: number) {
  return CANVAS_SIZE.width / col * x
}

function computeY(y: number) {
  return CANVAS_SIZE.height * (1 - y)
}

const pi_1_3 = Math.PI / 3
const pi_2_3 = Math.PI * 2 / 3
// copy from d3
function computeColor(t: number) {
  t = (0.5 - t) * Math.PI
  let x: number
  const r = 255 * (x = Math.sin(t)) * x
  const g = 255 * (x = Math.sin(t + pi_1_3)) * x
  const b = 255 * (x = Math.sin(t + pi_2_3)) * x

  return r << 16 | g << 8 | b
}

const colorMap: number[] = data[0].map(v => computeColor(v))

// draw points
for (let i = 0; i < col; i++) {
  for (let j = 0; j < row; j++) {
    const point = new PIXI.Graphics()
      .beginFill(colorMap[j])
      .drawCircle(0, 0, 2)

    point.x = computeX(i)
    point.y = computeY(data[i][j])

    lineChartContainer.addChild(point)
  }
}

// draw lines
for (let i = 1; i < col; i++) {
  for (let j = 0; j < row; j++) {
    const line = new PIXI.Graphics()
      .lineStyle(1, colorMap[j], 0.4)
      .moveTo(
        computeX(i),
        computeY(data[i][j])
      )
      .lineTo(
        computeX(i - 1),
        computeY(data[i - 1][j]),
      )

    lineChartContainer.addChild(line)
  }
}

const lineChart = new PIXI.Sprite(
  app.renderer.generateTexture(lineChartContainer, PIXI.SCALE_MODES.LINEAR)
)
lineChart.x = CANVAS_SIZE.width / 2
lineChart.y = CANVAS_SIZE.height / 2
lineChart.anchor.set(0.5)

app.stage.addChild(lineChart)

// board for brush
const board = new PIXI.Graphics()
  .beginFill(0, 0)
  .drawRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height)

app.stage.addChild(board)

board.interactive = true
board.buttonMode = false

let brushFlag = false
const brushPos = {
  x: 0,
  y: 0,
}

const brushStart = (event: PIXI.interaction.InteractionEvent) => {
  const global = event.data.global

  brushFlag = true
  brushPos.x = global.x
  brushPos.y = global.y

  board.removeChildren()
}

const brushEnd = (_: PIXI.interaction.InteractionEvent) => {
  brushFlag = false
}

const brushMove = (event: PIXI.interaction.InteractionEvent) => {
  if (!brushFlag) {
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

export {
  app as default
}
