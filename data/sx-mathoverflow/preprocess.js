const fs = require('fs')
const d3 = require('d3')

const FILE_PATH = './sx-mathoverflow.txt'

// config timeInfo
// const startTimestamp = (new Date('2018-1-1')).getTime()
const timeInterval = 90 * 24 * 60 * 60 * 1000

const nodes = []
const links = []
const timeInfo = []
let linkId = 0

fs.readFile(
  FILE_PATH,
  (err, data) => {
    if (err) {
      console.error(err)
    } else {
      const dataStr = data.toString()
      const timeInfoMap = new Map()
      // const currentNodesIdx = []
      // const currentEdgesIdx = []

      dataStr.split('\n').map((term) => {
        if (term.length > 0) {
          arr = term.split(' ')

          const node1 = {
            id: arr[0]
          }
          const node2 = {
            id: arr[1]
          }
          if (!nodes.find((n) => {
            return n.id === node1.id
          })) {
            nodes.push(node1)
          }
          if (!nodes.find((n) => {
            return n.id === node2.id
          })) {
            nodes.push(node2)
          }

          // if (!currentNodesIdx.find((n) => {
          // return n === node.id
          // })) {
          // currentNodesIdx.push(node)
          // }
          // if (!currentNodesIdx.find((n) => {
          // return n === node.id
          // })) {
          // currentNodesIdx.push(node)
          // }

          let currentEdgeId

          const foundLink = links.find((l) => {
            return l.source === arr[0] && l.target === arr[1] ||
              l.source === arr[1] && l.target === arr[0]
          })

          if (foundLink) {
            currentEdgeId = foundLink.id
            // link.strength += 0.01 // TODO: strength default value
            // if (!currentEdgesIdx.find((l) => {
            // return l.source === arr[0] && l.target === arr[1] ||
            // l.source === arr[1] && l.target === arr[0]
            // })) {
            // currentEdgesIdx.push(foundLink.id)
            // }
          } else {
            currentEdgeId = linkId.toString()
            links.push({
              id: currentEdgeId,
              source: arr[0],
              target: arr[1],
              strength: 0.1 // TODO: strength default value
            })

            // currentEdgesIdx.push(foundLink.id)

            linkId++
          }

          // time info
          const timeMS = parseInt(arr[2]) * 1000
          // TODO: !!!Control date interval!!!
          // const date = new Date(timeMS)
          // date.setHours(0, 0, 0, 0)
          // date.setDate(1 + date.getDate() / 10)
          const date = new Date(Math.floor(timeMS / timeInterval) * timeInterval)

          const timestamp = date.getTime().toString()
          const timeInfoTerm = timeInfoMap.get(timestamp)
          if (timeInfoTerm) {
            timeInfoTerm.nodes = [...new Set([...timeInfoTerm.nodes, ...[arr[0], arr[1]]])]
            timeInfoTerm.links = [...new Set([...timeInfoTerm.links, ...[currentEdgeId,]])]
          } else {
            timeInfoMap.set(timestamp, {
              nodes: [arr[0], arr[1]],
              links: [currentEdgeId,]
            })
          }
        }
      })

      for (const [key, value] of timeInfoMap) {
        timeInfo.push({
          timestamp: key,
          nodes: value.nodes,
          links: value.links
        })
      }

      // write file

      fs.writeFile(
        './nodesDataRaw.json',
        JSON.stringify(nodes),
        'UTF-8',
        (err) => {
          if (err) {
            console.error(err)
          } else {
            console.log('write to nodesDataRaw.json')
          }
        }
      )

      fs.writeFile(
        './linksDataRaw.json',
        JSON.stringify(links),
        'UTF-8',
        (err) => {
          if (err) {
            console.error(err)
          } else {
            console.log('write to linksDataRaw.json')
          }
        }
      )

      fs.writeFile(
        './timeInfo.json',
        JSON.stringify(timeInfo),
        'UTF-8',
        (err) => {
          if (err) {
            console.error(err)
          } else {
            console.log('write to timeInfo.json')
          }
        }
      )
    }
  }
)