import React from 'react'
import ReactDOM from 'react-dom'

import Overview from '@/modules/Overview'
import MainGraph from '@/modules/MainGraph'

// global style
// import './style.css'

const App: React.FC = () => (
  <>
    <Overview />
    <MainGraph />
  </>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
