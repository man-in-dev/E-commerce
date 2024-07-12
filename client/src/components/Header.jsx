import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/signinSlice";
import MobileMenuDrawer from "./MobileMenuDrawer";
import { MdLogout, MdManageAccounts } from "react-icons/md";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const user = useSelector((state) => state?.signinData?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItem = useSelector((state) => state.cart.cartItem);

  const logoutHandler = () => {
    localStorage.removeItem("E-commerce-prac");
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-between bg-[#99d2e5] py-1 px-7">
        {/* logo */}
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <div>
            <img src={logo} alt="Logo" width="100px" />
          </div>
        </NavLink>
        {/* menu */}
        <div className="hidden lg:flex items-center space-x-6 [&_div]:text-white [&_div]:text-lg [&_div]:uppercase [&_div]:tracking-wider [&_div]:cursor-pointer [&_div]:font-semibold">
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <div>Home</div>
          </NavLink>
          <div>About Us</div>
          <NavLink to="/products" style={{ textDecoration: "none" }}>
            <div>Products</div>
          </NavLink>
          <div>Contact Us</div>
        </div>
        {/* cart & account */}
        <div className="hidden lg:flex items-center">
          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart fontSize="25px" color="white" />
              <p className="absolute -top-4 right-1 font-semibold text-white">
                {cartItem.length ? cartItem.length : ""}
              </p>
            </div>
          </NavLink>
          <div className="ml-5">
            {user ? (
              <Menu>
                <MenuButton>
                  <Avatar
                    size="sm"
                    cursor="pointer"
                    name={user?.name}
                    src={user?.pic}
                  />
                </MenuButton>
                <MenuList borderRadius="0">
                  <MenuItem>
                    <NavLink to="/account">
                      <div
                        className="flex items-center space-x-2"
                        onClick={onClose}
                      >
                        <MdManageAccounts fontSize="23px" />
                        <p className="uppercase font-semibold tracking-wider">
                          Account
                        </p>
                      </div>
                    </NavLink>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <div
                      className="flex items-center space-x-2"
                      onClick={() => {
                        logoutHandler();
                        onClose();
                      }}
                    >
                      <MdLogout fontSize="23px" />
                      <p
                        className="uppercase font-semibold tracking-wider"
                        onClick={logoutHandler}
                      >
                        Logout
                      </p>
                    </div>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <NavLink to="/signin">
                <FaUserCircle fontSize="25px" color="white" />
              </NavLink>
            )}
          </div>
        </div>
        {/* hamburger */}
        <div className="flex lg:hidden">
          <HamburgerIcon onClick={onOpen} color="white" fontSize="33px" />
        </div>
      </div>
      {/* Drawer */}
      <MobileMenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        cartItem={cartItem}
        user={user}
        logoutHandler={logoutHandler}
      />
    </>
  );
};

export default Header;
