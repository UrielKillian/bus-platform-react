import axios from "axios";
export default axios.create({
  // Development URL (http://localhost:8080/api)
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
  },
});
