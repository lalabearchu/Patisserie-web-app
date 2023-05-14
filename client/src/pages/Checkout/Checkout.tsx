import styled from "styled-components";
import { PageHero } from "../../components/PageHero";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cart/cart-context";
import { StripeCheckout } from "./StripeCheckout";

export const Checkout = () => {
  const { cart } = useCartContext();

  return (
    <main>
      <PageHero title="Checkout" SingleProductPage={false} />

      <Wrapper className="page-hero">
        {cart.length < 1 ? (
          <div className="empty">
            <h2>Your Cart Is Empty</h2>
            <Link to="/products" className="btn">
              Go Shopping
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .empty {
    text-align: center;
  }
`;
