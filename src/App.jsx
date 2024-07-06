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
  const [imagem, setImagem] = useState('');
  const [altimagem, setAltImagem] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const [id, setId] = useState('');

  const [items, setItems] = useState([]);
  const [expiring, setExpiring] = useState([])

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

      setCodigo(product.code || codigo);
      setId(product._id || codigo);
      setImagem(product.image_url || '');
      setAltImagem(product.product_name || '');

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
      "imagem": imagem,
      "alt": altimagem,
      "codigo": codigo
    };
    
    //TODO - Aumentar quantidade/somar com quantidade de itens a adicionar caso item já exista no DB

    const items = await getDocs(collection(db, 'items'));
    for(const food of items.docs) {
      // console.log(food.data().id)
      if(food.data().id === item.id) {
        console.error("Item já existe!", food.data());
      }
    }

    try {
      const docRef = await addDoc(collection(db, 'items'), item);
      console.log('Item adicionado com sucesso!', docRef.id);
      toggleForm();
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

  useEffect(() => {
    setExpiring(getExpiringItems(items, 7));
  }, [items])

  useEffect(() => {
    console.log(expiring)
    expiring.map((item) => {
      console.log(item)
    })
  }, [expiring])

  const getExpiringItems = (items, days) => {
    const today = new Date();
    const day = new Date(today);
    day.setDate(today.getDate() + days);

    const expiringProducts = items.filter(item => {
      const validityDate = new Date(item.validade);
      return validityDate <= day;
    })

    return expiringProducts;
  }

  return (
    <>
      <NavBar onButtonClick={toggleForm} expiringItems={expiring} />
      
      <Form isOpen={open} onToggle={setOpen} name={name} setName={setName} validade={validade} setValidade={setValidade} brand={marca} setBrand={setMarca} quantidade={quantidade} setQuantidade={setQuantidade} codigo={codigo} setCodigo={setCodigo} isScanning={isScanning} setIsScanning={setIsScanning} handleFetch={fetchProduct} handleData={fetchData}/>
      
      <div className="list">
        
        <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">Itens na despensa</h2>
      <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {items.map((item) => (
              <div key={item.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={item.imagem}
                    alt={item.alt}
                    className="h-80 w-full object-contain object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.name}
                      </a>
                    </h3>
                    {/* <p className="mt-1 text-sm text-gray-500">{item.color}</p> */}
                  </div>
                  <p className="text-sm font-medium text-gray-900">Quantidade: {item.quantidade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
