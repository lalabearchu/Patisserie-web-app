import styled from "styled-components";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import {
  CartItem as Item,
  useCartContext,
} from "../../context/cart/cart-context";

interface CartItemProps {
  item: Item;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { _id: id, name, price, amount, image } = item;

  const { removeItem, toggleAmount } = useCartContext();

  const increase = () => {
    toggleAmount(id, "inc");
  };

  const decrease = () => {
    toggleAmount(id, "dec");
  };

  return (
    <Wrapper>
      <div className="title">
        <img src={image} alt={name} />
        <h5 className="name">{name}</h5>
      </div>
      <h5 className="price">NT${price}</h5>
      <div className="amount-btn">
        <button type="button" onClick={decrease}>
          <FaMinus />
        </button>
        <h2>{amount}</h2>
        <button type="button" onClick={increase}>
          <FaPlus />
        </button>
      </div>
      <h5 className="subtotal">NT${price * amount}</h5>
      <button
        type="button"
        className="remove-btn"
        onClick={() => removeItem(id)}
      >
        <FaTrash />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  align-items: center;
  margin-bottom: 3rem;
  .name {
    font-size: 0.85rem;
  }
  .subtotal {
    display: block;
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
    font-size: 1rem;
  }
  .price {
    display: block;
    font-size: 1rem;
    color: var(--clr-primary-5);
    font-weight: 400;
  }
  .title {
    height: 100%;
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 100px 200px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  .amount-btn {
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 0.5rem;
    align-items: center;
    button {
      background: transparent;
      border-color: transparent;
      cursor: pointer;
      padding: 1rem 0;
      width: 1.5rem;
      height: 1rem;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h2 {
      font-size: 1.5rem;
    }
  }
`;
