const fs = require('fs')

const args = process.argv
const nodesNum = parseInt(args[2])
const linksNum = parseInt(args[3])

// config timeInfo
const startTimestamp = "1541044800000"
const timeInterval = 24 * 60 * 60 * 1000
const totalSteps = 5

let nodesData = []
let linksData = []
let timeInfo = []
let linksSet = new Set()

for (let i = 0; i < nodesNum; i++) {
  nodesData.push({
    id: "" + i,
  })
}

for (let i = 0; i < linksNum; i++) {
  while (true) {
    let s = Math.floor(Math.random() * (nodesNum))
    let t = Math.floor(Math.random() * (nodesNum))
    while (s === t)
      t = Math.floor(Math.random() * (nodesNum))

    if (linksSet.has({ s: s, t: t }))
      continue
    else {
      linksSet.add({ s: s, t: t })
      linksData.push({
        id: "" + i,
        source: "" + s,
        target: "" + t,
        strength: 0.001 + Math.random() * 0.01
      })
      break
    }
  }
}

for (let i = 0; i < totalSteps; i++) {
  const links = new Set()
  const currNum = Math.floor(Math.random() * (linksNum))
  while (links.size < currNum) {
    links.add(Math.floor(Math.random() * (linksNum)))
  }
  const nodes = new Set()
  const linksArr = [...links]
  linksArr.map(l => {
    nodes.add(parseInt(linksData[l].target))
    nodes.add(parseInt(linksData[l].source))
  })
  const nodesArr = [...nodes]
  timeInfo.push({
    timestamp: "" + (parseInt(startTimestamp) + i * timeInterval),
    nodes: nodesArr,
    links: linksArr
  })
}

fs.writeFile(
  './nodesDataRaw.json',
  JSON.stringify(nodesData),
  'UTF-8',
  (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Generated nodes Data!')
    }
  }
)

fs.writeFile(
  './linksDataRaw.json',
  JSON.stringify(linksData),
  'UTF-8',
  (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Generated links Data!')
    }
  }
)

fs.writeFile(
  './timeInfo.json',
  JSON.stringify(timeInfo),
  'UTF-8',
  (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Generated timeInfo Data!')
    }
  }
)