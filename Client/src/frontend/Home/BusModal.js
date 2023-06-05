import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import Payment from "./Payment";

export default function BusModal({ ticket, setTicket, show, setShow }) {
  const [step, setStep] = useState("confirm");
  const [success, setSuccess] = useState(false);

  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();

  var date = new Date(ticket.date);
  var day = {
    0: "Saturday",
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
  };
  var month = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sept",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  function handleClose() {
    setSuccess(false);
    setStep("confirm");
    setShow(show ? false : true);
    setTicket((prevState) => ({
      ...prevState,
      tickets: 1,
    }));
  }

  function handleTicketInput(e) {
    setTicket((prevState) => ({
      ...prevState,
      tickets: e.target.value,
    }));

    // console.log(ticket);
  }

  function handleConfirm() {
    if (cookies.user === undefined) {
      alert("Please Sign in");
      navigate("/signin");
      return;
    }

    if (ticket.tickets > 0 && ticket.tickets <= ticket.left) {
      setStep("payment");
    }
  }

  console.log(ticket);
  return (
    <div
      className="modal"
      style={{ display: show ? "Block" : "None" }}
      onClick={handleClose}
    >
      <div
        className="modal-content"
        style={{ top: "20%", bottom: "20%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-title">
          {step === "confirm" && "Select your seats"}
          {step === "payment" && "Payment"}
        </div>

        <div
          className="payment-modal-body"
          style={{ display: step === "payment" ? "flex" : "none" }}
        >
          <Payment
            ticket={ticket}
            success={success}
            setSuccess={setSuccess}
          />
        </div>

        <div
          className="confirm-modal-body"
          style={{ display: step === "confirm" ? "flex" : "none" }}
        >
          <div className="confirm-title">
            Route: {ticket.pickup} To {ticket.arrival}
          </div>

          <div className="confirm-time">
            Time: {ticket.pickup_time} - {ticket.arrival_time}
          </div>

          <div className="confirm-date">
            Date: {day[date.getDay()]} {date.getDate()} {month[date.getMonth()]}
            , {date.getFullYear()}
          </div>

          <div className="confirm-seatleft">Seats Left: {ticket.left}</div>

          <div className="confirm-ticket-num">
            Tickets:{" "}
            <input
              type="number"
              value={ticket.tickets}
              onInput={handleTicketInput}
            />
          </div>

          <div
            className="confirm-price"
            style={{ marginBottom: "auto" }}
          >
            Price: Rs {ticket.price * ticket.tickets}
          </div>

          <button
            className="confirm-btn"
            style={{
              backgroundColor:
                ticket.tickets > 0 && ticket.tickets <= ticket.left
                  ? "#f91111c7"
                  : "rgb(220, 220, 220)",
            }}
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>

        <div className="modal-footer">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
