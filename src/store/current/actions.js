import types from './action-types';
import ls from '../../utils/localStorage';

const saveCurrentInfo = (info) => {
    ls.setItem('_ct', JSON.stringify(info.records));
    ls.setItem('_pag', JSON.stringify(info.pagination));

    return {
        type: types.SAVE_CURRENT_INFO,
        payload: info
    };
};

export default { saveCurrentInfo };
