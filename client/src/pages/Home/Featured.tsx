import styled from "styled-components";
import { Link } from "react-router-dom";
import { FeaturedCard } from "./FeaturedCard";
import { useProductsContext } from "../../context/products/products-context";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

export const Featured = () => {
  const {
    products_loading: loading,
    products_error: error,
    featured_products: products,
  } = useProductsContext();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>Featured Products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {products.slice(0, 3).map((product) => {
          const { _id: id, name, price, image } = product;
          return (
            <FeaturedCard
              key={id}
              id={id}
              name={name}
              price={price}
              img={image}
            />
          );
        })}
      </div>
      <Link to="/products" className="btn">
        all products
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 140px;
    margin: 0 auto;
    text-align: center;
  }
`;
