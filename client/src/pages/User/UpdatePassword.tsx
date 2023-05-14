import styled from "styled-components";
import { useAuthContext } from "../../context/auth/auth-context";
import { ChangeEvent, FormEvent, useState } from "react";
import { Loading } from "../../components/Loading";

export const UpdatePassword = () => {
  const {
    updatePassword,
    update_password_loading: loading,
    update_password_error: error,
  } = useAuthContext();
  const [input, setInput] = useState({ oldPassword: "", newPassword: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePassword(input);
      setMsg("Succeeded!");
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
      <h3>Change Password</h3>
      {<h5>{msg}</h5>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            value={input.oldPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="email">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={input.newPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn">
          Update
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  text-align: center;
  form {
    margin-top: 2rem;
  }
  h5 {
    margin-top: 2rem;
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
    width: 12rem;
  }
  input {
    border-radius: var(--radius);
    padding: 0.25rem;
    height: 1.5rem;
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
