import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Form from "./components/Form";
import { removeProduct, fetchItems, fetchExpiringDate } from "../redux/itemsRelated/itemsHandle";
import Modal from "./components/Modal";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function App() {
	const dispatch = useDispatch();

	// const [isScanning, setIsScanning] = useState(false);
	// const [notifications, setNotifications] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [removeItem, setRemoveItem] = useState({});
	// const [expiring, setExpiring] = useState([]);

	const { items } = useSelector((state) => state.items);

	//* TALVEZ TERIA QUE CRIAR UM REGISTRO MAIS ROBUSTO DE CADA ITEM DO DB PARA PODER ADICIONAR FUNÇÕES MAIS AVANÇADAS OU MAIS TRABALHADAS, TIPO VALIDADE, MULTIPLOS ITENS COM DATA DE VALIDADE DIFERENTES EM ARRAY ETC.

	//TODO - TUDO ESTÁ "PRONTO", REFATORAR UI COM UMA UILIB NOVA COMO CHAKRA OU ANT DESIGN E FINALIZAR

	useEffect(() => {
		dispatch(fetchItems());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchExpiringDate(7));
	}, [dispatch]);

	// const getExpiringItems = (items, days) => {
	// 	const today = new Date();
	// 	const day = new Date(today);
	// 	day.setDate(today.getDate() + days);

	// 	const expiringProducts = items.filter((item) => {
	// 		const validityDate = new Date(item.validade);
	// 		return validityDate <= day;
	// 	});

	// 	return expiringProducts;
	// };

	const handleRemove = (item) => {
		if (item.quantidade > 1) {
			setRemoveItem(item);
			setOpenModal(true);
		} else {
			dispatch(removeProduct(item._id, 1));
		}
	};

	return (
		<>
			<NavBar />

			<Form removeItem={removeProduct} />

			<div className="list">
				<div className="bg-white">
					<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
						<Modal open={openModal} setOpen={setOpenModal} item={removeItem} />

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

									<button
										type="button"
										title="Remover"
										className="relative bg-red-600 p-2 rounded-lg"
										onClick={() => handleRemove(item)}
									>
										Remover
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;

App.propTypes = {
	items: PropTypes.array,
	removeItem: PropTypes.object,
	setOpen: PropTypes.func,
	setExpiring: PropTypes.func,
	onToggle: PropTypes.func,
	name: PropTypes.string,
	setName: PropTypes.func,
	validade: PropTypes.string,
	setValidade: PropTypes.func,
	quantidade: PropTypes.string,
	setQuantidade: PropTypes.func,
	brand: PropTypes.string,
	setBrand: PropTypes.func,
	codigo: PropTypes.string,
	setCodigo: PropTypes.func,
	handleFetch: PropTypes.func,
	handleData: PropTypes.func,
};
