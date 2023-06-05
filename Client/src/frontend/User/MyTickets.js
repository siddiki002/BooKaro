import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import "../Home/Home.css";
import "./User.css";
import BusTicket from "../Home/BusTicket";
import CricketTicket from "../Home/CricketTicket";
import QRModal from "./QRModal";
import axios from "axios";

export default function MyTickets() {
  const [cookies] = useCookies(["user"]);
  const [event, setEvent] = useState("bus");
  const [modal, setModal] = useState({
    key: 0,
    show: false,
  });
  const [myCricketTickets, setMyCricketTickets] = useState([]);
  const [myBusTickets, setMyBusTickets] = useState([]);

  //API route to get tickets of user
  useEffect(() => {
    axios
      .get(`http://localhost:5001/user/ticket/${cookies.user}`)
      .then((res) => {
        console.log(res);

        // Process and set cricket tickets
        let cricket = [];
        for (let i = 0; i < res.data.cricketTickets.length; i++) {
          const item = res.data.cricketTickets[i];
          const temp = {
            key: item._id,
            team1: item.team1,
            team2: item.team2,
            team1_img:
              "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/PAK%20Logo.png",
            team2_img:
              "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/new-zealand.png",
            time: item.time,
            date: item.date,
            venue: item.venue,
            city: item.city,
          };
          cricket.push(temp);
        }
        setMyCricketTickets(cricket);

        // Process and set bus tickets
        let bus = [];
        for (let i = 0; i < res.data.busTickets.length; i++) {
          const item = res.data.busTickets[i];
          const temp = {
            key: item._id,
            pickup: item.pickup,
            arrival: item.arrival,
            date: item.date,
            pickup_time: item.pickup_time,
            arrival_time: item.arrival_time,
            seats: item.seats,
            left: item.left,
            price: item.price,
          };
          bus.push(temp);
        }
        setMyBusTickets(bus);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(myCricketTickets);

  function handleClick(e) {
    setEvent(e.target.id);
  }

  return (
    <div
      className="home-wrapper"
      style={{ paddingTop: "10px" }}
    >
      <QRModal
        modal={modal}
        setModal={setModal}
      />
      <div className="title ticket-title">My Tickets</div>
      <div className="ticket-label">
        <div
          id={"bus"}
          className="service-tag ticket-event"
          onClick={handleClick}
        >
          Bus
        </div>
        <div
          id={"cricket"}
          className="service-tag ticket-event"
          onClick={handleClick}
        >
          Cricket
        </div>
      </div>
      <div
        style={{
          width: "100%",
          borderBottom: "1px black solid",
          //   marginLeft: "auto",
          //   marginRight: "auto",
          marginTop: "10px",
          marginBottom: "15px",
        }}
      ></div>
      <div
        className="result-box tickets"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {event === "bus" &&
          myBusTickets.map((item) => {
            return (
              <BusTicket
                info={item}
                isticket={true}
                isupdate={false}
                setModal={setModal}
              />
            );
          })}
        {event === "cricket" &&
          myCricketTickets.map((item) => {
            return (
              <CricketTicket
                info={item}
                isticket={true}
                isupdate={false}
                setModal={setModal}
              />
            );
          })}
      </div>
    </div>
  );
}
