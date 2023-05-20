import "./AppHeader.scss";
import AppLogo from "@assets/images/app-logo.png";

const AppHeader = () => {
  return (
    <div className="inline-flex w-full">
      <img src={AppLogo} alt="App Logo" width={'150rem'} height={'auton'}/>
      <div className="text-red-600">Header</div>
    </div>
  );
};

export default AppHeader;
