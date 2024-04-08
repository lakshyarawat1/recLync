import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import axios from "axios";
import SetPreferences from "./pages/SetPreferences";

function App() {
  axios.defaults.baseURL = "http://localhost:4000/api";

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/set-preferences" element={<SetPreferences />} />
      </Routes>
    </>
  );
}

export default App;
