/* eslint-disable react/prop-types */
// import { Link } from "react-router-dom"
import "./NavBar.css";

import { useState } from 'react'
import { Dialog, DialogPanel, Disclosure, PopoverGroup } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function NavBar({ onButtonClick, expiringItems }) {

   //  function classNames(...classes) {
   //    return classes.filter(Boolean).join(' ')
   //  }

   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

            <Menu as="div" className="relative inline-block text-left">
               <div className="relative">
                  <div className="dot absolute bg-orange-500 w-5 h-5 rounded-xl text-center">{expiringItems.length}</div>
               <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                  {/* <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" /> */}
               </MenuButton>
               </div>

               <MenuItems
               transition
               className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
               >
               <div className="py-1">
                  {expiringItems.map((item) => (
                        <MenuItem key={item.id}>
                           <p>{item.name}</p>
                        </MenuItem>
                  ))}
                  {/* <form action="#" method="POST">
                     <MenuItem>
                     <button
                        type="submit"
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                     >
                        Sign out
                     </button>
                     </MenuItem>
                  </form> */}
               </div>
               </MenuItems>
            </Menu>
            
            {/* //!MODAL NOTIFICAÇÃO */}
            {/* <div  id="toast-default" className=" absolute top-14 right-14 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
               <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/>
                  </svg>
                  <span className="sr-only">Fire icon</span>
               </div>
               <div className="ms-3 text-sm font-normal">Set yourself free.</div>
               <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                  <span className="sr-only">Close</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
               </button>
            </div> */}
            {/* //!MODAL NOTIFICAÇÃO */}

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
            <button
               onClick={() => setNotificationOpen(true)}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            </button>
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
                  {/* <a
                     href="#"
                     className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                     Notificações
                  </a> */}
               </div>
               </div>
            </div>
         </DialogPanel>
         </Dialog>
      </header>
   )
}
