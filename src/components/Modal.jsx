import { useState } from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { removeProduct } from "../../redux/itemsRelated/itemsHandle";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

export default function Modal({ open, setOpen, item }) {
	const dispatch = useDispatch();

	const [selectedItems, setSelectedItems] = useState(0);

	const handleSubmit = () => {
		dispatch(removeProduct(item._id, selectedItems));
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={setOpen} className="relative z-10">
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
					>
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div className="sm:flex sm:items-start">
								<div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
									<ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
								</div>
								<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
									<DialogTitle as="h3" className="text-base font-semibold text-gray-900">
										Remover itens
									</DialogTitle>
									<div className="mt-2">
										<p className="text-sm text-gray-500">Quantos itens voce quer remover?</p>
									</div>
								</div>
							</div>
						</div>

						<Listbox value={selectedItems} onChange={setSelectedItems}>
							<div className="relative mt-2">
								<ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
									<span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
										<span className="block truncate">{selectedItems}</span>
									</span>
									<ChevronUpDownIcon
										aria-hidden="true"
										className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
									/>
								</ListboxButton>

								<ListboxOptions
									transition
									className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
								>
									{Array.from({ length: item.quantidade }, (_, i) => i + 1).map((num) => (
										<ListboxOption
											key={num}
											value={num}
											className="group relative cursor-default select-none pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
										>
											<div className="flex items-center">
												<span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{num}</span>
											</div>
										</ListboxOption>
									))}
								</ListboxOptions>
							</div>
						</Listbox>

						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							<button
								type="button"
								onClick={() => handleSubmit()}
								className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
							>
								Remover
							</button>
							{/* <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button> */}

							<button
								type="button"
								data-autofocus
								onClick={() => setOpen(false)}
								className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
							>
								Fechar
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}

Modal.propTypes = {
	open: PropTypes.bool,
	setOpen: PropTypes.func,
	item: PropTypes.object,
	setExpiring: PropTypes.func,
};
