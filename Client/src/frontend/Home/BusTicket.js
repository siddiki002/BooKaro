import "./Home.css";

export default function BusTicket({
  info,
  setTicket,
  setShow,
  isticket,
  isupdate,
  setModal,
}) {
  const [hourString, minute] = info.pickup_time.split(":");
  const hour = +hourString % 24;
  const pickup = (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");

  const [hourString1, minute1] = info.arrival_time.split(":");
  const hour1 = +hourString1 % 24;
  const arrival =
    (hour1 % 12 || 12) + ":" + minute1 + (hour1 < 12 ? " AM" : " PM");

  const arrivaltime = new Date(info.arrival_time);

  function handleBook() {
    if (isupdate) {
      // console.log(modal.key);
      console.log("info", info);
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
    <div className="bus-ticket">
      <div className="bus-ticket-img bus-component">
        <img
          src="https://bookmepk.s3.eu-central-1.amazonaws.com/static/custom/upload/transport/daewoo-express.jpg"
          alt=""
        />
      </div>

      <div className="bus-ticket-info bus-component">
        <div className="bus-ticket-destinations">
          {info.pickup} To {info.arrival}
        </div>

        <div className="bus-ticket-time">
          {pickup} - {arrival}
        </div>
      </div>

      <div className="bus-ticket-last bus-component">
        <div className="bus-ticket-price">RS {info.price}</div>

        <button
          className="bus-ticket-book"
          onClick={handleBook}
        >
          {isticket ? "QR Code" : isupdate ? "Update" : "bookme"}
        </button>
      </div>
    </div>
  );
}
