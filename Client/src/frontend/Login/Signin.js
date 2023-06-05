import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./Login.css";
import axios from "axios";

export default function Signin() {
  const [user, setUser] = useState({ Email: "", Password: "" });
  const [cookies, setCookies, removeCookies] = useCookies(["user"], ["admin"]);

  removeCookies("user");
  removeCookies("admin");

  const navigate = useNavigate();

  function handleSubmit() {

    // if(!user.Email.includes('@') || user.Email.length == 0 || user.Password.length == 0){
    //   document.getElementsByClassName("danger")[0].style.display =
    //           "Block";
    //   return ;
    // }

    if (user.Email == "admin") {
      axios
        .post("http://localhost:5001/signin/admin", {
          email: user.Email,
          Password: user.Password,
        })
        .then(
          (response) => {
            console.log(response);

            if (response.data && "_id" in response.data) {
              console.log(response.data._id);
              setCookies("admin", response.data._id, {
                maxAge: 60 * 60 * 24,
                path: "/",
              });

              navigate("/admin");
              return;
            }
            // else {

            // }
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      axios
        .post("http://localhost:5001/signin", {
          email: user.Email,
          Password: user.Password,
        })
        .then((res) => {
          console.log(res);

          if (res.data && "_id" in res.data) {
            console.log("success");
            setCookies("user", res.data._id, {
              maxAge: 60 * 60 * 24,
              path: "/",
            });
            navigate("/");
          } else {
            document.getElementsByClassName("danger")[0].style.display =
              "Block";
          }
        });
    }
  }

  function handleInput(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  // console.log(cookies);

  return (
    <div className="centerPage">
      <div className="login-box">
        {/* <div className="login-ele title">BookMe.com</div> */}
        <img
          className="logo"
          src="https://bookmepk.s3.eu-central-1.amazonaws.com/static/custom/V3/images/new-logo-header.png"
          alt=""
          onClick={() => navigate("/")}
        />
        <input
          className="login-ele inp"
          id="Email"
          name="Email"
          placeholder="Email"
          value={user.Email}
          style={{ marginBottom: "0px" }}
          type="email"
          onChange={handleInput}
        />
        <input
          className="login-ele inp"
          id="Password"
          name="Password"
          placeholder="Password"
          value={user.Password}
          style={{ marginBottom: "0px" }}
          type="password"
          onChange={handleInput}
        />
        <div className="error">
          <div className="danger">Wrong Password or Email entered</div>
        </div>
        <button
          id="login"
          className="login-ele btn"
          onClick={handleSubmit}
        >
          Sign In
        </button>
        <div
          className="login-ele link"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
}
