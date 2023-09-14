import {BASE_GIHNUB_URL} from "./consts";

function getJSONRepos(query) {
  return fetch(`${BASE_GIHNUB_URL}search/repositories?q=${query}`).then(response => response.json());
}

export default getJSONRepos;