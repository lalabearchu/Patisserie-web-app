import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/auth/auth-context";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { Loading } from "../../components/Loading";

export const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const {
    login,
    login_loading: loading,
    login_error: error,
  } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(input);
      navigate("/");
    } catch (error) {
      return;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <div className="page section section-center">
        <h2>Login</h2>
        {error && <h5>{error}</h5>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={input.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={input.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <Link to="/register" className="reg-link">
          Click Here To Register
        </Link>
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
    width: 6rem;
  }
  input {
    border-radius: var(--radius);
    height: 1.5rem;
    padding: 0.25rem;
  }
  button {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }
  a {
    font-size: 1.25rem;
    color: var(--clr-grey-1);
  }
`;
