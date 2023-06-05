import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Signin() {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  function handleSubmit() {

    if(!user.Email.includes('@') || user.Email.length == 0 || user.Password.length == 0){
      alert("Wrong")
      document.getElementsByClassName("danger")[0].style.display =
              "Block";
      return ;
    }

    if (
      user.Email.length === 0 ||
      user.Password.length === 0 ||
      user.lname.length === 0 ||
      user.fname.length === 0
    ) {
      document.getElementsByClassName("danger")[0].style.display = "block";
    }
    else
    {
      axios.post(('http://localhost:5001/signup') , {
        email : user.Email,
        Password : user.Password,
        lname : user.lname,
        fname : user.fname
      })
      .then( (req,res) => {
        console.log(res)
        navigate("/signin")
      }
      
      )
      .catch((err) => {
        console.log(`Could not sign up`)
      })
      }  
    }
  

  function handleInput(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

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
          name="fname"
          placeholder="First Name"
          value={user.fname}
          style={{ marginBottom: "0px" }}
          type="text"
          onChange={handleInput}
        />
        <input
          className="login-ele inp"
          name="lname"
          placeholder="Last Name"
          value={user.lname}
          style={{ marginBottom: "0px" }}
          type="text"
          onChange={handleInput}
        />
        <input
          className="login-ele inp"
          name="Email"
          placeholder="Email"
          value={user.Email}
          style={{ marginBottom: "0px" }}
          type="email"
          onChange={handleInput}
        />
        <input
          className="login-ele inp"
          name="Password"
          placeholder="Password"
          value={user.Password}
          style={{ marginBottom: "0px" }}
          type="password"
          onChange={handleInput}
        />
        <div className="error">
          <div className="danger">Input All required Fields</div>
        </div>
        <button
          className="login-ele btn"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
        <div
          className="login-ele link"
          onClick={() => navigate("/signin")}
        >
          Already have an account
        </div>
      </div>
    </div>
  );
}
