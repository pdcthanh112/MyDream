import "./AppHeader.scss";
import AppLogo from "@assets/images/app-logo.png";

const AppHeader = () => {
  return (
    <>
      <img src={AppLogo} alt="App Logo" />
      <div>Header</div>
    </>
  );
};

export default AppHeader;
