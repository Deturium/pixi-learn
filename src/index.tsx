import React from 'react'
import ReactDOM from 'react-dom'

import Overview from '@/modules/Overview'
import MainGraph from '@/modules/MainGraph'
import TimeLine from '@/modules/TimeLine'
import MiniMap from '@/modules/MiniMap'

// global style
// import './style.css'

const App: React.FC = () => (
  <>
    <Overview />
    <MainGraph />
    <TimeLine />
    <MiniMap />
  </>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
