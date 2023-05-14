import styled from "styled-components";
import { useProductsContext } from "../../context/products/products-context";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
import { useEffect } from "react";

export const UpdateProduct = () => {
  const { id } = useParams();

  const {
    single_product_loading: product_loading,
    single_product_error: product_error,
    single_product: product,
    getSingleProduct,
    update_product_loading: update_loading,
    update_product_error: update_error,
    updateProduct,
  } = useProductsContext();

  const { name, price, description, image, category, featured } = product;
  console.log(name);
  const [input, setInput] = useState({
    name: name,
    price: price,
    description: description,
    image: image,
    category: category,
    featured: featured,
  });

  const [msg, setMsg] = useState("");

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
      await updateProduct(id!, input);
      navigate(`/products/${id}`);
    } catch (err) {
      setMsg(update_error!);
      return;
    }
  };

  useEffect(() => {
    getSingleProduct(id!);
  }, [id]);

  if (product_loading || update_loading) {
    return <Loading />;
  }

  if (product_error) {
    return <Error />;
  }

  return (
    <Wrapper>
      <div className="page section section-center">
        <h2>Update Product</h2>
        {update_error && <h5>{msg}</h5>}
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
              value={input.description}
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
            Update
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
