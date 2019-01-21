const fs = require('fs')
const d3 = require('d3')

// read data
const config = require('./config.json')

const nodes = require(config.inputNodes)
const links = require(config.inputLinks)

const linkForce = d3
  .forceLink(links)
  .id((node) => node.id)
  // .strength((link) => link.strength)

const simulation = d3
  .forceSimulation(nodes)
  .force('link', linkForce)
  .force('charge', d3.forceManyBody().strength(config.forceStrength))
  .force('center', d3.forceCenter(config.graphWidth / 2, config.graphHeight / 2))

// const simulation = forceSimulation(nodes, links)

simulation
  .on('end', () => {
    // console.log(nodes)
    // console.log(links)
    fs.writeFile(
      config.outputNodes,
      JSON.stringify(nodes),
      'UTF-8',
      (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Write nodes data to file!')
        }
      }
    )
    fs.writeFile(
      config.outputLinks,
      JSON.stringify(links),
      'UTF-8',
      (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Write links data to file!')
        }
      }
    )
  })

// simulation.force('link').links(links)