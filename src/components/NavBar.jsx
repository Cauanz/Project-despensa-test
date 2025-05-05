import "./NavBar.css";
import { useRef } from "react";
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
	// DrawerFooter,
	DrawerOverlay,
	Flex,
	HStack,
	// Icon,
	IconButton,
	Image,
	Menu,
	// MenuButton,
	MenuDivider,
	// MenuItem,
	// MenuList,
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
	// Stack,
	useDisclosure,
} from "@chakra-ui/react";
import { HiMenuAlt1, HiOutlineX, HiBell } from "react-icons/hi";

export default function NavBar() {
	const dispatch = useDispatch();

	const { expiredItems } = useSelector((state) => state.items);
	const btnRef = useRef();

	// const [isOpen, setIsOpen] = useState(false);
	// const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Box bg={"gray.100"} px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<IconButton
						size={"md"}
						icon={isOpen ? <HiOutlineX /> : <HiMenuAlt1 />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={"center"}>
						<Box>Itens na despensa</Box>
						<HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}></HStack>
					</HStack>
					<Flex alignItems={"center"}>
						<Popover>
							{expiredItems.length !== 0 && (
								<div className="dot absolute bg-orange-500 w-5 h-5 rounded-xl text-center pointer-events-none">
									{expiredItems.length}
								</div>
							)}
							<PopoverTrigger>
								<Button variant="outline">
									<HiBell />
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverArrow />
								<PopoverCloseButton />
								<PopoverHeader>Itens Expirados!</PopoverHeader>
								{expiredItems.map((item) => (
									<>
										<PopoverBody key={item.id} display="flex">
											<Image rounded="md" boxSize="60px" borderRadius="full" src={item.imagem} />
											{item.name}
										</PopoverBody>
									</>
								))}
							</PopoverContent>
						</Popover>
						<Menu>
							<MenuDivider />
							<Button
								variant="outline"
								onClick={() => dispatch(toggleOpen())}
								colorScheme="blue"
								display={{ base: "none", md: "flex" }}
							>
								Adicionar Item
							</Button>
						</Menu>
					</Flex>
				</Flex>

				<Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />

						<DrawerBody>
							<Button onClick={() => dispatch(toggleOpen(), onClose())}>Adicionar item</Button>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</Box>
		</>
	);
}
