import { useState } from 'react'
import { useAuthentication } from '../services/authService'
import Title from './Title'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const user = useAuthentication()

  return (
    <>
      <Title />
    </>
  )
}

export default App
