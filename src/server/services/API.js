import axios from 'axios';

function axiosInit() {
    let init = axios.create({baseURL: `http://localhost:3000/`});
    return init;
}

export default axiosInit();