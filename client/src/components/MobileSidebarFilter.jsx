import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  Checkbox,
  CheckboxGroup,
  SliderThumb,
} from "@chakra-ui/react";

import { RxCross2 } from "react-icons/rx";

const MobileSidebarFilter = ({
  categories,
  brands,
  filterPrice,
  showTooltip,
  setShowTooltip,
  setFilterPrice,
  setFilterBrand,
  setFilterCategory,
  sidebarAnim,
  setSidebarAnim,
}) => {
  return (
    <>
      <div
        className="absolute right-6  top-5 md:hidden"
        onClick={() => setSidebarAnim(!sidebarAnim)}
      >
        <RxCross2 size={30} />
      </div>
      <div className="flex flex-col space-y-8 mt-20 pl-1">
        {/* price */}
        <div className="mb-2">
          <p className="text-base font-semibold uppercase tracking-widest mb-3 underline">
            Price
          </p>
          <Slider
            id="slider"
            defaultValue={99}
            min={99}
            max={4999}
            colorScheme="teal"
            onChange={(v) => setFilterPrice(v)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderMark value={1324} mt="1" ml="-2.5" fontSize="sm">
              ₹ 1324
            </SliderMark>
            <SliderMark value={2549} mt="1" ml="-2.5" fontSize="sm">
              ₹ 2549
            </SliderMark>
            <SliderMark value={3774} mt="1" ml="-2.5" fontSize="sm">
              ₹ 3774
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={`${filterPrice}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </div>
        {/* category */}
        <div>
          <p className="text-base font-semibold uppercase tracking-widest mb-3 underline">
            Category
          </p>

          <CheckboxGroup
            colorScheme="cyan"
            onChange={(v) => setFilterCategory(v)}
          >
            <div className="flex flex-col space-y-4">
              {categories?.map((cat) => (
                <Checkbox
                  className="text-base uppercase tracking-widest"
                  key={cat?._id}
                  value={cat?._id}
                >
                  {cat?.name}
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        </div>
        {/* Brand */}
        <div>
          <p className="text-base font-semibold uppercase tracking-widest mb-3 underline">
            Brand
          </p>
          <CheckboxGroup colorScheme="cyan" onChange={(v) => setFilterBrand(v)}>
            <div className="flex flex-col space-y-4">
              {brands.map((brnd) => (
                <Checkbox
                  fontSize="15px"
                  textTransform="uppercase"
                  letterSpacing="2px"
                  key={brnd?._id}
                  value={brnd?._id}
                >
                  {brnd?.name}
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        </div>
      </div>
    </>
  );
};

export default MobileSidebarFilter;
