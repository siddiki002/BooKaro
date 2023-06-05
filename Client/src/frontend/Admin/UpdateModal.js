import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import "./Admin.css";
import "../Home/Home.css";

export default function UpdateModal({
  event,
  modal,
  setModal,
  change,
  setChange,
}) {
  const [cricket, setCricket] = useState({
    key: 0,
    team1: "",
    team2: "",
    time: "",
    date: "",
    venue: "",
    city: "",
  });

  const [bus, setBus] = useState({
    key: 0,
    pickup: "",
    arrival: "",
    date: "",
    pickup_time: "",
    arrival_time: "",
    seats: 0,
    price: 0,
  });

  const [cookies] = useCookies(["admin"]);

  // API cal for getting tickets info using modal.key
  useEffect(() => {
    if (event == "cricket") {
      // get bus ticket info
      console.log("Getting Cricket Ticket");
      axios
        .post("http://localhost:5001/getCricketTicket", {
          _id: modal.key,
        })
        .then(
          (response) => {
            console.log(response);

            if (response.data && "_id" in response.data) {
              console.log(response);
              setCricket((prevState) => ({
                ...prevState,
                ...response.data,
              }));
              return;
            }
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      // get cricket ticket info
      console.log("Getting Bus Ticket");
      axios
        .post("http://localhost:5001/getBusTicket", {
          _id: modal.key,
        })
        .then(
          (response) => {
            console.log(response);

            if (response.data && "_id" in response.data) {
              console.log(response.data);
              setBus((prevState) => ({
                ...prevState,
                ...response.data,
              }));
              return;
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }, []);

  useEffect(() => {
    
  }, []);

  function handleClose() {
    setModal({
      key: 0,
      show: false,
    });
  }

  function handleCricket(e) {
    setCricket((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleBus(e) {
    setBus((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  //   API Call for updation  of ticket
  function handleUpdate() {
    if (event === "cricket") {
      axios
        .post("http://localhost:5001/admin/update/cricket", {
          ticket: cricket,
          admin: cookies.admin,
          _id: modal.key,
        })
        .then((response) => {
          console.log("Updated successFully");
          setChange(change ? false : true);
          setModal({
            key: 0,
            show: false,
          });
        })
        .catch((error) => {
          alert(error);
          console.log(
            "An error occured while entering into the cricket database"
          );
        });
    } else {
      axios
        .post("http://localhost:5001/admin/update/bus", {
          ticket: bus,
          admin: cookies.admin,
          _id: modal.key,
        })
        .then((response) => {
          console.log("Updated successFully");
          setChange(change ? false : true);
          setModal({
            key: 0,
            show: false,
          });
        })
        .catch((error) => {
          alert(error);
          console.log(
            "An error occured while entering into the cricket database"
          );
        });
    }
  }

  console.log(event, cricket, bus);

  return (
    <div
      className="modal"
      style={{ display: modal.show ? "Block" : "None" }}
      onClick={handleClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-title">Ticket Info</div>

        <div className="admin-create-body">
          {event === "cricket" && (
            <div>
              <div className="admin-create-inp">
                Team 1:
                <input
                  type="text"
                  name="team1"
                  onChange={handleCricket}
                  value={cricket.team1}
                />
              </div>
              <div className="admin-create-inp">
                Team 2:
                <input
                  type="text"
                  name="team2"
                  onChange={handleCricket}
                  value={cricket.team2}
                />
              </div>
              <div className="admin-create-inp">
                Date:
                <input
                  type="date"
                  name="date"
                  onChange={handleCricket}
                  value={cricket.date}
                />
              </div>
              <div className="admin-create-inp">
                Time:
                <input
                  type="time"
                  name="time"
                  onChange={handleCricket}
                  value={cricket.time}
                />
              </div>
              <div className="admin-create-inp">
                Venue:
                <input
                  type="text"
                  name="venue"
                  onChange={handleCricket}
                  value={cricket.venue}
                />
              </div>
              <div className="admin-create-inp">
                City:
                <input
                  type="text"
                  name="city"
                  onChange={handleCricket}
                  value={cricket.city}
                />
              </div>
            </div>
          )}
          {event === "bus" && (
            <div>
              <div className="admin-create-inp">
                Pick UP:
                <input
                  type="text"
                  name="pickup"
                  onChange={handleBus}
                  value={bus.pickup}
                />
              </div>
              <div className="admin-create-inp">
                arrival:
                <input
                  type="text"
                  name="arrival"
                  onChange={handleBus}
                  value={bus.arrival}
                />
              </div>
              <div className="admin-create-inp">
                Date:
                <input
                  type="date"
                  name="date"
                  onChange={handleBus}
                  value={bus.date}
                />
                <div className="admin-create-inp">
                  Pick up time:
                  <input
                    type="time"
                    name="pickup_time"
                    onChange={handleBus}
                    value={bus.pickup_time}
                  />
                </div>
                <div className="admin-create-inp">
                  Arrival Time:
                  <input
                    type="time"
                    name="arrival_time"
                    onChange={handleBus}
                    value={bus.arrival_time}
                  />
                </div>
              </div>
              <div className="admin-create-inp">
                Seats:
                <input
                  type="number"
                  name="seats"
                  onChange={handleBus}
                  value={bus.seats}
                />
              </div>
              <div className="admin-create-inp">
                Price:
                <input
                  type="number"
                  name="price"
                  onChange={handleBus}
                  value={bus.price}
                />
              </div>
            </div>
          )}
          <button
            className="admin-create-btn"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>

        <div className="modal-footer">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
