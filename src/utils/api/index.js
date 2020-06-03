import axios from 'axios';
import md5 from 'md5';
import jwt_decode from 'jwt-decode';

class API {
    instance = null;

    constructor() {
        if(this.instance !== null) {
            return this.instance;
        }
        
        this.url = 'https://prueba-resuelve.herokuapp.com';

        this.instance = this;
        return this.instance;
    }

    async adminLogin(user, pass) {
        try {
            const res = await axios.post(`${this.url}/users/adminLogin`, {
                user: user,
                password: md5(pass)
            });

            if(res.headers.authorization) {
                const { authorization } = res.headers;
                let token = authorization.split(" ");
                token = token[1];

                return { ...jwt_decode(token), token };
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async getUserList(token, page = "") {
        try {
            const res = await axios.get(`${this.url}/users/list?page=${page}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if(res.status === 200) {
                return res.data;
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async getClientMovements(token, uid, page = "") {
        try {
            const res = await axios.get(`${this.url}/users/${uid}/movements?page=${page}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if(res.status === 200) {
                return res.data;
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async getCurrencyConversion() {
        try {
            const res = await axios.get(`${this.url}/money/conversion`);

            if(res.status === 200) {
                return res.data;
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}

export default new API();
