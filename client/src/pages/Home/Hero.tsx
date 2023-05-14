import styled from "styled-components";
import { Link } from "react-router-dom";
import homeImg1 from "../../assets/home-1.jpg";
import homeImg2 from "../../assets/home-2.jpg";

export const Hero = () => {
  return (
    <Wrapper className="section-center">
      <article>
        <h1>
          Find Your <br />
          Secret Taste
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam
          eget felis eget nunc lobortis.
        </p>
        <Link to="/products" className="btn hero-btn">
          Shop Now
        </Link>
      </article>
      <article className="img-container">
        <img src={homeImg1} alt="img1" className="main-img" />
        <img src={homeImg2} alt="img2" className="sub-img" />
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 70vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;
  place-items: center;
  margin-bottom: 3rem;
  h1 {
    padding-bottom: 1rem;
    line-height: 1.2;
    /* color: var(--clr-primary-2); */
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    /* color: var(--clr-primary-3); */
    font-size: 1.25rem;
  }
  .hero-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 700;
  }
  .img-container {
    display: block;
    position: relative;
  }
  .main-img {
    width: 100%;
    height: 550px;
    position: relative;
    border-radius: var(--radius);
    display: block;
    object-fit: cover;
  }
  .sub-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 250px;
    transform: translateX(-50%);
    border-radius: var(--radius);
  }
  .img-container::before {
    content: "";
    position: absolute;
    width: 10%;
    height: 80%;
    background: var(--clr-primary-9);
    bottom: 0%;
    left: -8%;
    border-radius: var(--radius);
  }
`;
