import styled from "styled-components";
import { PageHero } from "../../components/PageHero";
import { Sidebar } from "./Sidebar";
// import { OrderList } from "./OrderList";
import { Outlet } from "react-router-dom";

export const UserLayout = () => {
  return (
    <main>
      <PageHero title="User" SingleProductPage={false} />
      <Wrapper className="page-hero">
        <div className="section-center user-container">
          <Sidebar />
          <Outlet />
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .user-container {
    display: grid;
    grid-template-columns: 200px 1fr;
    margin: 2rem auto;
    gap: 2rem 1.5rem;
  }
`;
