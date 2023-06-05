import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Signin from "./frontend/Login/Signin";
import Signup from "./frontend/Login/Signup";
import Home from "./frontend/Home/Home";
import Welcome from "./frontend/Welcome/welcome";
import Admin from "./frontend/Admin/Admin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home />}
          ></Route>
          <Route
            exact
            path="/admin"
            element={<Admin />}
          ></Route>
          <Route
            exact
            path="/signin"
            element={<Signin />}
          ></Route>
          <Route
            exact
            path="/signup"
            element={<Signup />}
          ></Route>
          <Route
            exact
            path="/confirm/:confirmationCode  "
            element={<Welcome />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
