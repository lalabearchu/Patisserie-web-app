import styled from "styled-components";
import { useProductsContext } from "../../context/products/products-context";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { Loading } from "../../components/Loading";

export const CreateProduct = () => {
  const [input, setInput] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "Cake",
    featured: false,
  });
  const [msg, setMsg] = useState("");
  const {
    createProduct,
    create_product_loading: loading,
    create_product_error: error,
  } = useProductsContext();
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createProduct(input);
      navigate("/products");
    } catch (err) {
      setMsg(error!);
      return;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <div className="page section section-center">
        <h2>Create Product</h2>
        {error && <h5>{msg}</h5>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={input.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              min={0}
              value={input.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="image">Image</label>
            <input
              type="url"
              name="image"
              id="image"
              value={input.image}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={input.category}
              onChange={handleChange}
            >
              <option value="Cake">Cake</option>
              <option value="Tart">Tart</option>
              <option value="Macaron">Macaron</option>
              <option value="Cookie">Cookie</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              onChange={handleChange}
              rows={4}
              cols={22}
            ></textarea>
          </div>
          <div className="form-row">
            <label htmlFor="featured">Featured</label>
            <input
              type="checkbox"
              id="featured"
              name="featured"
              onChange={handleCheck}
              checked={input.featured}
            />
          </div>
          <button type="submit" className="btn">
            Create
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  text-align: center;
  h2 {
    margin-bottom: 2rem;
  }
  h5 {
    color: var(--clr-red-dark);
  }
  .form-row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  label {
    font-size: 1.25rem;
    margin-right: 5px;
    width: 8rem;
  }
  input {
    border-radius: var(--radius);
    height: 1.5rem;
    padding: 0.25rem 0.5rem;
  }
  button {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }
  a {
    font-size: 1.25rem;
    color: var(--clr-grey-1);
  }
  select {
    width: 190px;
    border-radius: var(--radius);
    padding: 0.25rem 0.5rem;
  }
  textarea {
    padding: 0.25rem 0.5rem;
  }
`;
