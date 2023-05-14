import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useState } from "react";
import { useCartContext } from "../../context/cart/cart-context";
import { Product } from "../../context/products/products-context";

interface CartButtonProps {
  product: Product;
}

export const CartButton = ({ product }: CartButtonProps) => {
  const { addToCart } = useCartContext();
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount > 10) {
        tempAmount = 10;
      }
      return tempAmount;
    });
  };

  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  return (
    <Wrapper>
      <div className="amount-btn">
        <button type="button" onClick={decrease}>
          <FaMinus />
        </button>
        <h2>{amount}</h2>
        <button type="button" onClick={increase}>
          <FaPlus />
        </button>
      </div>
      <Link
        to="/cart"
        className="btn"
        onClick={() => addToCart(product, amount)}
      >
        Add To Cart
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  display: grid;

  .amount-btn {
    display: grid;
    width: 140px;
    justify-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
  }
  .amount-btn button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .amount-btn h2 {
    margin-bottom: 0;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
    text-align: center;
  }
`;
