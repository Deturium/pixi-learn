import React from 'react'

interface Props {
  timestamp: string
  onClick: (timestamp: string) => void
}

const Cell: React.FC<Props> = ({ timestamp, onClick }) => {
  const imgPath = `/static/minimaps/college-msg-minimap/${timestamp}.png`
  const dateStr = new Date(parseInt(timestamp)).toLocaleDateString()

  return (
    <div onClick={() => onClick(timestamp)}>
      <img
        style={{
          border: 'solid 1px',
          margin: 5,
          width: 200,
        }}
        src={imgPath}
      />
      <p style={{
        margin: 5,
        textAlign: "center"
      }}>
        {dateStr}
      </p>
    </div>
  )
}

export default Cell
