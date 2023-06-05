import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./Home.css";
import Info from "./Info";
import Bus from "./Bus";
import Cricket from "./Cricket";
import UserWidget from "../User/UserWidget";
import Setting from "../User/Setting";
import MyTickets from "../User/MyTickets";

export default function Home() {
  // for selecting options: Info or Bus or Cricket Page
  const [state, setState] = useState("info");
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
  });

  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies(["user"]);

  return (
    <div className="Home">
      <div className="home-navbar">
        <img
          className="home-logo"
          src="https://bookmepk.s3.eu-central-1.amazonaws.com/static/custom/V3/images/new-logo-header.png"
          alt="BookMe Logo"
          onClick={() => setState("info")}
        />

        {cookies.user == undefined ? (
          <button
            className="home-btn"
            onClick={() => navigate("/signin")}
          >
            Login
          </button>
        ) : (
          <div className="home-btn">
            <UserWidget
              user={user}
              setUser={setUser}
              setState={setState}
            />
          </div>
        )}
      </div>

      <div className="services">
        <div
          className="service-tag"
          id="bus"
          onClick={() => setState("bus")}
        >
          Bus
        </div>

        <div
          className="service-tag"
          id="cricket"
          onClick={() => setState("cricket")}
        >
          Cricket
        </div>
      </div>

      {state === "info" && <Info />}

      {state === "bus" && <Bus />}

      {state === "cricket" && <Cricket />}

      {state === "setting" && (
        <Setting
          user={user}
          setUser={setUser}
          isAdmin={false}
        />
      )}

      {state === "tickets" && <MyTickets />}
    </div>
  );
}
