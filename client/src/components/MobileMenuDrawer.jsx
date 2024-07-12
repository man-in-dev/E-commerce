import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
} from "@chakra-ui/react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { MdManageAccounts, MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";

const MobileMenuDrawer = ({
  isOpen,
  onClose,
  cartItem,
  user,
  logoutHandler,
}) => {
  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton fontSize="18px" />
          <DrawerHeader borderBottomWidth="1px" mt="41px">
            <NavLink to="/cart">
              <div className="relative" onClick={onClose}>
                <FaShoppingCart fontSize="28px" />
                <p className="absolute -top-6 left-4 font-semibold text-2xl">
                  {cartItem.length ? cartItem.length : ""}
                </p>
              </div>
            </NavLink>
          </DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col space-y-6 mt-6 [&_div]:text-lg [&_div]:uppercase [&_div]:tracking-wider [&_div]:cursor-pointer [&_div]:font-bold">
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <div onClick={onClose}>Home</div>
              </NavLink>
              <div onClick={onClose}>About Us</div>
              <NavLink to="/products" style={{ textDecoration: "none" }}>
                <div onClick={onClose}>Products</div>
              </NavLink>
              <div onClick={onClose}>Contact Us</div>
            </div>
          </DrawerBody>
          <DrawerFooter display="block" px={0} pb={31}>
            {user ? (
              <div>
                <NavLink to="/account">
                  <div
                    className="flex items-center space-x-2 border-b-[1px] border-black pb-3 pl-6"
                    onClick={onClose}
                  >
                    <MdManageAccounts fontSize="25px" />
                    <p className="text-lg font-bold uppercase tracking-wider">
                      Account
                    </p>
                  </div>
                </NavLink>
                <div
                  className="flex items-center space-x-2 pt-3 pl-6"
                  onClick={() => {
                    logoutHandler();
                    onClose();
                  }}
                >
                  <MdLogout fontSize="25px" />
                  <p
                    className="text-lg font-bold uppercase tracking-wider"
                    onClick={logoutHandler}
                  >
                    Logout
                  </p>
                </div>
              </div>
            ) : (
              <NavLink to="/signin">
                <div
                  className="flex items-center space-x-2 pl-6"
                  onClick={onClose}
                >
                  <FaUserCircle fontSize="28px" />
                  <p className="text-lg font-bold uppercase tracking-wider">
                    Signin
                  </p>
                </div>
              </NavLink>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileMenuDrawer;
