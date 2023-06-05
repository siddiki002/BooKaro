import { useState } from "react";
import { useCookies } from "react-cookie";

import axios from "axios";

import "../Home/Home.css";
import "./User.css";

export default function Setting({ user, setUser, isAdmin }) {
  console.log(user.fname, user.lname, user.email);
  const [input, setInput] = useState({
    ...user,
    Password: "",
    reenter_pass: "",
  });
  console.log(input);

  const [cookies] = useCookies(["user"], ["admin"]);

  function handleInput(e) {
    console.log("change");
    document.getElementsByClassName("setting-btn")[0].style.backgroundColor =
      "#f91111c7";

    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit() {
    if (input.Password !== input.reenter_pass) {
      alert("Passwords Don't Match");
      return;
    }

    // Update Admin API Call
    if (isAdmin) {
      axios
        .post("http://localhost:5001/admin/update", {
          _id: cookies.admin,
          fname: input.fname,
          lname: input.lname,
          email: input.email,
          Password: input.Password,
        })
        .then((res) => {
          console.log(res);

          if (res.status == 200) {
            console.log("Changed");
            setUser((prevState) => ({
              ...prevState,
              ...input,
            }));

            document.getElementsByClassName(
              "setting-btn"
            )[0].style.backgroundColor = "rgb(230, 230, 230)";

            setInput({
              ...user,
              Password: "",
              reenter_pass: "",
            });
          } else {
            console.log("error");
          }
        });
    } else {
      console.log(cookies.user);
      axios
        .post("http://localhost:5001/user/update", {
          _id: cookies.user,
          fname: input.fname,
          lname: input.lname,
          email: input.email,
          Password: input.Password,
        })
        .then((res) => {
          console.log(res);

          if (res.status == 200) {
            console.log("Changed");
            setUser((prevState) => ({
              ...prevState,
              ...input,
            }));

            document.getElementsByClassName(
              "setting-btn"
            )[0].style.backgroundColor = "rgb(230, 230, 230)";

            setInput({
              ...user,
              Password: "",
              reenter_pass: "",
            });
          } else {
            console.log("error");
          }
        });
    }
  }

  return (
    <div className="setting">
      <div className="home-title title">Settings</div>
      <div className="setting-box">
        <div className="setting-label">First Name </div>
        <input
          type="text"
          className="setting-inp"
          name="fname"
          value={input.fname}
          onChange={handleInput}
        />
        <div className="setting-label">Last Name </div>
        <input
          type="text"
          className="setting-inp"
          name="lname"
          value={input.lname}
          onChange={handleInput}
        />
        <div className="setting-label">{isAdmin ? "Username" : "Email"}</div>
        <input
          type="email"
          className="setting-inp"
          name="email"
          value={input.email}
          onChange={handleInput}
        />
        <div className="setting-label">Password </div>
        <input
          type="password"
          className="setting-inp"
          name="Password"
          value={input.Password}
          onChange={handleInput}
        />
        <div className="setting-label">Re-enter Password </div>
        <input
          type="password"
          className="setting-inp"
          name="reenter_pass"
          value={input.reenter_pass}
          onChange={handleInput}
        />
        <button
          className="setting-btn"
          onClick={handleSubmit}
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
}
