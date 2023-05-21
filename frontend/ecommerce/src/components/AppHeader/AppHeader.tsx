import "./AppHeader.scss";
import AppLogo from "@assets/images/app-logo-removebg.png";

const AppHeader = () => {
  return (
    <div className="flex justify-between">
      <a href="/"><img src={AppLogo} alt="App Logo" width={'150rem'} height={'auton'}/></a>
      <div className="auth-container"><a href="/login">login</a></div>
    </div>
  );
};

export default AppHeader;
