import "./Form.css";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import PropTypes from 'prop-types';
// import { BarcodeScanner } from 'react-barcode-scanner';

export default function Form({ isOpen, onToggle, name, setName, validade, setValidade, quantidade, setQuantidade, brand, setBrand, codigo, setCodigo, handleFetch, handleData, error }) {

return (
      <Dialog className="relative z-10" open={isOpen} onClose={() => onToggle(true)}>

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
                              onChange={(e) => setName(e.target.value)}
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
                              onChange={(e) => setValidade(e.target.value)}
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
                              value={brand}
                              onChange={(e) => setBrand(e.target.value)}
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
                              onChange={(e) => setQuantidade(e.target.value)}
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
                              <label htmlFor="bar-code" className="mt-1 text-sm leading-6 text-gray-600">Ou adicione manualmente</label>
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                 <input
                                 type="number"
                                 name="bar-code"
                                 id="bar-code"
                                 value={codigo}
                                 onBlur={handleFetch}
                                 onChange={(e) => setCodigo(e.target.value)}
                                 className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                 placeholder="01234567891011"
                                 />
                              </div>
                                 { error && error !== '' && <p className="mt-1 text-sm text-red-500">{error}</p>}
                           </div>
                           </div>
                     </div>
                  </div>

                  {/* <div className="border-b border-gray-900/10 pb-12">

                     <div className="mt-10 space-y-10">
                        
                        <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">Notificações</legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Notificações enviadas por email para seu celular/barra de notificações</p>
                        <div className="mt-6 space-y-6">
                           <div className="flex items-center gap-x-3">
                              <input
                              id="push-everything"
                              name="push-notifications"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                              Tudo
                              </label>
                              <p className="mt-1 text-xs leading-6 text-gray-600">Notificações sobre produtos próximos da validade, adições, remoções, estoque baixo etc...</p>
                           </div>
                           <div className="flex items-center gap-x-3">
                              <input
                              id="push-email"
                              name="push-notifications"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                              Somente validade próxima de vencimento
                              </label>
                           </div>
                           <div className="flex items-center gap-x-3">
                              <input
                              id="push-nothing"
                              name="push-notifications"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                              Sem notificações
                              </label>
                           </div>
                        </div>
                        </fieldset>
                     </div>
                  </div> */}
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => onToggle(false)}>
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleData}>
                     Save
                  </button>
                  </div>
            </form>
            </DialogPanel>
         </div>
      </div>
      </Dialog>
   )
}

Form.propTypes = {
   isOpen: PropTypes.bool,
   onToggle: PropTypes.bool,
   name: PropTypes.string,
   setName: PropTypes.string,
   validade: PropTypes.string,
   setValidade: PropTypes.string,
   quantidade: PropTypes.string,
   setQuantidade: PropTypes.string,
   brand: PropTypes.string,
   setBrand: PropTypes.string,
   codigo: PropTypes.string,
   setCodigo: PropTypes.string,
   handleFetch: PropTypes.func,
   handleData: PropTypes.func,
   error: PropTypes.string
}