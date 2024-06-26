import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Form from './components/Form';

function App() {

  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [marca, setMarca] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [codigo, setCodigo] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  function toggleForm() {
    setOpen(!open);
  }

  function handleScan(err, result) {
    console.log(err, result)
  }


  return (
    <>
      <NavBar onButtonClick={toggleForm} />
      <Form isOpen={open} onToggle={setOpen} name={name} setName={setName} brand={marca} setBrand={setMarca} quantidade={quantidade} setQuantidade={setQuantidade} codigo={codigo} setCodigo={setCodigo} isScanning={isScanning} setIsScanning={setIsScanning} handleScan={handleScan}/>
      <div className="list">
        <ul className="listItens">
        </ul>
      </div>
    </>
  )
}

export default App
