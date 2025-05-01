import "./NavBar.css";
import { useRef, useState } from "react";
import { toggleOpen } from "../../redux/itemsRelated/formSlice";
import { useDispatch, useSelector } from "react-redux";
import {
	// Avatar,
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	HStack,
	IconButton,
	Input,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	// Menu,
	// MenuButton,
	// MenuDivider,
	// MenuItem,
	// MenuList,
	Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function NavBar() {
	const dispatch = useDispatch();

	const { expiredItems } = useSelector((state) => state.items);
	const btnRef = useRef();

	//  function classNames(...classes) {
	//    return classes.filter(Boolean).join(' ')
	//  }
	const [isOpen, setIsOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<>
			{/* //TODO - REFATORAR O NOVO NAVBAR, ADICIONAR ROTULOS CORRETOS, NOMES ETC. */}
			<Box bg={"blue.200"} px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={() => setIsOpen(!isOpen)}
					/>
					<HStack spacing={8} alignItems={"center"}>
						<Box>Itens na Despensa</Box>
					</HStack>
					{/* <Flex alignItems={"center"}>
						<Menu>
							<MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
								<Avatar
									size={"sm"}
									src={
										"https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
									}
								/>
							</MenuButton>
							<MenuList>
								<MenuItem>Link 1</MenuItem>
								<MenuItem>Link 2</MenuItem>
								<MenuDivider />
								<MenuItem>Link 3</MenuItem>
							</MenuList>
						</Menu>
					</Flex> */}
				</Flex>

				<Popover>
					<PopoverTrigger>
						<Button>Trigger</Button>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverHeader>Itens Expirados!</PopoverHeader>
						{expiredItems.map((item) => {
							<PopoverBody>{item.name}</PopoverBody>;
						})}
					</PopoverContent>
				</Popover>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							<Button variant="outline" onClick={() => dispatch(toggleOpen())} colorScheme="red">
								Adicionar Item
							</Button>
						</Stack>
					</Box>
				) : null}

				<Button ref={btnRef} colorScheme="teal" onClick={() => setMobileMenuOpen(true)}>
					Open
				</Button>
				<Drawer isOpen={mobileMenuOpen} placement="right" onClose={setMobileMenuOpen} finalFocusRef={btnRef}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>Create your account</DrawerHeader>

						<DrawerBody>
							<Input placeholder="Type here..." />
						</DrawerBody>

						<DrawerFooter>
							<Button variant="outline" mr={3} onClick={() => setMobileMenuOpen(false)}>
								Cancel
							</Button>
							<Button colorScheme="blue">Save</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</Box>
			{/* <header className="bg-sky-300">
				<nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
					<div className="flex lg:flex-1">
						<h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">Itens na despensa</h2>
					</div>

					<div className="flex lg:hidden">
						<Menu as="div" className="relative inline-block text-left">
							<div className="relative flex justify-center align-middle">
								{expiredItems.length !== 0 && (
									<div className="dot absolute bg-orange-500 w-5 h-5 rounded-xl text-center pointer-events-none">
										{expiredItems.length}
									</div>
								)}
								<MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent mr-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
										/>
									</svg>
								</MenuButton>
							</div>

							<MenuItems
								transition
								className="absolute right-0 z-10 mt-2 min-w-96 max-w-lg origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
							>
								<div className="py-1">
									{expiredItems.map((item) => (
										<li key={item.id} className="flex justify-between gap-x-6 p-3 border-t border-b">
											<div className="flex min-w-0 gap-x-4">
												<img alt={item.alt} src={item.imagem} className="size-12 flex-none rounded-full bg-gray-50" />
												<div className="min-w-0 flex-auto">
													<p className="text-sm/6 font-semibold text-gray-900">Produto vencido</p>
													<p className="mt-1 truncate text-xs/5 text-gray-500">{item.name}</p>
												</div>
											</div>
											<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
								</div>
							</MenuItems>
						</Menu>

						<button
							type="button"
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(true)}
						>
							<span className="sr-only">Open main menu</span>
							<Bars3Icon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<PopoverGroup className="hidden lg:flex lg:gap-x-12">
						<a
							href="#"
							className="text-sm font-semibold leading-6 text-gray-900"
							onClick={() => dispatch(toggleOpen())}
						>
							Adicionar itens
						</a>
						<button
						// onClick={() => setNotificationOpen(true)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-6 mr-3"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
								/>
							</svg>
						</button>
					</PopoverGroup>
				</nav>

				<Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
					<div className="fixed inset-0 z-10" />
					<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-blue-600 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="flex items-center justify-between">
							<a href="#" className="-m-1.5 p-1.5">
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
									<Disclosure as="div" className="-mx-3"></Disclosure>
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
										onClick={() => dispatch(toggleOpen())}
									>
										Adicionar itens
									</a>
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header> */}
		</>
	);
}
