import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const OrderModal = ({ children, content, address }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button onClick={onOpen}>{children}</button>

      {address ? (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Shipping Address</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="flex flex-col space-y-4">
                <p className="text-[9px] lg:text-base font-semibold text-gray-500 uppercase tracking-wide lg:tracking-widest mt-1">
                  Street - {content.street}
                </p>
                <p className="text-[9px] lg:text-base font-semibold text-gray-500 uppercase tracking-wide lg:tracking-widest mt-1">
                  City - {content.city}
                </p>
                <p className="text-[9px] lg:text-base font-semibold text-gray-500 uppercase tracking-wide lg:tracking-widest mt-1">
                  State - {content.state}
                </p>
                <p className="text-[9px] lg:text-base font-semibold text-gray-500 uppercase tracking-wide lg:tracking-widest mt-1">
                  Pincode - {content.pincode}
                </p>
                <p className="text-[9px] lg:text-base font-semibold text-gray-500 uppercase tracking-wide lg:tracking-widest mt-1">
                  Phone - {content.phoneNum}
                </p>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Products</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <>
                {content.map((itm) => (
                  <div
                    key={itm.item._id}
                    className="flex items-center justify-between border-b-[1px] py-4"
                  >
                    <div className="flex space-x-2 w-3/4">
                      <div>
                        <img
                          src={itm.item.image}
                          className="w-16 lg:w-20 h-20 lg:h-24"
                        />
                      </div>
                      <div>
                        <p className="text-xs lg:text-sm font-semibold uppercase tracking-wider lg:tracking-widest">
                          {itm.item.name.length > 20
                            ? `${itm.item.name.substring(0, 21)}...`
                            : itm.item.name}
                        </p>
                        <p className="text-[9px] lg:text-xs font-semibold text-gray-400 uppercase tracking-wide lg:tracking-widest mt-1">
                          {itm.item.category.name} - {itm.item.brand.name}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-wide lg:tracking-widest mt-2">
                          Qty: <span style={{ color: "gray" }}>{itm.qty}</span>
                        </p>
                        <p className="text-[10px] lg:text-base font-semibold uppercase tracking-widest mt-1">
                          ₹{itm.item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default OrderModal;
