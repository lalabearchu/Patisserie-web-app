import styled from "styled-components";
import { useProductsContext } from "../../context/products/products-context";

export const Sort = () => {
  const { products, sort, updateSort } = useProductsContext();

  return (
    <Wrapper>
      <p>{products.length} products found</p>
      <hr />
      <form>
        <label htmlFor="sort">Sort By</label>
        <select
          name="sort"
          id="sort"
          className="sort-input"
          value={sort}
          onChange={updateSort}
        >
          <option value="price-lowest">Price (Lowest)</option>
          <option value="price-highest">Price (Highest)</option>
          <option value="date-latest">Date (Latest)</option>
          <option value="date-oldest">Date (Oldest)</option>
        </select>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;

  p {
    margin-bottom: 0rem;
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
  }
`;
