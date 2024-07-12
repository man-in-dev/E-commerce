import { Divider } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const ProductsComp = ({ product }) => {
  return (
    <>
      <NavLink to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          height="420px"
          width="350px"
        />
        <div className="w-[350px] mt-1">
          <p className="text-sm font-semibold uppercase tracking-wide">
            {product.name}
          </p>
          <Divider />
          <p className="text-lg tracking-widest font-semibold">
            ₹{product.price}
          </p>
        </div>
      </NavLink>
    </>
  );
};

export default ProductsComp;
