import React, { Suspense } from "react";
import "./AppContent.module.scss";
// import { Navigate, Route, Routes } from "react-router-dom";
// import routes from "routes";

const AppContent = () => {
  return (
    <Suspense>
      {/* <Routes>
        {routes.map((route, id) => {
          return route.element && <Route key={id} path={route.path} element={<route.element />} />;
        })}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes> */}
    </Suspense>
  );
};

export default React.memo(AppContent);
