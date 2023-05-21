import React from "react";
import AppHeader from "@components/AppHeader";
import AppContent from "@components/AppContent";
import AppFooter from "@components/AppFooter";
import AppSidebar from "@components/AppSidebar";
import styled from "styled-components";

const MainLayout = () => {
  const Header = styled.div`
    background-image: linear-gradient(to right, rgb(4, 171, 255), rgb(171, 235, 255));
  `;

  const Body = styled.div`
    width: 100vw;
    min-height: 80vh;
    display: inline-flex;
  `;

  const Footer = styled.div`
    width: "100vw";
  `;

  return (
    <React.Fragment>
      <Header>
        <AppHeader />
      </Header>

      <Body>
        <AppSidebar />
        <AppContent />
      </Body>

      <Footer>
        <AppFooter />
      </Footer>
    </React.Fragment>
  );
};

export default MainLayout;
