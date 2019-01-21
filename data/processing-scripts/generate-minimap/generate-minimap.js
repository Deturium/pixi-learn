const GRAPH_WIDTH = 1200 * 4
const GRAPH_HEIGHT = 900 * 4
const DATA_DIR = 'sx-mathoverflow'
const NODES_FILE_PATH = `./../../${DATA_DIR}/nodesData.json`
const LINKS_FILE_PATH = `./../../${DATA_DIR}/linksData.json`
const TIMEINFO_FILE_PATH = `./../../${DATA_DIR}/timeInfo.json`

const svg = d3.select('body').append('svg')
  .attr('width', GRAPH_WIDTH)
  .attr('height', GRAPH_HEIGHT)

const nextBtn = document.createElement('button')
nextBtn.innerText = "NEXT"
const saveBtn = document.createElement('button')
saveBtn.innerText = "SAVE"
const nextSaveBtn = document.createElement('button')
nextSaveBtn.innerText = "NEXT & SAVE"
const autoBtn = document.createElement('button')
autoBtn.innerText = "AUTO"
document.querySelector('body').append(nextBtn)
document.querySelector('body').append(saveBtn)
document.querySelector('body').append(nextSaveBtn)
document.querySelector('body').append(autoBtn)

d3.json(NODES_FILE_PATH)
  .then((nodesData) => {
    d3.json(LINKS_FILE_PATH)
      .then(linksData => {
        d3.json(TIMEINFO_FILE_PATH)
          .then(timeInfoData => {
            let currentIdx = -1
            const nextOperation = () => {
              currentIdx++
              if (currentIdx >= timeInfoData.length) {
                alert("Already Last!")
              } else {
                drawGraph(timeInfoData[currentIdx], nodesData, linksData)
              }
            }
            const saveOperation = () => {
              if (currentIdx < timeInfoData.length)
                saveSvgAsPng(svg.node(), `${timeInfoData[currentIdx].timestamp}.png`);
            }
            const nextSaveOperation = () => {
              nextOperation()
              saveOperation()
            }
            const autoOperation = () => {
              const intervalId = setInterval(() => {
                if (currentIdx >= timeInfoData.length) {
                  clearInterval(intervalId)
                } else {
                  nextSaveOperation()
                }
              }, 300)
              if (currentIdx >= timeInfoData.length)
                nextSaveOperation()
            }

            nextBtn.onclick = nextOperation
            saveBtn.onclick = saveOperation
            nextSaveBtn.onclick = nextSaveOperation
            autoBtn.onclick = autoOperation

            // for (timeTerm of timeInfoData) {
            // drawGraph(timeTerm, nodesData, linksData)
            // saveImage(timeTerm.timestamp)
            // }
          })
      })
  })

function drawGraph(timeInfo, nodesData, linksData) {
  const validNodes = nodesData.filter((n) => timeInfo.nodes.includes(n.id))
  const validLinks = linksData.filter((l) => timeInfo.links.includes(l.id))

  svg.selectAll("*").remove();

  // links
  svg
    .append('g')
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.4)
    .attr('stroke-width', '2')
    .selectAll('line')
    .data(validLinks)
    .enter()
    .append('line')
    .attr('x1', (d) => d.source.x)
    .attr('y1', (d) => d.source.y)
    .attr('x2', (d) => d.target.x)
    .attr('y2', (d) => d.target.y)
  // .attr('stroke', 'gray')

  // points
  svg
    .append('g')
    .attr("stroke", "#fff")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 0.5)
    .selectAll('circle')
    .data(validNodes)
    .enter()
    .append('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', '4')
    .attr('fill', 'gray')
}
