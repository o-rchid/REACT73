import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:9101/hr'
});
