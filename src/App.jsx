import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Form from './components/Form';
import { set } from 'firebase/database';

function App() {

  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [marca, setMarca] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [validade, setValidade] = useState('');
  const [codigo, setCodigo] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const [id, setId] = useState('');

  function toggleForm() {
    setOpen(!open);
    setName('');
    setMarca('');
    setQuantidade('');
    setValidade('');
    setCodigo('');
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
      if (!response.ok) {
        throw new Error('A requisição falhou');
      }
      let data = await response.json();

      if (!data || !data.product) {
        console.error("Produto não encontrado na resposta");
        return;
      }

      console.log(data.product);
      let product = data.product;

      if(marca === '') {
        setMarca(product.brands || '');
      }

      if(name === '') {
        setName(product.product_name || '')
      }

      setCodigo(product.code || '');
      setId(product._id || '');

    } catch (error) {
      console.error("Erro na requisição: ", error);
    }
  }


  async function fetchData(e) {
    e.preventDefault();
    const API_KEY = '10c3c896-2294-4835-91e9-7f3225128ee8';
    const url = `https://getpantry.cloud/apiv1/pantry/${API_KEY}/basket/despensa`;


    //! NADA DAQUI PARA BAIXO ESTÁ FUNCIONANDO, POR ALGUM MOTIVO, ERRO ADICIONAR, ITEMS NÃO É UM ARRAY, ETC...
    try {
      const items = await fetch(url).then(response => response.json());
      console.log(items)
      const itemExists = items.some(item => item.id === id);
  
      if(itemExists){
        console.log('item já existe');
        return;
        //TODO - Fazer esse erro visual
      } else {
        items.push({
          "id": id,
          "name": name,
          "validade": validade,
          "marca": marca,
          "quantidade": quantidade,
          "codigo": codigo
        });

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
    
        let requestOptions = {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify({ items }),
          redirect: 'follow'
        };
  
  
        let updateResponse = await fetch(url, requestOptions)
        let updateResult = await updateResponse.json();
        console.log(updateResult);
      }      
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
