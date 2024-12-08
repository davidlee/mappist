import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Canvas } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Mappist</h1>
      <div id="stage">
      <Canvas />
      </div>
    </>
  )
}

export default App
