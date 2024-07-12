import {
  Checkbox,
  CheckboxGroup,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import ProductsComp from "../components/ProductsComp";
import axios from "axios";
import { BaseUrl } from "../config/Baseurl";
import MobileSidebarFilter from "../components/MobileSidebarFilter";
import { LiaSlidersHSolid } from "react-icons/lia";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sidebarAnim, setSidebarAnim] = useState(false);

  const [filterPrice, setFilterPrice] = useState(99);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterBrand, setFilterBrand] = useState([]);

  const [showTooltip, setShowTooltip] = useState(false);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/v1/product`);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/v1/category`);
      setCategories(data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const getBrands = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/v1/brand`);
      setBrands(data?.brands);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
    getBrands();
  }, []);

  const getFilteredProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/api/v1/product/filter-prod?price=${filterPrice}&category=${filterCategory}&brand=${filterBrand}`
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (filterPrice > 99 || filterCategory.length || filterBrand.length) {
      getFilteredProducts();
    } else getProducts();
  }, [filterPrice, filterCategory, filterBrand]);

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row space-y-5 md:space-x-14 w-11/12 min-[75vh] mx-auto mt-6 md:mt-5">
        {/* sidebar filter */}
        <div className="hidden md:flex flex-col space-y-6 w-1/5">
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
            <CheckboxGroup
              colorScheme="cyan"
              onChange={(v) => setFilterBrand(v)}
            >
              <div className="flex flex-col space-y-4">
                {brands.map((brnd) => (
                  <Checkbox
                    className="text-base uppercase tracking-widest"
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
        {/* Mobile sidebar filter */}
        <div className="flex md:hidden ml-2">
          <div
            className="flex items-center space-x-2 text-gray-500"
            onClick={() => setSidebarAnim(!sidebarAnim)}
          >
            <LiaSlidersHSolid fontSize="23px" />
            <p className="text-base uppercase tracking-widest cursor-pointer font-semibold">
              Filter
            </p>
          </div>
        </div>
        {/* products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-x-6">
          {products &&
            products.map((prod) => (
              <ProductsComp key={prod._id} product={prod} />
            ))}
        </div>
      </div>

      <div
        className={`fixed top-0 w-3/4 lg:w-1/4 h-screen bg-gray-50 p-3 ${
          sidebarAnim ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 overflow-y-scroll`}
      >
        <MobileSidebarFilter
          categories={categories}
          brands={brands}
          filterPrice={filterPrice}
          showTooltip={showTooltip}
          setShowTooltip={setShowTooltip}
          setFilterPrice={setFilterPrice}
          setFilterBrand={setFilterBrand}
          setFilterCategory={setFilterCategory}
          sidebarAnim={sidebarAnim}
          setSidebarAnim={setSidebarAnim}
        />
      </div>
    </div>
  );
};

export default Products;
