import styled from "styled-components";
import { useOrdersContext } from "../../context/order/order-context";
import { useAuthContext } from "../../context/auth/auth-context";
import { useEffect } from "react";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
import { OrderCard } from "./OrderCard";

export const Order = () => {
  const { user } = useAuthContext();

  if (user!.role === "admin") {
    const {
      getOrders,
      orders,
      orders_loading: loading,
      orders_error: error,
    } = useOrdersContext();
    useEffect(() => {
      getOrders();
    }, []);
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error />;
    }

    if (orders.length < 1) {
      return (
        <Wrapper>
          <div className="empty">
            <h3>No Order Found</h3>
          </div>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        {orders.map((order) => {
          return <OrderCard key={order._id} {...order} />;
        })}
      </Wrapper>
    );
  }

  const {
    getUserOrder,
    user_order_loading: loading,
    user_order_error: error,
    user_order,
  } = useOrdersContext();

  useEffect(() => {
    getUserOrder();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Wrapper>
      {user_order.map((order) => {
        return <OrderCard key={order._id} {...order} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
