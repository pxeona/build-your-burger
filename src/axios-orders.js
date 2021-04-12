import axios from "axios";

const instance = axios.create({
  baseURL: "https://build-your-burger-e1949-default-rtdb.firebaseio.com/",
});

export default instance;
