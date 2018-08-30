import axios from "axios";
import variables from "../variables.json";

export default function callApi(
  method,
  page,
  query = "",
  pageNumber = 1,
  perPage = 5
) {
  const ROOT_URL = variables.ROOT_URL;
  const API_KEY = variables.API_KEY;
  const request = axios({
    method: method,
    url: `${ROOT_URL}/${page}?access_key=${API_KEY}&${query}&page=${pageNumber}&per_page=${perPage}`
  });
  return request;
}
