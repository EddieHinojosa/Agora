import { Outlet } from "react-router-dom";
import LoginNav from "./components/login/LoginNav";
import Footer from "./components/Footer";

function LoginApp() {
  return (
    <>
      <LoginNav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default LoginApp;
