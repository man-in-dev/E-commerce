import { RxAvatar } from "react-icons/rx";
import { BiSolidCategory } from "react-icons/bi";
import { FaShoppingBag } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { MdDashboard, MdLogout } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { MdBrandingWatermark } from "react-icons/md";

const Sidebar = ({ sidebarAnim, setSidebarAnim }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("E-commerce-prac-admin");
    navigate("/signin");
  };

  return (
    <>
      {/* cross icon */}
      <div
        className="absolute right-4 md:hidden"
        onClick={() => setSidebarAnim(!sidebarAnim)}
      >
        <RxCross2 size={20} color="white" />
      </div>
      {/* dashboard */}
      <NavLink to="/">
        <div className="flex items-center space-x-3 p-3 mt-16 bg-[#a1cca5] shadow-md rounded-md">
          <span>
            <MdDashboard size={20} color="white" />
          </span>
          <span className="text-white font-semibold">Dashboard</span>
        </div>
      </NavLink>
      {/* menu */}
      <div className="mt-8">
        <ul>
          <NavLink to="/users">
            <li className="flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-[#a1cca5] hover:shadow-md text-white font-semibold mb-2">
              <span>
                <RxAvatar size={20} />
              </span>
              <span className="block">Users</span>
            </li>
          </NavLink>
          <NavLink to="/products">
            <li className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-[#a1cca5] hover:shadow-md text-white font-semibold mb-2">
              <span>
                <FaBoxOpen size={20} />
              </span>
              <span>Products</span>
            </li>
          </NavLink>
          <NavLink to="/category">
            <li className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-[#a1cca5] hover:shadow-md text-white font-semibold mb-2">
              <span>
                <BiSolidCategory size={20} />
              </span>
              <span>Category</span>
            </li>
          </NavLink>
          <NavLink to="/brand">
            <li className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-[#a1cca5] hover:shadow-md text-white font-semibold mb-2">
              <span>
                <MdBrandingWatermark size={20} />
              </span>
              <span>Brand</span>
            </li>
          </NavLink>
          <NavLink to="/orders">
            <li className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-[#a1cca5] hover:shadow-md text-white font-semibold mb-2">
              <span>
                <FaShoppingBag size={20} />
              </span>
              <span>Orders</span>
            </li>
          </NavLink>
        </ul>
      </div>
      {/* logout */}
      <div
        className="absolute bottom-[10%] w-11/12 flex items-center space-x-3 p-3 cursor-pointer hover:bg-[#a1cca5] hover:shadow-md hover:rounded-md"
        onClick={logoutHandler}
      >
        <span>
          <MdLogout size={20} color="white" />
        </span>
        <span className="text-white font-semibold">Logout</span>
      </div>
    </>
  );
};

export default Sidebar;
