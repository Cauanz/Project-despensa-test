/* eslint-disable react/prop-types */
// import { Link } from "react-router-dom"
import "./NavBar.css";

import { useState } from 'react'
import { Dialog, DialogPanel, Disclosure, PopoverGroup } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function NavBar({ onButtonClick }) {

   //  function classNames(...classes) {
   //    return classes.filter(Boolean).join(' ')
   //  }

   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

   return (
      // <nav>
      //    <ul>
      //       <li className="cursor-pointer"><Link to="/">Home</Link></li>
      //       <li onClick={onButtonClick}  className="cursor-pointer">Adicionar Item</li>
      //       <li className="cursor-pointer">
      //          <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      //          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      //          </svg>
      //          </Link>
      //       </li>
      //    </ul>
      // </nav>

      <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
         <div className="flex lg:flex-1">
         </div>
         <div className="flex lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            <button
               type="button"
               className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
               onClick={() => setMobileMenuOpen(true)}>
               <span className="sr-only">Open main menu</span>
               <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
         </div>
         <PopoverGroup className="hidden lg:flex lg:gap-x-12">

            <a href="#" className="text-sm font-semibold leading-6 text-gray-900" onClick={onButtonClick}>
            Adicionar itens
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Notificações
            </a>
         </PopoverGroup>
      </nav>
      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
         <div className="fixed inset-0 z-10" />
         <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
               <a href="#" className="-m-1.5 p-1.5">
               <span className="sr-only">Your Company</span>
               <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
               />
               </a>
               <button
               type="button"
               className="-m-2.5 rounded-md p-2.5 text-gray-700"
               onClick={() => setMobileMenuOpen(false)}
               >
               <span className="sr-only">Close menu</span>
               <XMarkIcon className="h-6 w-6" aria-hidden="true" />
               </button>
            </div>


            <div className="mt-6 flow-root">
               <div className="-my-6 divide-y divide-gray-500/10">
               <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                  </Disclosure>
                  <a
                     href="#"
                     className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                     onClick={onButtonClick}
                  >
                     Adicionar itens
                  </a>
                  <a
                     href="#"
                     className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                     Notificações
                  </a>
               </div>
               </div>
            </div>
         </DialogPanel>
         </Dialog>
      </header>
   )
}
