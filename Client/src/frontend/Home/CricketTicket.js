import "./Home.css";

export default function CricketTicket({
  info,
  setTicket,
  setShow,
  isticket,
  isupdate,
  setModal,
}) {
  const [hourString, minute] = info.time.split(":");
  const hour = +hourString % 24;
  const time = (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");

  var date = new Date(info.date);
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

  function handleClick() {
    if (isupdate) {
      setModal((prevState) => ({
        ...prevState,
        key: info._id,
        show: true,
      }));
    } else if (!isticket) {
      setShow(true);
      setTicket((prevState) => ({
        ...prevState,
        ...info,
      }));
    } else {
      // console.log(modal.key);
      setModal({
        key: info.key,
        show: true,
      });
    }
  }

  return (
    <div
      className="cricket-ticket"
      id={info.id}
      onClick={handleClick}
    >
      <div
        className="cricket-ticket-head"
        name={info.id}
      >
        {info.team1} vs {info.team2}
      </div>

      <div
        className="cricket-ticket-body"
        name={info.id}
      >
        <div
          className="cricket-ticket-team cricket-ticket-body-ele"
          name={info.id}
        >
          <img
            src={
              "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/PAK%20Logo.png"
            }
            alt=""
            name={info.id}
          />
        </div>

        <div
          className="cricket-ticket-info cricket-ticket-body-ele"
          name={info.id}
        >
          <div
            className="cricket-ticket-time"
            name={info.id}
          >
            {time}
          </div>

          <div
            className="cricket-ticket-date"
            name={info.id}
          >
            {day[date.getDay()]} {date.getDate() + 1} {month[date.getMonth()]},{" "}
            {date.getFullYear()}
          </div>

          <div
            className="cricket-ticket-venue"
            name={info.id}
          >
            {info.venue}, {info.city}
          </div>
        </div>

        <div
          className="cricket-ticket-team cricket-ticket-body-ele"
          name={info.id}
        >
          <img
            src={
              "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/new-zealand.png"
            }
            alt=""
            name={info.id}
          />
        </div>
      </div>
    </div>
  );
}
