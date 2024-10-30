import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginLayout from "./components/layouts/LoginLayout";
import MainLayout from "./components/layouts/MainLayout";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import { NotFound } from "./pages/statusCode/NotFound";
import { Home } from "./pages/home/Home";
import { SnackbarProvider } from "./context/SnackbarContext";
import { MyDreams } from "./pages/Dreams/MyDreams/MyDreams";
import { RegisterDream } from "./pages/register/RegisterDream";

function App() {
    return (
        <>
            <BrowserRouter>
                <SnackbarProvider>
                    <Routes>
                        <Route element={<LoginLayout />}>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Route>


                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/my/dream" element={<MyDreams />} />
                            <Route path="/register/dream" element={<RegisterDream />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </SnackbarProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
