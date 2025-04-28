import "./Form.css";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { addItem, fetchProduct } from "../../redux/itemsRelated/itemsHandle";
import PropTypes from "prop-types";
// import { BarcodeScanner } from 'react-barcode-scanner';
import { useDispatch, useSelector } from "react-redux";
import {
	setName,
	setValidade,
	setQuantidade,
	setMarca,
	setCodigo,
	toggleForm,
} from "../../redux/itemsRelated/formSlice";

export default function Form({ error }) {
	const dispatch = useDispatch();

	const { name, validade, quantidade, marca, codigo, open } = useSelector((state) => state.form);

	const handleFetch = () => {
		dispatch(fetchProduct());
	};

	const handleData = (e) => {
		dispatch(addItem(e));
	};

	return (
		<Dialog className="relative z-10" open={open} onClose={() => dispatch(toggleForm())}>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
					>
						<form className="m-6">
							<div className="space-y-12">
								<div className="border-b border-gray-900/10 pb-12">
									<h2 className="text-base font-semibold leading-7 text-gray-900">Adicionar item</h2>
									<p className="mt-1 text-sm leading-6 text-gray-600">
										Complete as informações do item que deseja adicionar ao estoque
									</p>

									<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
										<div className="sm:col-span-4">
											<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
												Nome
											</label>
											<div className="mt-2">
												<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
													<input
														type="text"
														name="name"
														id="name"
														value={name}
														onChange={(e) => dispatch(setName(e.target.value))}
														autoComplete="name"
														className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
														placeholder="Farinha de trigo"
													/>
												</div>
											</div>
										</div>

										<div className="col-span-full">
											<label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
												Data de validade
											</label>
											<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
												<input
													type="date"
													name="date"
													id="date"
													value={validade}
													onChange={(e) => dispatch(setValidade(e.target.value))}
													autoComplete="date"
													className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
													placeholder="Farinha de trigo"
												/>
											</div>
										</div>

										<div className="col-span-full">
											<label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
												Marca
											</label>
											<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
												<input
													type="text"
													name="brand"
													id="brand"
													value={marca}
													onChange={(e) => dispatch(setMarca(e.target.value))}
													autoComplete="brand"
													className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
													placeholder="Nova Holanda"
												/>
											</div>
										</div>

										<div className="col-span-full">
											<label htmlFor="quantidade" className="block text-sm font-medium leading-6 text-gray-900">
												Quantidade
											</label>
											<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
												<input
													type="number"
													name="quantidade"
													id="quantidade"
													value={quantidade}
													onChange={(e) => dispatch(setQuantidade(e.target.value))}
													autoComplete="quantidade"
													className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
													placeholder="0"
												/>
											</div>
										</div>

										<div className="col-span-full">
											<label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
												Código de barras
											</label>
											<div className="mt-2 flex items-center gap-x-3 h-6">
												{/* <button
                                    type="button"
                                    disabled={true} //TEMPORARIO ATÉ ARRUMAR LEITORES DE CÓDIGO QUE FUNCIONEM
                                    onClick={() => setIsScanning(true)}
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 absolute">
                                    Adicionar
                                 </button>

                                 { isScanning && (
                                    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50" onClick={() => setIsScanning(false)}>
                                       <div className="modal h-96 w-96 overflow-auto">
                                          <div className="item flex justify-center items-center h-full">

                                             {/* //TODO - Leitores de código de barra usando a camera estão quebrados, nenhum que achei é facil de implementar ou não vale a pena tentar

                                             {/* //* por enquanto somente por entrada manual

                                             <BarcodeScanner 
                                                width={300}
                                                height={300}
                                                value={codigo}
                                                onCapture={() => {handleScan(), setIsScanning(false)}}
                                             />

                                          </div>
                                       </div>
                                 </div>
                                 )} */}
											</div>
											<div>
												<label htmlFor="bar-code" className="mt-1 text-sm leading-6 text-gray-600">
													Ou adicione manualmente
												</label>
												<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
													<input
														type="number"
														name="bar-code"
														id="bar-code"
														value={codigo}
														onBlur={handleFetch}
														onChange={(e) => dispatch(setCodigo(e.target.value))}
														className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
														placeholder="01234567891011"
													/>
												</div>
												{error && error !== "" && <p className="mt-1 text-sm text-red-500">{error}</p>}
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="mt-6 flex items-center justify-end gap-x-6">
								<button
									type="button"
									className="text-sm font-semibold leading-6 text-gray-900"
									onClick={() => dispatch(toggleForm())}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									onClick={(e) => handleData(e)}
								>
									Save
								</button>
							</div>
						</form>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}

Form.propTypes = {
	isOpen: PropTypes.bool,
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
	error: PropTypes.string,
};
