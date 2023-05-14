import styled from "styled-components";
import { PageHero } from "../../components/PageHero";
import { Filter } from "./Filter";
import { Sort } from "./Sort";
import { ProductList } from "./ProductList";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/auth/auth-context";

export const Products = () => {
  const { user } = useAuthContext();
  return (
    <main>
      <PageHero title="Products" SingleProductPage={false} />

      <Wrapper className="page-hero">
        {user && user.role === "admin" && (
          <div className="section-center admin-btn-container">
            <Link to="/products/create" className="btn">
              Create Product
            </Link>
          </div>
        )}
        <div className="section-center products">
          <Filter />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 3rem 1.5rem;
    margin: 2rem auto;
  }
  .admin-btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
  }
`;
