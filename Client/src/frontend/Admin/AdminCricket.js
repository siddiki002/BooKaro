import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./Admin.css";
import CricketTicket from "../Home/CricketTicket";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import axios from "axios";

export default function AdminCricket() {
  const [input, setInput] = useState({
    date: "",
  });
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState({
    key: 0,
    show: false,
  });
  const [result, setResult] = useState([]);
  const [change, setChange] = useState(false);

  const [cookies] = useCookies(["admin"]);

  //API call for getting cricket Tickets info from the db
  useEffect(() => {
    axios
      .post("http://localhost:5001/admin/getDataCricket", {
        id: cookies.admin,
      })
      .then((response) => {
        console.log(response); //response.data is the array of the cricket tickets received from the database")
        console.log(response.data.cricket);
        setResult(response.data.cricket);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [change]);

  function handleChange(e) {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleCreate() {
    setShow(true);
  }

  return (
    <div className="admin-service">
      {show && (
        <CreateModal
          show={show}
          setShow={setShow}
          event={"cricket"}
          setChange={setChange}
          change={change}
        />
      )}
      {modal.show && (
        <UpdateModal
          event={"cricket"}
          modal={modal}
          setModal={setModal}
          setChange={setChange}
          change={change}
        />
      )}
      <div className="admin-title">Cricket Tickets</div>
      <div className="admin-body">
        <div className="admin-search">
          <input
            className="admin-inp"
            type="date"
            name="date"
            id="date"
            onChange={handleChange}
            value={input.date}
          />
          <button
            className="admin-inp admin-btn"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
        <div className="admin-results">
          {input.date === "" &&
            result.map((item) => {
              return (
                <CricketTicket
                  info={item}
                  isticket={false}
                  isupdate={true}
                  setModal={setModal}
                />
              );
            })}
          {input.date !== "" &&
            result.map((item) => {
              if (input.date === item.date) {
                return (
                  <CricketTicket
                    info={item}
                    isticket={false}
                    isupdate={true}
                    setModal={setModal}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}
