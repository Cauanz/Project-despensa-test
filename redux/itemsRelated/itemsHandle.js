import dayjs from "dayjs";
import { db } from "../../firebase";
import { addDoc, collection, deleteDoc, getDocs, doc, getDoc, updateDoc, query } from "firebase/firestore";
import { doneSuccess, getError, getFailed, getRequest } from "./itemsSlice";
import {
	setName,
	setMarca,
	setCodigo,
	setImagem,
	setAltImagem,
	setId,
	setError,
	toggleForm,
} from "../../redux/itemsRelated/formSlice";

export const removeProduct = (setExpiring, id, quantity) => async (dispatch) => {
	try {
		const itemRef = doc(db, "items", id);
		const itemSnap = await getDoc(itemRef);

		if (itemSnap.data().quantidade > 1) {
			const newQuantity = itemSnap.data().quantidade - quantity;

			if (newQuantity <= 0) {
				await deleteDoc(doc(db, "items", id));
				dispatch(fetchItems());
				return;
			}

			await updateDoc(doc(db, "items", id), {
				quantidade: String(newQuantity),
			});
			dispatch(fetchItems());
			return;
		}

		await deleteDoc(doc(db, "items", id));
		console.log(`Produto ${id} Deletado com sucesso`);

		setExpiring((prev) => prev.filter((product) => product._id !== id));
		dispatch(fetchItems());
	} catch (error) {
		console.log("Erro ao remover o item", error);
	}
};

export const fetchProduct = () => async (dispatch, getState) => {
	const state = getState();
	const { name, marca, codigo } = state.form;

	console.log(name, marca, codigo);

	const url = `https://world.openfoodfacts.org/api/v0/product/${codigo}.json`;

	if (codigo === "") {
		return null;
	}

	try {
		let response = await fetch(url);
		if (!response.ok) {
			dispatch(getFailed("A requisição falhou"));
			console.error("A requisição falhou");
			return;
		}

		let data = await response.json();
		if (!data || !data.product) {
			dispatch(setError("Produto não encontrado"));
			return;
		}

		// console.log(data.product);
		let product = data.product;

		if (marca === "") {
			dispatch(setMarca(product.brands || ""));
		}

		if (name === "") {
			dispatch(setName(product.product_name || ""));
		}

		dispatch(setCodigo(product.code || codigo));
		dispatch(setId(product._id || codigo));
		dispatch(setImagem(product.image_url || ""));
		dispatch(setAltImagem(product.product_name || ""));
	} catch (error) {
		console.error("Erro na requisição: ", error);
	}
};

export const addItem = (e) => async (dispatch, getState) => {
	const state = getState();
	dispatch(getRequest());
	e.preventDefault();

	const { id, validade, name, marca, quantidade, codigo, imagem, altimagem } = state.form;

	const item = {
		id: id,
		name: name,
		validade: validade,
		marca: marca,
		quantidade: quantidade,
		imagem: imagem,
		alt: altimagem,
		codigo: codigo,
	};

	console.log(item);

	//*FILTRA SE JÁ EXISTE
	//TODO DEVERIA INCREMENTAR SE JÁ EXISTE, NÃO DIZER QUE JÁ EXISTE E É ISSO.
	const itemsRef = collection(db, "items");
	const items = await getDocs(itemsRef);

	for (const food of items.docs) {
		// console.log(food.data())
		if (food.data().id === id) {
			const foodRef = doc(itemsRef, food.id);
			// const foodDoc = await getDoc(foodRef);
			const updatedQuantidade = parseInt(food.data().quantidade) + parseInt(quantidade);

			await updateDoc(foodRef, {
				quantidade: String(updatedQuantidade),
			});

			dispatch(toggleForm());
			dispatch(fetchItems());
			return;
		}
	}

	try {
		const docRef = await addDoc(collection(db, "items"), item);
		console.log("Item adicionado com sucesso!", docRef.id);

		dispatch(toggleForm());
		dispatch(fetchItems());
	} catch (error) {
		console.log("Houve um erro ao tentar adicionar o item ao banco de dados", error);
	}
};

export const fetchItems = () => async (dispatch) => {
	dispatch(getRequest());

	try {
		const itemsQuery = await query(collection(db, "items"));
		const itemsSnapshot = await getDocs(itemsQuery);

		const itemsArray = itemsSnapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }));
		// console.log(query.docs.map(doc => console.log(doc.id))) //DEBUG

		dispatch(doneSuccess(itemsArray));
		// setItems(itemsArray);
	} catch (error) {
		dispatch(getError("Erro ao recuperar dados", error));
		console.log("Erro ao recuperar dados", error);
	}
};

async function fetchExpiringDate(days) {
	console.log(days);

	const ItemsRef = collection(db, "items");
	const itemsQuery = await getDocs(ItemsRef);

	const produtosVencidos = [];

	itemsQuery.docs.map((item) => {
		const itemData = item.data();

		if (dayjs(itemData.validade) < dayjs()) {
			produtosVencidos.push(itemData);
		}
	});
	return produtosVencidos;
}

await fetchExpiringDate(7);
