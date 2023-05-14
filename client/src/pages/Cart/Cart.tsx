import styled from "styled-components";
import { useCartContext } from "../../context/cart/cart-context";
import { Link } from "react-router-dom";
import { PageHero } from "../../components/PageHero";
import { CartContent } from "./CartContent";

export const Cart = () => {
  const { cart } = useCartContext();
  if (cart.length < 1) {
    return (
      <main>
        <PageHero title="Cart" SingleProductPage={false} />
        <Wrapper className="page-hero">
          <div className="empty">
            <h2>Your Cart Is Empty</h2>
            <Link to="/products" className="btn">
              Go Shopping
            </Link>
          </div>
        </Wrapper>
      </main>
    );
  }

  return (
    <main>
      <PageHero title="Cart" SingleProductPage={false} />
      <Wrapper className="page-hero">
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
  }
  h2 {
    margin: 2rem auto;
  }
`;
