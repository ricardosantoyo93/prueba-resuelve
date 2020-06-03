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
    },
    current: {
        pagination: JSON.parse(ls.getItem('_pag')),
        records: JSON.parse(ls.getItem('_ct'))
    }
};
