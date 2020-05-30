import ls from '../utils/localStorage';

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
