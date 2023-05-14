import styled from "styled-components";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <Wrapper className="page">
      <section>
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <Link to="/" className="btn">
          back home
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    margin-bottom: 2rem;
  }
`;
