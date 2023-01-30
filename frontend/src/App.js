import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import NotesScreen from "./screens/NotesScreen";
import NoteDetails from "./screens/NoteDetails";
import PrivateRoute from "./screens/PrivateRoute";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/sign-up" element={<RegisterScreen />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/notes" element={<PrivateRoute />}>
          <Route path="/notes" element={<NotesScreen />} />
        </Route>
        <Route path="/note-detail" element={<PrivateRoute />}>
          <Route path="/note-detail" element={<NoteDetails />} />
        </Route>
        <Route
          path="/api/v1/user/reset/password/:token"
          element={<ResetPassword />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
