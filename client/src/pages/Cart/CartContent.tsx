import styled from "styled-components";
import { useCartContext } from "../../context/cart/cart-context";
import { Link } from "react-router-dom";
import { CartColumns } from "./CartColumns";
import { CartItem } from "./CartItem";
import { useAuthContext } from "../../context/auth/auth-context";
export const CartContent = () => {
  const { cart, clearCart, total_price } = useCartContext();
  const { user } = useAuthContext();

  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {cart.map((item) => {
        return <CartItem key={item._id} item={item} />;
      })}
      <hr />
      <div className="total">
        <h4>Total</h4>
        <h4>NT${total_price}</h4>
      </div>
      <div className="btn-container">
        <button type="button" className="bot-btn clear-btn" onClick={clearCart}>
          Clear Cart
        </button>
        {user ? (
          <Link to="/checkout" className="bot-btn">
            Proceed To Checkout
          </Link>
        ) : (
          <Link to="/login" className="bot-btn">
            Login
          </Link>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h4 {
    margin-bottom: 0rem;
  }
  .total {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }

  .btn-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .bot-btn {
    background: transparent;
    border-color: transparent;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-size: 1rem;
    font-weight: 00;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
