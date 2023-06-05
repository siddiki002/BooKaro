import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

import "./Admin.css";
import AdminUserWidget from "../User/AdminUserWidget";
import Setting from "../User/Setting";
import AdminBus from "./AdminBus";
import AdminCricket from "./AdminCricket";

export default function Admin() {
  const [cookies] = useCookies(["admin"]);

  const [admin, setAdmin] = useState({
    fname: "",
    lname: "",
    email: "",
  });
  const [state, setState] = useState("cricket");

  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.admin === undefined) {
      console.log(cookies);
      navigate("/signin");
      return;
    }

    axios
      .post("http://localhost:5001/getAdmin", {
        _id: cookies.admin,
      })
      .then(
        (response) => {
          console.log(response);

          if (response.data && "_id" in response.data) {
            console.log(response.data);
            setAdmin((prevState) => ({
              ...prevState,
              fname: response.data.fname,
              lname: response.data.lname,
              email: response.data.username,
            }));
            return;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }, []);

  return (
    <div className="Admin">
      <div className="Admin-navbar">
        <img
          className="Admin-logo"
          src="https://bookmepk.s3.eu-central-1.amazonaws.com/static/custom/V3/images/new-logo-header.png"
          alt="BookMe Logo"
        />

        <div className="home-btn">
          <AdminUserWidget
            user={admin}
            setUser={setAdmin}
            setState={setState}
          />
        </div>
      </div>

      <div className="admin-split">
        <div className="admin-options">
          <div
            className="admin-opt"
            onClick={() => setState("cricket")}
          >
            Cricket Ticket
          </div>
          <div
            className="admin-opt"
            onClick={() => setState("bus")}
          >
            Bus Ticket
          </div>
        </div>
        <div className="admin-states">
          {state === "setting" && (
            <Setting
              user={admin}
              setUser={setAdmin}
              isAdmin={true}
            />
          )}
          {state === "cricket" && <AdminCricket />}
          {state === "bus" && <AdminBus />}
        </div>
      </div>
    </div>
  );
}
