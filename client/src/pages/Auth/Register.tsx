import styled from "styled-components";
import { useAuthContext } from "../../context/auth/auth-context";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { Loading } from "../../components/Loading";

export const Register = () => {
  const [input, setInput] = useState({ name: "", email: "", password: "" });
  const {
    register,
    register_loading: loading,
    register_error: error,
  } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(input);
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
        <h2>Register</h2>
        {error && <h5>{error}</h5>}
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
            Submit
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
    width: 6rem;
  }
  input {
    border-radius: var(--radius);
    height: 1.5rem;
    padding: 0.25rem;
  }
  button {
    margin-top: 1rem;
  }
`;
