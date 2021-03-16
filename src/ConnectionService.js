import axios from 'axios';

const clienteAxios = axios.create();

const checkInternetState = (axiosRequestConfig) => {
    return clienteAxios.request(axiosRequestConfig)
        .then(response => {
            return true;
        })
        .catch(error => {
            return false;
        });
};

const ConnectionService = {
    checkInternetState
};

export default ConnectionService;
