import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "./Home.css";
import axios from "axios";
import CricketTicket from "./CricketTicket";
import CricketModal from "./CricketModal";

export default function Cricket() {
  const [cookies] = useCookies(["user"]);

  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState({
    key: 0,
    _id: cookies.user,
    type: "cricket",
    team1: "",
    team2: "",
    team1_img:
      "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/PAK%20Logo.png",
    team2_img:
      "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/new-zealand.png",
    time: "",
    date: "",
    venue: "",
    city: "",
    enclosure: {
      key: 0,
      name: "",
      type: "",
      price: "",
      seats: 0,
      left: 0,
    },
    tickets: 1,
  });
  const [allTickets, setAllTickets] = useState([]);
  // var alltickets = [];

  // API call to get all cricket tickets but it is not represented in the frontend

  useEffect(() => {
    axios
      .get("http://localhost:5001/cricket")
      .then((res) => {
        let arr = [];
        for (let i = 0; i < res.data.length; i++) {
          const item = res.data[i];
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
          arr.push(temp);
        }
        setAllTickets(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // var allTickets = [
  //   {
  //     key: "645d42e548403e7854eccf88",
  //     team1: "Pakistan",
  //     team2: "New Zealand",
  //     team1_img:
  //       "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/PAK%20Logo.png",
  //     team2_img:
  //       "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/new-zealand.png",
  //     time: "3:30 PM",
  //     date: "05-05-2023",
  //     venue: "National Bank Stadium",
  //     city: "Karachi",
  //   },
  //   {
  //     key: "645d42e548403e7854eccf89",
  //     team1: "Pakistan",
  //     team2: "New Zealand",
  //     team1_img:
  //       "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/PAK%20Logo.png",
  //     team2_img:
  //       "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/new-zealand.png",
  //     time: "3:30 PM",
  //     date: "05-05-2023",
  //     venue: "National Bank Stadium",
  //     city: "Karachi",
  //   },
  // ];

  console.log(allTickets);

  return (
    <div className="home-wrapper">
      <CricketModal
        ticket={ticket}
        setTicket={setTicket}
        show={show}
        setShow={setShow}
      />

      <div className="home-cover">
        <img
          className="home-cover-img"
          src="https://bookmepk.s3.eu-central-1.amazonaws.com/static/images/banners/nzweb.jpg"
          alt=""
        />
      </div>

      <div className="home-title select-match-title">
        Select your favourite match
      </div>

      <div
        className="result-box"
        style={{ minHeight: "300px" }}
      >
        <div className="cricket-ticket-space">
          {allTickets.map((item) => {
            console.log("rendered");
            return (
              <CricketTicket
                info={item}
                setTicket={setTicket}
                setShow={setShow}
                isticket={false}
                isupdate={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
