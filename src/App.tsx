import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
