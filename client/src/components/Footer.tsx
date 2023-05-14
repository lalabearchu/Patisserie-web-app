import styled from "styled-components";

export const Footer = () => {
  return (
    <Wrapper>
      <h5>
        &copy; {new Date().getFullYear()}
        <span> Patisserie</span>
      </h5>
      <h5>&nbsp; All rights reserved</h5>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--clr-black);
  h5 {
    color: var(--clr-white);
    margin-bottom: 0;
    line-height: 1.25;
    letter-spacing: var(--spacing);
    font-weight: 400;
  }
  span {
    color: var(--clr-primary-5);
  }
`;
