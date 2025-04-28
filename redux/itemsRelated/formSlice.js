import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	name: "",
	marca: "",
	quantidade: "",
	validade: "",
	codigo: "",
	imagem: "",
	altImagem: "",
	error: "",
	id: "",
	open: false,
};

const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		setName: (state, action) => {
			state.name = action.payload;
		},
		setMarca: (state, action) => {
			state.marca = action.payload;
		},
		setQuantidade: (state, action) => {
			state.quantidade = action.payload;
		},
		setValidade: (state, action) => {
			state.validade = action.payload;
		},
		setCodigo: (state, action) => {
			state.codigo = action.payload;
		},
		setImagem: (state, action) => {
			state.imagem = action.payload;
		},
		setAltImagem: (state, action) => {
			state.altimagem = action.payload;
		},
		setIsScanning: (state, action) => {
			state.isScanning = action.payload;
		},
		setId: (state, action) => {
			state.id = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
		resetForm: (state) => {
			Object.assign(state, initialState);
		},
		toggleForm: (state) => {
			state.name = "";
			state.marca = "";
			state.quantidade = "";
			state.validade = "";
			state.codigo = "";
			state.imagem = "";
			state.altImagem = "";
			state.id = "";
			state.open = false;
		},
		toggleOpen: (state) => {
			state.open = true;
		},
	},
});

export const {
	setName,
	setMarca,
	setQuantidade,
	setValidade,
	setCodigo,
	setImagem,
	setAltImagem,
	setIsScanning,
	setError,
	resetForm,
	setId,
	toggleForm,
	toggleOpen,
} = formSlice.actions;

export default formSlice.reducer;
