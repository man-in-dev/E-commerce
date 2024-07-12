import banner from "../assets/banner.jpg";
import SidebarProduct from "../components/SidebarProduct";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto mt-5">
      <div className="relative">
        <div className="absolute left-[6%] lg:left-[10%] top-[15%] lg:top-[30%]">
          <p className="text-xs lg:text-5xl uppercase tracking-widest lg:tracking-[5px] text-white mb-1 lg:mb-4">
            Discover Your Style
          </p>
          <p className="w-[56%] text-[7px] lg:text-base lg:font-semibold uppercase tracking-wider lg:tracking-widest leading-3 lg:leading-8 text-white mb-4 lg:mb-8">
            Showcase a diverse group of stylish individuals in trendy outfits,
            reflecting a range of casual and formal wear.
          </p>
          <button className="w-[22%] lg:w-[15%] py-2 lg:py-3 text-[8px] md:text-base font-semibold border-none rounded-none bg-blue-400 text-white tracking-widest uppercase cursor-pointer">
            Explore
          </button>
        </div>
        <div className="text-center">
          <img src={banner} className="w-full h-36 lg:h-[600px]" />
        </div>
      </div>
      <div className="mt-12 lg:mt-24">
        <SidebarProduct />
      </div>
    </div>
  );
};

export default Home;
