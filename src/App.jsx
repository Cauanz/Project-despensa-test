import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Form from './components/Form';
import { removeProduct, fetchProduct, addItem, fetchItems } from './firebaseFunctions/productHandle';
import Modal from './components/Modal';

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
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState([]);
  
  const [openModal, setOpenModal] = useState(false);
  
  const [removeItem, setRemoveItem] = useState([]);

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
    setAltImagem('')
    setImagem('')
    setId('');
  }

  //TODO TALVEZ TERIA QUE CRIAR UM REGISTRO MAIS ROBUSTO DE CADA ITEM DO DB PARA PODER ADICIONAR FUNÇÕES MAIS AVANÇADAS OU MAIS TRABALHADAS, TIPO VALIDADE, MULTIPLOS ITENS COM DATA DE VALIDADE DIFERENTES EM ARRAY ETC.

  useEffect(() => {
    fetchItems(setItems);
  }, []);

  useEffect(() => {
    setExpiring(getExpiringItems(items, 7));
  }, [items])

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

  useEffect(() => {
    if(codigo == '') {
      setError('');
    }
  }, [codigo])

  const handleRemove = (item) => {
    if (item.quantidade > 1) {
      setRemoveItem(item);
      setOpenModal(true);
    } else {
      removeProduct(setExpiring, item._id, 1);
    }
  };

  return (
    <>
      <NavBar onButtonClick={toggleForm} expiringItems={expiring}  />
      
      <Form 
        isOpen={open} 
        onToggle={setOpen} 
        name={name} 
        setName={setName} 
        validade={validade} 
        setValidade={setValidade} 
        brand={marca} 
        setBrand={setMarca} 
        quantidade={quantidade} 
        setQuantidade={setQuantidade} 
        codigo={codigo}
        setCodigo={setCodigo} 
        isScanning={isScanning} 
        setIsScanning={setIsScanning} 
        handleFetch={() => { fetchProduct(codigo, name, marca, setMarca, setName, setCodigo, setId, setImagem, setAltImagem, setError) }}
        error={error}
        handleData={(e) => addItem(e, id, validade, marca, name, quantidade, imagem, altimagem, codigo, toggleForm)} 
        removeItem={removeProduct}
      />
      
      <div className="list">
        {/* <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">Itens na despensa</h2> */}
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

            <Modal open={openModal} setOpen={setOpenModal} item={removeItem} setExpiring={setExpiring} />

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
                  <div className="mt-4 flex justify-between flex-col">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href="#">
                          {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                          {item.name}
                        </a>
                      </h3>
                      {/* <p className="mt-1 text-sm text-gray-500">{item.color}</p> */}
                    </div>
                    <p className="text-sm font-medium text-gray-900 flex justify-end">Qtd: {item.quantidade}</p>
                  </div>
                  
                  <button type='button' title='Remover' className='relative bg-red-600 p-2 rounded-lg' onClick={() => handleRemove(item)}>Remover</button>
                  {/* <button type='button' title='Remover' className='relative bg-red-600 p-2 rounded-lg' onClick={() => removeProduct(setExpiring, item._id)}>Remover</button> */}
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
