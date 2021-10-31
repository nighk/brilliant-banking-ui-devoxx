import axios from "axios";

const api = axios.create({
  headers: {
    "Accept": "application/json"
  },
  // Needed for cookies required by server
  // for sticky logon sessions
  withCredentials: true,
	credentials: "same-origin",
});

export default api;