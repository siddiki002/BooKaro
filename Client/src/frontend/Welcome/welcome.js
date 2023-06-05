import axios from "axios";
import { useNavigate } from "react-router-dom";

const Welcome = (props) =>{
  const navigate = useNavigate()
  if (props.match.path === "/confirm/:confirmationCode"){

    axios.get("http:/localhost:5001/confirm"+props.match.params.confirmationCode).then((response) => {
      return response.data
    })
  }
  return (
    <div>
      <h3>
        <strong>Account Confirmed</strong>
      </h3>
      <button onClick={navigate("/login")}>Login</button>
    </div>
  )
};


export default Welcome;
