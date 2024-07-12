import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cart.cartItem);

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItem.map((c) => (totalPrice += c.item.price * c.qty));
    return totalPrice;
  };

  return (
    <div className="w-11/12 min-h-[75vh] mx-auto mt-5 md:mt-12">
      {/* cart */}
      {cartItem.length ? (
        <>
          <p className="text-base font-semibold uppercase underline tracking-widest mb-3 md:mb-6">
            Cart
          </p>
          {cartItem.map((c) => (
            <div
              key={c.item._id}
              className="flex items-center justify-between border-b-[1px] py-4"
            >
              <div className="flex space-x-2 w-3/4">
                <div>
                  <img
                    src={c.item.image}
                    className="w-16 lg:w-20 h-20 lg:h-24"
                  />
                </div>
                <div>
                  <p className="text-xs lg:text-sm font-semibold uppercase tracking-wider lg:tracking-widest">
                    {c.item.name.length > 20
                      ? `${c.item.name.substring(0, 21)}...`
                      : c.item.name}
                  </p>
                  <p className="text-[9px] lg:text-xs font-semibold text-gray-400 uppercase tracking-wide lg:tracking-widest mt-1">
                    {c.item.category.name} - {c.item.brand.name}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide lg:tracking-widest mt-2">
                    Qty: <span style={{ color: "gray" }}>{c.qty}</span>
                  </p>
                  <p className="text-[10px] lg:text-base font-semibold uppercase tracking-widest mt-1">
                    ₹{c.item.price}
                  </p>
                </div>
              </div>
              <div>
                <button
                  className="px-4 py-2 text-xs md:text-base font-semibold border-none rounded-none bg-gray-200 tracking-wide uppercase cursor-pointer"
                  onClick={() => dispatch(removeFromCart(c.item._id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {/* subtotal */}
          <div className="flex items-center justify-between my-4 md:my-6">
            <p className="text-base md:text-lg font-semibold uppercase tracking-wider w-40">
              Subtotal-
            </p>
            <p className="text-base md:text-lg font-semibold uppercase tracking-wider">
              ₹{getTotalPrice()}
            </p>
          </div>
          {/* chaeckout */}
          <div className="text-center mt-4">
            <NavLink to="/checkout">
              <button className="text-base md:text-lg border-[1px] border-black rounded-none bg-transparent tracking-widest uppercase cursor-pointer mt-1 w-full py-3 hover:bg-gray-100">
                Checkout
              </button>
            </NavLink>
          </div>
        </>
      ) : (
        "Empty Cart"
      )}
    </div>
  );
};

export default Cart;
