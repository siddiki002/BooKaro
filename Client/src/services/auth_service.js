import axios from "axios";

const verifyUser = (confirmationCode) => {
    return axios.get(`http://localhost:5001/confirm/${confirmationCode}`).then((response) => {
        return response.data;
    });
}

export default verifyUser;