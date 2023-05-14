import styled from "styled-components";
import { SingleOrder } from "../../context/order/order-context";
import moment from "moment";

export const OrderCard = (order: SingleOrder) => {
  const { _id: id, total, orderItems } = order;
  let time = order.createdAt;
  return (
    <Wrapper>
      <div className="id-time">
        <p>ID : {id}</p>
        <p>{moment(time).local().format("YYYY-MM-DD HH:mm")}</p>
      </div>
      <hr />
      <div className="item-container">
        {orderItems.map((item) => {
          const { _id, name, amount, price } = item;
          return (
            <div key={_id} className="item">
              <p>{name}</p>
              <p className="item-amount">{amount}</p>
              <p className="item-price">NT${price}</p>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="total">
        <h5>Total</h5>
        <h5>NT${total}</h5>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  border: 1px solid var(--clr-grey-5);
  border-radius: var(--radius);
  padding: 1rem;
  display: grid;
  align-items: center;
  .id-time {
    display: flex;
    justify-content: space-between;
  }
  .item-container {
    margin-top: 1rem;
  }

  .item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .total {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .item-amount {
    text-align: center;
  }

  .item-price {
    text-align: right;
  }
`;
