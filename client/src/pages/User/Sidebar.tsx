import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/auth/auth-context";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const handleClick = async () => {
    await logout();
    navigate("/");
  };
  return (
    <Wrapper>
      <div className="link-container">
        {user!.role === "admin" ? (
          <Link to="/user" className="btn">
            Check <br /> All Orders
          </Link>
        ) : (
          <Link to="/user" className="btn">
            Check <br /> My Orders
          </Link>
        )}
        <Link to="/user/updateUser" className="btn">
          Change <br /> Name / Email
        </Link>
        <Link to="/user/updatePassword" className="btn">
          Change <br /> Password
        </Link>
        <button type="button" className="btn" onClick={handleClick}>
          Logout
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .link-container {
    position: sticky;
    top: 1rem;
    display: grid;
    align-items: center;
    row-gap: 2rem;
  }

  a {
    width: 150px;
    text-align: center;
    font-size: 0.8rem;
  }
  button {
    width: 150px;
  }
`;
