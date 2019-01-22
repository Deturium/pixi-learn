import React from 'react'
import HorizontalScroll from 'react-scroll-horizontal'

import Cell from './Cell'

import { TimeInfo } from '@my/data'
const timeInfoData: TimeInfo[] = require('../../../data/college-msg/timeInfo.json')

import EE from '@/EventEmitter'

const Minimap: React.FC = () => {

  const onClick = (timestamp: string) => {
    const startTime = new Date(parseInt(timestamp))
    const endTime = new Date(startTime.getTime() + 1)
    EE.emit('UPDATE_TIME_SELECTION', startTime, endTime)
  }

  const style = {
    width: 1200,
    height: 200,
    border: '2px solid'
  }

  return (
    <div style={style}>
      <HorizontalScroll>
        {timeInfoData.map(t => (
          <Cell
            key={t.timestamp}
            timestamp={t.timestamp}
            onClick={onClick}
          />
        ))}
      </HorizontalScroll>
    </div>
  )
}

export default Minimap
