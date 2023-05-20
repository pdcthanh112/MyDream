import React from "react";
import AppHeader from "@components/AppHeader";
import AppContent from "@components/AppContent";
import AppFooter from "@components/AppFooter";
import AppSidebar from "@components/AppSidebar";
import styled from "styled-components";

const MainLayout = () => {
  
  const Header = styled.div`
    width: "100vw";
    height: "5vh";
  `;

  const Body = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: "#FBF9F6";
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
