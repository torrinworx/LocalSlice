import axios from 'axios';

const BASE_PATH = '/api';

const Api = {
  add: (param1, param2) => {
    return axios
      .get(`${BASE_PATH}/add/${param1}/${param2}`)
      .then(response => response.data)
      .catch(error => { throw error; });
    },
};

export default Api;
