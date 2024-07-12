import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const CheckoutForm = ({ address, setAddress, createOrder }) => {
  return (
    <>
      <p className="text-2xl font-semibold uppercase underline tracking-widest mb-11">
        Shipping Address
      </p>

      <div className="flex flex-col space-y-5">
        <FormControl isRequired>
          <FormLabel
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="2px"
          >
            Street
          </FormLabel>
          <Input
            type="text"
            borderRadius="0"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="2px"
          >
            City
          </FormLabel>
          <Input
            type="text"
            borderRadius="0"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="2px"
          >
            State
          </FormLabel>
          <Input
            type="text"
            borderRadius="0"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="2px"
          >
            Pincode
          </FormLabel>
          <Input
            type="text"
            borderRadius="0"
            value={address.pincode}
            onChange={(e) =>
              setAddress({ ...address, pincode: e.target.value })
            }
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="2px"
          >
            Phone
          </FormLabel>
          <Input
            type="text"
            borderRadius="0"
            value={address.phoneNum}
            onChange={(e) =>
              setAddress({ ...address, phoneNum: e.target.value })
            }
          />
        </FormControl>

        <Button
          border="1px"
          borderRadius="0"
          backgroundColor="transparent"
          color="black"
          letterSpacing="3px"
          textTransform="uppercase"
          fontWeight="600"
          cursor="pointer"
          mt={5}
          py={25}
          onClick={createOrder}
        >
          Proceed To Pay
        </Button>
      </div>
    </>
  );
};

export default CheckoutForm;
