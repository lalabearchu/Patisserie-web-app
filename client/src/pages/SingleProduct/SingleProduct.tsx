import styled from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PageHero } from "../../components/PageHero";
import { CartButton } from "./CartButton";
import { useProductsContext } from "../../context/products/products-context";
import { useAuthContext } from "../../context/auth/auth-context";
import { useEffect } from "react";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

export const SingleProduct = () => {
  const { id } = useParams();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    getSingleProduct,
    deleteProduct,
  } = useProductsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleProduct(id!);
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }
  const { name, price, description, image, category } = product;

  return (
    <Wrapper>
      <PageHero title={name} SingleProductPage={true} />
      <div className="section section-center page-hero">
        <div className="product-center">
          <img src={image} alt="product image" />
          <section className="content">
            <h2>{name}</h2>
            <h5 className="price">NT${price}</h5>
            <p className="description">{description}</p>
            <p className="category">
              <span>Category: </span>
              {category}
            </p>
            <hr />
            <CartButton product={product} />
          </section>
        </div>
        {user && user.role === "admin" && (
          <div className="admin-btn-container">
            <Link to={`/products/update/${id}`} className="btn update-btn">
              Update Product
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => {
                deleteProduct(id!);
                navigate("/products");
              }}
            >
              Delete Product
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 4rem;
  }
  img {
    width: 30rem;
    height: 20rem;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .price {
    color: var(--clr-primary-5);
    font-size: 1.25rem;
  }
  .description {
    line-height: 2;
    max-width: 45em;
  }
  .category {
    width: 300px;
    display: grid;
    grid-template-columns: 100px 1fr;
    span {
      font-weight: 700;
    }
  }
  .admin-btn-container {
    display: flex;
    justify-content: flex-start;
    margin-top: 4rem;
    gap: 8.75rem;
    .btn:hover {
      color: var(--clr-primary-10);
    }
  }
  .update-btn {
    background: var(--clr-grey-2);
  }
  .delete-btn {
    background: var(--clr-red-dark);
  }
`;
