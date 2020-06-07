import jwt from 'jwt-simple';

import types from './action-types';
import ls from '../../utils/localStorage';

const secret = "fe1a1915a379f3be5394b64d14794932";

const saveCurrentInfo = (info) => {
    ls.setItem('_ct', jwt.encode(info.records, secret));
    ls.setItem('_pag', jwt.encode(info.pagination, secret));

    return {
        type: types.SAVE_CURRENT_INFO,
        payload: info
    };
};

export default { saveCurrentInfo };
