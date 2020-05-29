import axios from 'axios';
import md5 from 'md5';
import jwt_decode from 'jwt-decode';

class API {
    constructor() {
        this.url = 'https://prueba-resuelve.herokuapp.com';
    }

    async adminLogin(user, pass) {
        try {
            const res = await axios.post('https://prueba-resuelve.herokuapp.com/users/adminLogin', {
                user: user,
                password: md5(pass)
            });

            if(res.headers.authorization) {
                const { authorization } = res.headers;
                let token = authorization.split(" ");
                token = token[1];

                return jwt_decode(token);
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}

export default API;
