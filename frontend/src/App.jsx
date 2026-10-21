import { useContext, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { Custmize } from "./pages/Custmize";
import { UserDataContext } from "./context/UserContext";

function App() {
  const [count, setCount] = useState(0);
  const { userData, setUserData } = useContext(UserDataContext);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            userData?.assistantImage && userData.assistantName ? (
              <Home />
            ) : (
              <Navigate to="/customize" />
            )
          }
        />
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/customize"
          element={userData ? <Custmize /> : "/signin"}
        />
      </Routes>
    </>
  );
}

export default App;
