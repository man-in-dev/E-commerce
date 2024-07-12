import shirt from "../assets/fea-shirt.jpg";
import t_shirt from "../assets/fea-t-shirt.jpg";
import denim from "../assets/fea-denim.jpg";

const SidebarProduct = () => {
  return (
    <div>
      {/* 1 */}
      <div className="flex flex-col lg:flex-row lg:space-x-8 lg:mt-10">
        <div className="lg:w-[45%]">
          <img src={shirt} width="100%" />
        </div>
        <div className="self-center lg:w-[45%]">
          <p className="text-xl lg:text-3xl font-semibold lg:font-medium uppercase tracking-widest lg:tracking-[5px]">
            Skyward Stripes Tee
          </p>
          <p className="text-xs lg:text-sm font-semibold lg:font-medium uppercase tracking-wider lg:tracking-widest leading-5 mt-1">
            Elevate Your Look with Crisp Sky Blue and Bold Contrasts
          </p>
          <button className="px-5 lg:px-8 py-2 lg:py-3 text-[10px] md:text-base font-semibold border-none rounded-none bg-blue-400 text-white tracking-widest uppercase cursor-pointer mt-3 lg:mt-5">
            Explore
          </button>
        </div>
      </div>
      {/* 2 */}
      <div className="flex flex-col-reverse lg:flex-row mt-6 lg:mt-10">
        <div className="self-center lg:w-[45%]">
          <p className="text-xl lg:text-3xl font-semibold lg:font-medium uppercase tracking-widest lg:tracking-[5px]">
            SELVEDGE DENIM
          </p>
          <p className="text-xs lg:text-sm font-semibold lg:font-medium uppercase tracking-wider lg:tracking-widest leading-5 mt-1">
            ELEVATE YOUR STYLE WITH PREMIUM QUALITY AND TIMELESS DURABILITY
          </p>
          <button className="px-5 lg:px-8 py-2 lg:py-3 text-[10px] md:text-base font-semibold border-none rounded-none bg-blue-400 text-white tracking-widest uppercase cursor-pointer mt-3 lg:mt-5">
            Explore
          </button>
        </div>
        <div className="lg:w-[45%]">
          <img src={denim} width="100%" />
        </div>
      </div>
      {/* 3 */}
      <div className="flex flex-col lg:flex-row lg:space-x-8 mt-6 lg:mt-10">
        <div className="lg:w-[45%]">
          <img src={t_shirt} width="100%" />
        </div>
        <div className="self-center lg:w-[45%]">
          <p className="text-xl lg:text-3xl font-semibold lg:font-medium uppercase tracking-widest lg:tracking-[5px]">
            SUNSET HUES TEE
          </p>
          <p className="text-xs lg:text-sm font-semibold lg:font-medium uppercase tracking-wider lg:tracking-widest leading-5 mt-1">
            ELEVATE YOUR LOOK WITH WARM SUNSET white AND SOFT BLENDS
          </p>
          <button className="px-5 lg:px-8 py-2 lg:py-3 text-[10px] md:text-base font-semibold border-none rounded-none bg-blue-400 text-white tracking-widest uppercase cursor-pointer mt-3 lg:mt-5">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarProduct;
