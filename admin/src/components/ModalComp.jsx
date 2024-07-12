import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const ModalComp = ({ children, products, totalAmount }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <p onClick={onOpen}>{children}</p>

      <Modal className="w-10/12" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>All Ordered Products</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {products &&
              products.map((prod) => (
                <div
                  className="flex items-center space-x-2 mb-4"
                  key={prod.productId}
                >
                  <img className="w-14 h-14" src={prod.image} alt={prod.name} />
                  <p className="text-sm font-semibold">{prod.name}</p>
                </div>
              ))}
            <div className="flex items-center justify-between mt-4">
              <p>Total</p>
              <p className="font-semibold">₹ {totalAmount}</p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
