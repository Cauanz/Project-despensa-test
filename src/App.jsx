import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Form from './components/Form';

function App() {

  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [marca, setMarca] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [validade, setValidade] = useState('');
  const [codigo, setCodigo] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const [id, setId] = useState('');

  function toggleForm() {
    setOpen(!open);
  }

  // function handleScan(err, result) {
  //   console.log(err, result);
  //   // setCodigo(result);
  // }

  async function fetchProduct() {
    const url = `https://world.openfoodfacts.org/api/v0/product/${codigo}.json`;

    if(codigo === ''){
      return null;
    }

    try {
      let response = await fetch(url);
      let data = await response.json();
      
      console.log(data.product);
      let product = data.product;

      if(marca === '') {
        setMarca(product.brands);
      }

      if(name === '') {
        setName(product.product_name)
      }

      setCodigo(product.code);
      setId(product._id);

    } catch (error) {
      console.error("Erro na requisição: ", error);
    }
  }


  async function fetchData(e) {
    e.preventDefault();
    const API_KEY = '10c3c896-2294-4835-91e9-7f3225128ee8';
    const url = `https://getpantry.cloud/apiv1/pantry/${API_KEY}/basket/despensa`;
    
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let item = JSON.stringify({
      "id": id,
      "name": name,
      "validade": validade,
      "marca": marca,
      "quantidade": quantidade,
      "codigo": codigo
    })

    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: item,
      redirect: 'follow'
    };

    // if()
    //TODO - Fazer a verificação de ID para garantir não adicionar 2 itens iguais, talvez contornar isso mudando a quantidade do mesmo item já que é o mesmo item

    try {
      let response = await fetch(url, requestOptions)
      let result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("Houve um erro ao tentar adicionar o item ao banco de dados", error)
    }
  }

  return (
    <>
      <NavBar onButtonClick={toggleForm} />
      <Form isOpen={open} onToggle={setOpen} name={name} setName={setName} validade={validade} setValidade={setValidade} brand={marca} setBrand={setMarca} quantidade={quantidade} setQuantidade={setQuantidade} codigo={codigo} setCodigo={setCodigo} isScanning={isScanning} setIsScanning={setIsScanning} handleFetch={fetchProduct} handleData={fetchData}/>
      <div className="list">
        <ul className="listItens">
        </ul>
      </div>
    </>
  )
}

export default App
