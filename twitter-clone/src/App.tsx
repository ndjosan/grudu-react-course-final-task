import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import NotAuthRoutes from "./utils/NotAuthRoutes";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { UserProvider } from "./state/UserContext";

const App = () => {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<PrivateRoutes />}>
                <Route element={<HomePage />} path="/" />
              </Route>
              <Route element={<NotAuthRoutes />}>
                <Route element={<LoginPage />} path="/login" />
                <Route element={<SignupPage />} path="/signup" />
              </Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;
