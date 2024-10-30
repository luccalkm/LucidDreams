import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import { Home } from "./pages/Home";
import RegisterPage from "./pages/auth/Register";
import LoginLayout from "./components/layouts/LoginLayout";
import { ToastContainer } from "react-toastify";
import { NotFound } from './pages/statusCode/NotFound';
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./components/layouts/MainLayout";

function App() {
    return (
        <>
            <ToastContainer position="bottom-right" theme="colored" />
            <Routes>
                <Route element={<LoginLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
