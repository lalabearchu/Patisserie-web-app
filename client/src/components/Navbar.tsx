import styled from "styled-components";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { NavButtons } from "./NavButtons";

export const Navbar = () => {
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="logo" />
            <span>Pâtisserie</span>
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
        <NavButtons />
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .nav-center {
    width: 95vw;
    max-width: var(--max-width);
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
  }

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 170px;
    img {
      width: 2rem;
      transform: translate(-20%, 15%);
    }
    a {
      color: var(--clr-primary-5);
      font-size: 1.75rem;
      margin: auto 0;
      letter-spacing: var(--spacing);
    }
  }

  .nav-links {
    display: flex;
    justify-content: center;
    li {
      margin: 0 2rem;
    }
    a {
      color: var(--clr-primary-5);
      font-size: 1rem;
      letter-spacing: var(--spacing);
      padding: 0.5rem;
      &:hover {
        border-bottom: 2px solid var(--clr-primary-7);
      }
    }
  }
`;
