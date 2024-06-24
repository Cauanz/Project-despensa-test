import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function Form({ onFormChange, onChange }) {


return (
      <Dialog className="relative z-10" open={onFormChange} onClose={onChange}>
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
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                           Nome
                        </label>
                        <div className="mt-2">
                           <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                              type="text"
                              name="username"
                              id="username"
                              autoComplete="username"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Farinha de trigo"
                              />
                           </div>
                        </div>
                        </div>

                        <div className="col-span-full">
                           <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                              Quantidade
                           </label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                              type="text"
                              name="username"
                              id="username"
                              autoComplete="username"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Farinha de trigo"
                              />
                           </div>
                        </div>

                        <div className="col-span-full">
                           <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                              Código de barras
                           </label>
                           <div className="mt-2 flex items-center gap-x-3">
                              <button
                                 type="button"
                                 className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                 Adicionar
                              </button>
                           </div>
                           <div className="mt-2">
                              <p className="mt-1 text-sm leading-6 text-gray-600">Ou adicione manualmente</p>
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                 <input
                                 type="text"
                                 name="username"
                                 id="username"
                                 autoComplete="username"
                                 className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                 placeholder="1002934857383"
                                 />
                              </div>
                           </div>
                           </div>
                     </div>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">

                     <div className="mt-10 space-y-10">
                        
                        <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                        <div className="mt-6 space-y-6">
                           <div className="flex items-center gap-x-3">
                              <input
                              id="push-everything"
                              name="push-notifications"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                              Everything
                              </label>
                           </div>
                           <div className="flex items-center gap-x-3">
                              <input
                              id="push-email"
                              name="push-notifications"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                              Same as email
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
                              No push notifications
                              </label>
                           </div>
                        </div>
                        </fieldset>
                     </div>
                  </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
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
