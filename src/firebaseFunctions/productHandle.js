import dayjs from 'dayjs';
import { db } from '../../firebase';
import { addDoc, collection, deleteDoc, getDocs, doc, getDoc, updateDoc, query } from 'firebase/firestore';

//TODO - TALVEZ ADICIONAR UM GERENCIADOR DE ESTADO EXTERNO, ENTÃO O FETCHITEMS SEMPRE IRA ATUALIZAR OS ITEMS NO FRONT SEM DEPENDER DO SETITEMS

export async function removeProduct(setExpiring, id, quantity) {
  try {
    const itemRef = doc(db, 'items', id);
    const itemSnap = await getDoc(itemRef);

    if(itemSnap.data().quantidade > 1) {
      const newQuantity = itemSnap.data().quantidade - quantity;

      if(newQuantity <= 0) {
        await deleteDoc(doc(db, "items", id));
        fetchItems();
        return;
      }

      await updateDoc(doc(db, "items", id), {
        quantidade: String(newQuantity)
      })
      fetchItems();
      return;
    }

    await deleteDoc(doc(db, "items", id));

    console.log(`Produto ${id} Deletado com sucesso`)

    setExpiring(prev => prev.filter(product => product._id !== id));
    fetchItems();
  } catch (error) {
    console.log("Erro ao remover o item", error)
  }
}

export async function fetchProduct(codigo, name, marca, setMarca, setName, setCodigo, setId, setImagem, setAltImagem, setError) {
  const url = `https://world.openfoodfacts.org/api/v0/product/${codigo}.json`;

  console.log(codigo, name, marca);

  if(codigo === ''){
    return null;
  }

  try {
    let response = await fetch(url);
    if (!response.ok) {
      console.error('A requisição falhou');
      return;
    }
    
    let data = await response.json();
    if (!data || !data.product) {
      setError("Produto não encontrado");
      return;
    }

    // console.log(data.product);
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

export async function addItem(e, id, validade, marca, name, quantidade, imagem, altimagem, codigo, toggleForm) {
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
  
  //*FILTRA SE JÁ EXISTE
  //TODO DEVERIA INCREMENTAR SE JÁ EXISTE, NÃO DIZER QUE JÁ EXISTE E É ISSO.
  const items = await getDocs(collection(db, 'items'));

  for(const food of items.docs) {
    // console.log(food.data())
    if(food.data().id === id) {

      const foodRef = doc(db, "items", food.id);
      // const foodDoc = await getDoc(foodRef);

      const updatedQuantidade = parseInt(food.data().quantidade) + parseInt(quantidade);

      await updateDoc(foodRef, {
        quantidade: String(updatedQuantidade)
      });

      toggleForm();
      fetchItems();
      return;
    }
  }

  try {
    const docRef = await addDoc(collection(db, 'items'), item);
    console.log('Item adicionado com sucesso!', docRef.id);

    toggleForm();
    fetchItems();
  } catch (error) {
    console.log("Houve um erro ao tentar adicionar o item ao banco de dados", error)
  }
}

export async function fetchItems(setItems){
  try {
    const itemsQuery = await query(collection(db, 'items'));
    const itemsSnapshot = await getDocs(itemsQuery);
    console.log(itemsSnapshot);

    const itemsArray = itemsSnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
    // console.log(query.docs.map(doc => console.log(doc.id))) //DEBUG
    
    setItems(itemsArray);
  } catch (error) {
    console.log("Erro ao recuperar dados", error);
  }
}

async function fetchExpiringDate(days) {

  const ItemsRef = collection(db, 'items');
  const itemsQuery = await getDocs(ItemsRef);

  const produtosVencidos = [];

  itemsQuery.docs.map((item) => {
    const itemData = item.data();

    if(dayjs(itemData.validade) < dayjs()){
      produtosVencidos.push(itemData);
    }
  });
  return produtosVencidos;
}

console.log(await fetchExpiringDate(7));