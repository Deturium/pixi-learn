import React, { useEffect, useRef } from 'react'

type Props = {
  app: PIXI.Application
}

const PixiView: React.FC<Props> = ({ app }) => {
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (domRef.current) {
      domRef.current.appendChild(app.view)
    }
  }, [])

  // TODO: remove
  const style: React.CSSProperties = {
    fontSize: 0,
    margin: 10,
    width: 1200,
    border: '2px solid #6cf',
  }

  return (
    <div
      style={style}
      ref={domRef}
    />
  )
}

export default React.memo(PixiView)
