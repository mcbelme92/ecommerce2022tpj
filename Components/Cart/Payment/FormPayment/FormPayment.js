import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { size } from "lodash";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import { toast } from "react-toastify";
import { paymentCardApi } from "../../../../api/cart";
export default function FormPayment(props) {
  const { products, addressArray } = props;
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { auth, logout } = useAuth();
  const { removeAllProductsCart } = useCart();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return null;
    const CardElementS = elements.getElement(CardElement);
    const result = await stripe.createToken(CardElementS);

    if (result?.error) {
      toast.error(result.error.message);
    } else {
      const response = await paymentCardApi(
        result.token,
        products,
        auth.idUser,
        addressArray,
        logout
      );
      if (size(response?.data) > 0) {
        toast.success("pedido realizado correctamente");
        removeAllProductsCart();
        router.push("/orders");
      } else {
        toast.error("Error al realizar pedido");
      }
    }
    setLoading(false);
  };
  //HUBO UNERROR NULL RECUERDA STRIPE IBA ASI !STRIPE
  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" loading={loading} disable={!stripe}>
        Pagar
      </Button>
    </form>
  );
}
