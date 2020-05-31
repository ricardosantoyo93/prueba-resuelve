import jwt_decode from 'jwt-decode';

class LocalStorage {
    instance = null;

    constructor () {
        if(this.instance !== null) {
            return this.instance
        }

        this.instance = this;
        return this.instance;
    }

    saveToken = (token) => {
        this.setItem('_ut', token);
    }

    deleteToken = () => {
        this.removeItem('_ut');
    }

    getUserInfo = () => {
        const token = this.getItem('_ut');
        
        if(token === '' || token === null) {
            return null;
        }

        const userInfo = jwt_decode(token);
        userInfo.token = token;

        return userInfo;
    }

    get token() {
        return this.getItem('_ut');
    }

    // These two methods are made to keep using the LocalStorage class instead of localStorage alone
    // In a way of 'extending' localStorage and keep using the same instance of the class
    setItem = (key = "", item = "") => {
        return localStorage.setItem(key, item)
    }

    removeItem = (key = "") => {
        return localStorage.removeItem(key);
    }

    getItem = (key = "") => {
        return localStorage.getItem(key);
    }
};

export default new LocalStorage();
