import "./Home.css";

export default function Info() {
  const bookme_info_title = "Bookme - Online Tickets Booking in Pakistan";
  const bookme_info_body =
    "Looking for hassle free bus ticket bookings but ended up in long queues. Are you a travelling enthusiast but find difficulty in getting affordable flight tickets? Are you finding trouble in movie tickets and missing out on wonderful hotel bookings across Pakistan? Plus being a cricket lover is it hard for you to get tickets easily? This is where Bookme steps in with online ticket booking in Pakistan and eliminates the need to stand in never-ending queues and chase travel agents that make travel a stressful thing. Bookme has the e-ticketing solution to all your ticketing problems. Now buy your tickets online at a discounted price and fix your spot. Moreover, we enable you to get cheap e-tickets with our in-app bundles.";
  const bookme_travel_title = "Travel through Pakistan";
  const bookme_travel_body =
    "Save big on your intercity travel by availing massive discounts on bus and domestic flight tickets. With Bookme, you can browse through hundreds of bus operators and airlines to find the most affordable option for yourself.";

  const info = [
    {
      img: "https://bookmepk.s3.eu-central-1.amazonaws.com/static/custom/V3/images/Group%209559.png",
      title: "Lowest Fares",
      body: "We provide affordable tickets to save up to 50%.",
    },
    {
      img: "https://bookmepk.s3.eu-central-1.amazonaws.com/static/custom/V3/images/Group%209560.png",
      title: "We Care",
      body: "We provide 24/7 effective customer care service.",
    },
    {
      img: "https://bookmepk.s3.eu-central-1.amazonaws.com/static/custom/V3/images/Group%209561.png",
      title: "Discover",
      body: "We make travelling easy across Pakistan by providing easy e-tickets.",
    },
  ];

  return (
    <div className="home-wrapper">
      <div className="info-container">
        {info.map((item) => {
          return (
            <div className="info-box">
              <img
                src={item.img}
                alt=""
              />
              <div className="info-title">{item.title}</div>
              <div className="info-body">{item.body}</div>
            </div>
          );
        })}
      </div>
      <div className="home-title">{bookme_info_title}</div>
      <div className="home-body">{bookme_info_body}</div>
      <div className="home-title">{bookme_travel_title}</div>
      <div className="home-body">{bookme_travel_body}</div>
    </div>
  );
}
