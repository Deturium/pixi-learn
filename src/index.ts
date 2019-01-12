import * as PIXI from 'pixi.js'

const app = new PIXI.Application(800, 600, {
  backgroundColor: 0x66ccff
})
document.body.appendChild(app.view)

const basicText = new PIXI.Text('Hello world!')
basicText.x = 80
basicText.y = 60

app.stage.addChild(basicText)
