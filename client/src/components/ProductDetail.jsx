import { IconButton } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../config/Baseurl";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const [qty, setQty] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cart.cartItem);

  const incQty = () => {
    if (qty === 10) return;
    setQty((qty) => qty + 1);
  };

  const decQty = () => {
    if (qty === 1) return;
    setQty((qty) => qty - 1);
  };

  const addToCartHandler = () => {
    if (cartItem.find((c) => c.item._id === product._id)) return;
    dispatch(addToCart({ item: product, qty: qty }));
  };

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/v1/product/${id}`);
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex flex-col md:flex-row space-y-3 md:space-x-6 w-11/12 md:w-3/4 min-h-[75vh] mx-auto mt-7 md:mt-12">
      <div className="self-center md:w-2/3">
        <img src={product?.image} alt={product?.name} className="md:w-96" />
      </div>
      <div>
        {/* title */}
        <p className="text-lg md:text-2xl font-semibold uppercase tracking-widest">
          {product?.name}
        </p>
        {/* Description */}
        <p className="text-sm md:text-base text-gray-500 uppercase tracking-widest leading-7 mt-1">
          {product?.description}
        </p>
        {/* Brand */}
        <p className="text-sm font-semibold uppercase tracking-widest mt-4 md:mt-4">
          By:{" "}
          <span
            style={{
              color: "gray",
              fontWeight: "600",
              textDecorationLine: "underline",
            }}
          >
            {product?.brand?.name}
          </span>
        </p>
        {/* Price */}
        <p className="text-base tracking-widest font-semibold mt-3 md:mt-4">
          ₹{product?.price}
        </p>
        {/* Quantity */}
        <div className="flex space-x-3 items-center mt-5">
          <IconButton
            icon={<MinusIcon />}
            size="sm"
            borderRadius="0"
            color="black"
            bg="transparent"
            border="1px"
            p="20px 11px"
            onClick={decQty}
          />
          <p className="border-[1px] border-black py-2 px-4">{qty}</p>
          <IconButton
            icon={<AddIcon />}
            size="sm"
            borderRadius="0"
            color="black"
            bg="transparent"
            border="1px"
            p="20px 11px"
            onClick={incQty}
          />
        </div>
        {/* buttons */}
        <div className="flex space-x-3 mt-7 md:mt-8">
          <button
            className="border-[1px] border-black rounded-none bg-transparent tracking-wide uppercase cursor-pointer py-3 px-6 md:px-0 md:w-1/3"
            onClick={addToCartHandler}
          >
            Add to cart
          </button>
          <button
            className="border-[1px] border-black rounded-none bg-transparent tracking-wide uppercase cursor-pointer py-3 px-6 md:px-0 md:w-1/3"
            width={{ md: "30%" }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
