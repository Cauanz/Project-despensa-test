import { useEffect, useState } from "react";
import "./App.css";
import {
	ButtonGroup,
	Button,
	Card,
	CardBody,
	CardFooter,
	ChakraProvider,
	Divider,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Form from "./components/Form";
import { removeProduct, fetchItems, fetchExpiringDate } from "../redux/itemsRelated/itemsHandle";
import Modal from "./components/Modal";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function App() {
	const dispatch = useDispatch();

	const [openModal, setOpenModal] = useState(false);
	const [removeItem, setRemoveItem] = useState({});

	const { items } = useSelector((state) => state.items);

	//* TALVEZ TERIA QUE CRIAR UM REGISTRO MAIS ROBUSTO DE CADA ITEM DO DB PARA PODER ADICIONAR FUNÇÕES MAIS AVANÇADAS OU MAIS TRABALHADAS, TIPO VALIDADE, MULTIPLOS ITENS COM DATA DE VALIDADE DIFERENTES EM ARRAY ETC.

	useEffect(() => {
		dispatch(fetchItems());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchExpiringDate(7));
	}, [dispatch]);

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
			<ChakraProvider>
				<NavBar />

				<Form removeItem={removeProduct} />

				<div className="list">
					<div className="bg-white">
						<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
							<Modal open={openModal} setOpen={setOpenModal} item={removeItem} />

							<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
								{items.map((item) => (
									<>
										<Card maxW="sm" key={item.id}>
											<CardBody>
												<Image src={item.imagem} alt={item.alt} borderRadius="lg" />
												<Stack mt="6" spacing="3">
													<Heading size="md">{item.name}</Heading>
													<Text color="blue.600" fontSize="2xl">
														Qtd: {item.quantidade}
													</Text>
												</Stack>
											</CardBody>
											<Divider />
											<CardFooter>
												<ButtonGroup spacing="2">
													<Button variant="outline" onClick={() => handleRemove(item)} colorScheme="red">
														Remover
													</Button>
												</ButtonGroup>
											</CardFooter>
										</Card>
									</>
								))}
							</div>
						</div>
					</div>
				</div>
			</ChakraProvider>
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
