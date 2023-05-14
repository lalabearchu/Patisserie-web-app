import styled from "styled-components";
import { ProductCard } from "./ProductCard";
import { useProductsContext } from "../../context/products/products-context";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

export const ProductList = () => {
  const {
    products_loading: loading,
    products_error: error,
    products,
  } = useProductsContext();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Wrapper>
      <div className="products-container">
        {products.map((product) => {
          const { _id: id, name, price, image } = product;
          return (
            <ProductCard
              key={id}
              id={id}
              name={name}
              price={price}
              img={image}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    height: 175px;
  }
  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }
  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
