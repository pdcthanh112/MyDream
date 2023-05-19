import React, { Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const MainLayout = React.lazy(() => import("./pages/Layout/MainLayout"));

// Pages
const Login = React.lazy(() => import("./pages/Login"));
// const Register = React.lazy(() => import("./views/pages/register/Register"));
// const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
// const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="*" element={<MainLayout />}>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
