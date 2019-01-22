import * as d3 from 'd3'
import EE from '@/EventEmitter'

import { TimeInfo } from '@my/data'
const timeInfoData: TimeInfo[] = require('../../../data/college-msg/timeInfo.json')

const TIMELINE_WIDTH = 1200
const TIMELINE_HEIGHT = 100
const TIMELINE_MARGIN = {
  top: 20, right: 40, bottom: 20, left: 40
}
const TIMELINE_INNER_WIDTH = TIMELINE_WIDTH
const TIMELINE_INNER_HEIGHT = TIMELINE_HEIGHT - TIMELINE_MARGIN.top - TIMELINE_MARGIN.bottom

const timeIntervalBegin = new Date(parseInt(timeInfoData[0].timestamp))
const timeIntervalEnd = new Date(parseInt(timeInfoData[timeInfoData.length - 1].timestamp))

console.log(timeIntervalBegin)
console.log(timeIntervalEnd)

const timeLineXAxis = d3.scaleTime()
  .domain([timeIntervalBegin, timeIntervalEnd]) // TODO: timeline time, only for test
  .rangeRound([0, TIMELINE_INNER_WIDTH])

function drawTimeline(svgElement: SVGSVGElement) {
  const timeLineSVG = d3.select(svgElement)

  timeLineSVG
    .attr('width', TIMELINE_WIDTH)
    .attr('height', TIMELINE_HEIGHT)

  timeLineSVG
    .append("g")
    .attr("transform", "translate(" + TIMELINE_MARGIN.left + "," + TIMELINE_MARGIN.top + ")")


  timeLineSVG.append("g")
    .attr("class", "axis axis--grid")
    .attr("transform", "translate(0," + TIMELINE_INNER_HEIGHT + ")")
    .call(d3.axisBottom(timeLineXAxis)
      .ticks(d3.timeWeek)
      .tickSize(-TIMELINE_INNER_HEIGHT)
      .tickFormat(_ => '')
    )
    .selectAll(".tick")
    .classed("tick--minor", (d: Date) => {
      return d.getHours() !== 0
    })

  timeLineSVG.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + TIMELINE_INNER_HEIGHT + ")")
    .call(d3.axisBottom(timeLineXAxis)
      .ticks(d3.timeWeek)
      .tickPadding(0))
    .attr("text-anchor", null)
    .selectAll("text")
    .attr("x", 6)

  timeLineSVG.append("g")
    .attr("class", "brush")
    .call(d3.brushX()
      .extent([[0, 0], [TIMELINE_INNER_WIDTH, TIMELINE_INNER_HEIGHT]])
      .on("end", brushended)
    )
}

function brushended() {
  if (!d3.event.sourceEvent) return // Only transition after input.
  if (!d3.event.selection) return // Ignore empty selections.
  var d0 = d3.event.selection.map(timeLineXAxis.invert),
    d1 = d0.map(d3.timeWeek.round)

  // If empty when rounded, use floor & ceil instead.
  if (d1[0] >= d1[1]) {
    d1[0] = d3.timeMonth.floor(d0[0])
    d1[1] = d3.timeMonth.offset(d1[0])
  }

  // updateTimeSelection(d1[0], d1[1])
  EE.emit('UPDATE_TIME_SELECTION', d1[0], d1[1])

  d3.select(this).transition().call(d3.event.target.move, d1.map(timeLineXAxis))
}

export {
  drawTimeline
}
