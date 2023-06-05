import { useEffect, useState } from "react";
import "./Admin.css";
import "../Home/Home.css";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function CreateModal({
  event,
  show,
  setShow,
  change,
  setChange,
}) {
  const [cricket, setCricket] = useState({
    team1: "",
    team2: "",
    time: "",
    date: "",
    venue: "",
    city: "",
  });

  const [bus, setBus] = useState({
    pickup: "",
    arrival: "",
    date: "",
    pickup_time: "",
    arrival_time: "",
    seats: 0,
    price: 0,
  });
  const [cookies] = useCookies(["admin"]);

  function handleClose() {
    setShow(false);
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

  function handleCreate() {
    if (event === "cricket") {
      //API for adding ticket to matches database
      if (
        cricket.team1.length !== 0 ||
        cricket.team2.length !== 0 ||
        cricket.time.length !== 0 ||
        cricket.date.length !== 0 ||
        cricket.venue.length !== 0 ||
        cricket.city.length !== 0
      ) {
        console.log(cricket);
        axios
          .post("http://localhost:5001/admin/create/cricket", {
            ticket: cricket,
            id: cookies.admin,
          })
          .then((response) => {
            console.log("Created successFully");
            setChange(change ? false : true);
            setShow(false);
          })
          .catch((error) => {
            alert(error);
            console.log(
              "An error occured while entering into the cricket database"
            );
          });
      } else {
        alert("Please fill all the fields");
      }
    } else if (event === "bus") {
      // API for adding ticket to buses database
      console.log(bus);
      if (
        bus.pickup.length !== 0 ||
        bus.arrival.length !== 0 ||
        bus.pickup_time.length !== 0 ||
        bus.arrival_time.length !== 0 ||
        bus.seats.length !== 0 ||
        bus.price.length !== 0 ||
        bus.date.length !== 0
      ) {
        axios
          .post("http://localhost:5001/admin/create/bus", {
            ticket: bus,
            id: cookies.admin,
          })
          .then((response) => {
            console.log("Created successFully");
            setChange(change ? false : true);
            setShow(false);
          })
          .catch((error) => {
            alert(error);
            console.log(
              "An error occured while entering into the cricket database"
            );
          });
      } else {
        alert("Please fill all the fields");
      }
    }
  }

  return (
    <div
      className="modal"
      style={{ display: show ? "Block" : "None" }}
      onClick={handleClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-title">Create Ticket</div>

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
            style={{ backgroundColor: "rgb(3 169 244)" }}
            onClick={handleCreate}
          >
            Create
          </button>
        </div>

        <div className="modal-footer">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
