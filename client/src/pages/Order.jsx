import OrderModal from "../components/OrderModal";

const Order = ({ orders }) => {
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Products
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Shipping Address
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((ord) => (
              <tr
                key={ord._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-center"
              >
                <td className="pl-3 py-3">{ord._id}</td>
                <td className="py-3 text-[12px]">
                  <OrderModal content={ord.items} address={false}>
                    See
                  </OrderModal>
                </td>
                <td className="py-3">₹ {ord.price}</td>
                <td className="flex flex-col space-y-1 py-3">
                  <OrderModal content={ord.address} address={true}>
                    See
                  </OrderModal>
                </td>
                <td className="py-3">Paid</td>
                <td className="py-3">{ord.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
