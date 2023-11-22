import { Route, Routes } from "react-router-dom";
import { Registration } from "../../pages/registration";
import { ForgotPassword } from "../../pages/forgot-password";
import { Login } from "../../pages/login";
import { AuthLayout } from "./AuthLayout";

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
);

export { AuthPage };
