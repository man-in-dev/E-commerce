import { useSelector } from "react-redux";

const OrderSummary = () => {
  const cartItem = useSelector((state) => state.cart.cartItem);

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItem.map((c) => (totalPrice += c.item.price * c.qty));
    return totalPrice;
  };

  return (
    <>
      <p className="text-2xl font-semibold uppercase underline tracking-widest mb-8 md:mb-11">
        Order Summary
      </p>

      <div className="border-[1px] border-black py-1 px-3">
        {/* cart */}
        {cartItem.map((c) => (
          <div
            key={c.item._id}
            className="grid grid-cols-4 border-b-[1px] border-black py-4"
          >
            <div className="flex space-x-2 col-span-3">
              <div>
                <img src={c.item.image} className="w-24 lg:w-20 h-24 lg:h-20" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide">
                  {c.item.name.length > 20
                    ? `${c.item.name.substring(0, 21)}...`
                    : c.item.name}
                </p>
                <p className="text-xs text-gray-400 font-semibold tracking-widest uppercase mt-1">
                  {c.item.category.name} - {c.item.brand.name}
                </p>
                <p className="text-xs font-semibold tracking-widest uppercase mt-1">
                  Qty: <span style={{ color: "gray" }}>{c.qty}</span>
                </p>
              </div>
            </div>
            <div className="justify-self-end">
              <p className="md:text-lg tracking-widest font-semibold mt-1">
                ₹{c.item.price}
              </p>
            </div>
          </div>
        ))}
        {/* subtotal */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-base lg:text-lg font-semibold uppercase tracking-wider w-max">
            Subtotal-
          </p>
          <p className="text-base lg:text-lg font-semibold uppercase tracking-wider w-max">
            ₹{getTotalPrice()}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
