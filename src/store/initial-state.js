import LocalStorage from '../utils/localStorage';

const ls = new LocalStorage();

const getInitialInfo = () => {
    const initialInfo = {
        user: ls.getUserInfo()
    }

    initialInfo.isAuthenticated = initialInfo.user !== null;

    return initialInfo;
};

export default {
    core: {
        ...getInitialInfo()
    }
};
