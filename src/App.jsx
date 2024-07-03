import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Form from './components/Form';
import { db } from '../firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

function App() {

  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [marca, setMarca] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [validade, setValidade] = useState('');
  const [codigo, setCodigo] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const [id, setId] = useState('');

  const [items, setItems] = useState([]);

  function toggleForm() {
    setOpen(!open);
    setName('');
    setMarca('');
    setQuantidade('');
    setValidade('');
    setCodigo('');
    setId('');
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

    const item = {
      "id": id,
      "name": name,
      "validade": validade,
      "marca": marca,
      "quantidade": quantidade,
      "codigo": codigo
    };
    
    //TODO - Aumentar quantidade/somar com quantidade de itens a adicionar caso item já exista no DB
    //TODO - Adicionar URL de imagem do produto no objeto e BD também :)

    const items = await getDocs(collection(db, 'items'));
    for(const food of items.docs) {
      // console.log(food.data().id)
      if(food.data().id === item.id) {
        throw new Error("Item já existe!");
      }
    }

    try {
      const docRef = await addDoc(collection(db, 'items'), item);
      console.log('Item adicionado com sucesso!', docRef.id);
      setId('');
    } catch (error) {
      console.log("Houve um erro ao tentar adicionar o item ao banco de dados", error)
    }
  }

  useEffect(() => {

    async function getData(){
      try {
        const query = await getDocs(collection(db, 'items'));
        const itemsArray = query.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(itemsArray);
      } catch (error) {
        console.log("Erro ao recuperar dados");
      }
    }

    getData();
  }, [])


  return (
    <>
      <NavBar onButtonClick={toggleForm} />
      <Form isOpen={open} onToggle={setOpen} name={name} setName={setName} validade={validade} setValidade={setValidade} brand={marca} setBrand={setMarca} quantidade={quantidade} setQuantidade={setQuantidade} codigo={codigo} setCodigo={setCodigo} isScanning={isScanning} setIsScanning={setIsScanning} handleFetch={fetchProduct} handleData={fetchData}/>
      <div className="list">
        <ul className="listItens">
          {items.map((item) => (
            //TODO - Criar UI bonita para os itens, e talvez adicionar foto com o outro TODO acima
            <li key={item.id}>{item.name} - {item.quantidade} - {item.marca} - {item.validade}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
