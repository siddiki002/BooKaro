import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import "./Admin.css";
import BusTicket from "../Home/BusTicket";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import axios from "axios";

export default function AdminBus() {
  const [input, setInput] = useState({
    date: "",
  });
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState({
    key: 0,
    show: false,
  });
  const [allResult, setAllResult] = useState([]);
  const [change, setChange] = useState(false);

  const [cookies] = useCookies(["admin"]);

  // API call for getting tickets info using modal.key
  useEffect(() => {
    console.log(cookies.admin);
    axios
      .post("http://localhost:5001/admin/getDataBus", {
        id: cookies.admin,
      })
      .then((response) => {
        console.log(response); //response.data is the array of the cricket tickets received from the database")
        // console.log(response.data.buses);
        setAllResult(response.data.buses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [change]);
  //Buses data received from API successfully

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
          event={"bus"}
          setChange={setChange}
          change={change}
        />
      )}
      {modal.show && (
        <UpdateModal
          event={"bus"}
          modal={modal}
          setModal={setModal}
          setChange={setChange}
          change={change}
        />
      )}
      <div className="admin-title">Bus Tickets</div>
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
            allResult.map((item) => {
              return (
                <BusTicket
                  info={item}
                  isticket={false}
                  isupdate={true}
                  setModal={setModal}
                />
              );
            })}
          {input.date !== "" &&
            allResult.map((item) => {
              if (input.date === item.date) {
                return (
                  <BusTicket
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
