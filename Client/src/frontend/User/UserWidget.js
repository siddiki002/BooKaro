import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./User.css";

export default function UserWidget({ user, setUser, setState }) {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies(["user"]);
  console.log(cookies);

  useEffect(() => {
    axios
      .post("http://localhost:5001/user", {
        _id: cookies.user,
      })
      .then((res) => {
        console.log(res);

        if (res.data[0] && "_id" in res.data[0]) {
          setUser({
            fname: res.data[0].fname,
            lname: res.data[0].lname,
            email: res.data[0].email,
          });
        } else {
          removeCookies("user");
        }
      });
  }, []);

  // function handleMouseEnter() {
  //   setShow(true);
  // }

  //   function handleMouseLeave() {
  //     setShow(false);
  //   }

  function handleClick() {
    setShow(show ? false : true);
  }

  function handleSignOut() {
    setUser({
      fname: "",
      lname: "",
      email: "",
    });
    removeCookies("user");
    navigate("/signin");
  }

  function handleSetting() {
    setState("setting");
    setShow(false);
  }

  function handleTickets() {
    setState("tickets");
    setShow(false);
  }

  return (
    <div>
      <div
        className="user-widget"
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        Hi {user.fname}
      </div>
      <div
        className="user-widget-content"
        style={{ display: show ? "block" : "none" }}
      >
        <div
          className="widget-option"
          onClick={handleSetting}
        >
          Settings
        </div>
        <div
          className="widget-option"
          onClick={handleTickets}
        >
          My Tickets
        </div>
        <div
          className="widget-option"
          style={{
            borderRadius: "4px",
          }}
          id="sign-out"
          onClick={handleSignOut}
        >
          Sign Out
        </div>
      </div>
    </div>
  );
}
