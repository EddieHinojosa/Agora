import { Outlet } from "react-router-dom";
import ShopNavbar from "./components/ShopManager/Main/ShopNavbar";
import Footer from "./components/Home/Footer";

function LoginApp() {
  return (
    <>
      <ShopNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default LoginApp;
