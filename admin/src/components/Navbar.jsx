import { IoMenu } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { useUserState } from "../context/User";

const Navbar = ({ sidebarAnim, setSidebarAnim }) => {
  const { user } = useUserState();

  return (
    <div className="flex items-center justify-between px-5 py-3 bg-[#49416d] h-max">
      {/* menu icon */}
      <div className="md:hidden" onClick={() => setSidebarAnim(!sidebarAnim)}>
        <IoMenu size={25} color="white" />
      </div>
      {/* search */}
      <div className="relative">
        <span className="absolute top-[11px] text-[18px] text-white">
          <BiSearch />
        </span>
        <input
          type="text"
          placeholder="search"
          className="bg-transparent text-white border-b-2 focus:outline-none pl-[30px] py-[5px]"
        />
      </div>
      {/* bell icon & user */}
      <div className="flex items-center space-x-4">
        <p>
          <FiBell size={20} color="white" />
        </p>
        <p className="text-white font-semibold">
          {user?.user?.name.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
