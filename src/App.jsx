import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Form from './components/Form';

function App() {

  const [open, setOpen] = useState(false)

  function toggleForm() {
    setOpen(!open);
  }

  return (
    <>
      <NavBar onButtonClick={toggleForm} />
      <Form onFormChange={open} onChange={setOpen} />
      <div className="list">
        <ul className="listItens">
        </ul>
      </div>
    </>
  )
}

export default App
