import React, { useEffect, useRef } from 'react'

import { drawTimeline } from './timeline'
import './style.css'

const SVGView: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (svgRef.current) {
      drawTimeline(svgRef.current)
    }
  }, [])

  const style: React.CSSProperties = {
    margin: 10,
  }

  return (
    <div style={style}>
      <svg ref={svgRef} />
    </div>
  )
}

export default React.memo(SVGView)
