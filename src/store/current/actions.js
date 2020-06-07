import jwt from 'jwt-simple';

import types from './action-types';
import ls from '../../utils/localStorage';

// This is an arbitrary key just to encrypt the info for storing it in localStorage
const key = "fe1a1915a379f3be5394b64d14794932";

const saveCurrentInfo = (info) => {
    // Storing the info into localStorage, adn then into the Redux store
    ls.setItem('_ct', jwt.encode(info.records, key));
    ls.setItem('_pag', jwt.encode(info.pagination, key));

    return {
        type: types.SAVE_CURRENT_INFO,
        payload: info
    };
};

export default { saveCurrentInfo };
