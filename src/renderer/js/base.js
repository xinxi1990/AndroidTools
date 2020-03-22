import iView from 'iview';
import axios from 'axios';
import config from '../config/config';

let func = {};

func.base_url = axios.create({
    baseURL: config.base_url,
    timeout: 500000,
    //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});

func.base_url_multipart = axios.create({
    baseURL: config.base_url,
    timeout: 500000,
    headers: {'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()},
    withCredentials: true
});


func.message = function (error) {
    if (error.response === undefined) {
        console.error(error);
        return;
    }

    iView.Message.error(error.response.data.status_msg);
};

export default func;
