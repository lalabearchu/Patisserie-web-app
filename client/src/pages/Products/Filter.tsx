import styled from "styled-components";
import { useProductsContext } from "../../context/products/products-context";
import { ChangeEvent, MouseEvent } from "react";

export const Filter = () => {
  const {
    filters: { search, category, featured },
    updateFilters,
    clearFilters,
  } = useProductsContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === "featured") {
      const value = e.target.checked;
      updateFilters(name, value);
    } else {
      const value = e.target.value;
      updateFilters(name, value);
    }
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    updateFilters(target.name, target.textContent!);
  };

  return (
    <Wrapper>
      <div className="container">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search */}
          <div className="single-form">
            <input
              type="text"
              name="search"
              className="search-input"
              value={search}
              onChange={handleChange}
              placeholder="Search"
            />
          </div>
          {/* category */}
          <div className="single-form">
            <h5>Category</h5>
            <button
              type="button"
              name="category"
              className={`${category === "All" ? "active" : null}`}
              onClick={handleClick}
            >
              All
            </button>
            <button
              type="button"
              name="category"
              className={`${category === "Cake" ? "active" : null}`}
              onClick={handleClick}
            >
              Cake
            </button>
            <button
              type="button"
              name="category"
              className={`${category === "Tart" ? "active" : null}`}
              onClick={handleClick}
            >
              Tart
            </button>
            <button
              type="button"
              name="category"
              className={`${category === "Macaron" ? "active" : null}`}
              onClick={handleClick}
            >
              Macaron
            </button>
            <button
              type="button"
              name="category"
              className={`${category === "Cookie" ? "active" : null}`}
              onClick={handleClick}
            >
              Cookie
            </button>
          </div>
          {/* featured */}
          <div className="single-form">
            <h5>Featured</h5>
            <input
              type="checkbox"
              name="featured"
              className="featured"
              onChange={handleChange}
              checked={featured}
            />
          </div>
        </form>
        <button type="button" className="clear-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    position: sticky;
    top: 1rem;
  }

  .single-form {
    margin-bottom: 1.25rem;
    padding: 0;
    /* border-radius: 0; */
    h5 {
      margin-bottom: 0.5rem;
    }
  }

  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }

  button {
    display: block;
    margin: 0.25rem 0;
    padding: 0.25rem 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }

  .featured {
    border-radius: 50%;
  }

  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
`;
