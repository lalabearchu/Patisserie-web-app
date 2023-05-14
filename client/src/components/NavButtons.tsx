import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserPlus, FaUser } from "react-icons/fa";
import { useAuthContext } from "../context/auth/auth-context";
import { useCartContext } from "../context/cart/cart-context";

export const NavButtons = () => {
  const { total_items } = useCartContext();
  const { user } = useAuthContext();
  return (
    <Wrapper>
      <Link to="/cart" className="cart-btn">
        Cart
        <span className="cart-btn-icon">
          <FaShoppingCart />
          <span className="cart-btn-val">{total_items}</span>
        </span>
      </Link>
      {user ? (
        <Link to="/user" className="auth-btn">
          {user.role === "admin" ? "Admin" : "User"}
          <span className="auth-btn-icon">
            <FaUser />
          </span>
        </Link>
      ) : (
        <Link to="/login" className="auth-btn">
          Login
          <span className="auth-btn-icon">
            <FaUserPlus />
          </span>
        </Link>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 200px;
  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1rem;
    letter-spacing: var(--spacing);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart-btn-icon {
    position: relative;
    display: flex;
    align-items: center;
    svg {
      /* margin-left: 5px; */
      /* height: 1.5rem; */
      width: 1.5rem;
    }
  }
  .cart-btn-val {
    position: absolute;
    top: -10px;
    right: -10px;
    background: var(--clr-primary-5);
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.8rem;
    color: var(--clr-white);
  }

  .auth-btn {
    color: var(--clr-grey-1);
    font-size: 1rem;
    letter-spacing: var(--spacing);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .auth-btn-icon {
    margin-left: 5px;
    display: flex;
    align-items: center;
    svg {
      width: 1.2rem;
    }
  }
`;
