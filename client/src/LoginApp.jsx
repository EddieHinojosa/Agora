import { Outlet } from "react-router-dom";
import LoginNavbar from "./components/login/LoginNav";
import Footer from "./components/Footer";

function LoginApp() {
  return (
    <>
      <LoginNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default LoginApp;
