import { useRef } from "react";
import { toggleOpen } from "../../redux/itemsRelated/formSlice";
import { useDispatch, useSelector } from "react-redux";
import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	HStack,
	IconButton,
	Image,
	Menu,
	MenuDivider,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	useDisclosure,
} from "@chakra-ui/react";
import { HiMenuAlt1, HiOutlineX, HiBell } from "react-icons/hi";

export default function NavBar() {
	const dispatch = useDispatch();

	const { expiredItems } = useSelector((state) => state.items);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

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
						<Box fontSize={23}>Itens na despensa</Box>
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
