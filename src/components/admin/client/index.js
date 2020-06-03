import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import api from '../../../utils/api';
import ls from '../../../utils/localStorage';
import Table from '../../table';
import Pagination from '../../table/pagination';

import './client.scss';

const Client = ({ records }) => {
    let { p } = useParams();
    const { uid } = useParams();
    const { t } = useTranslation();
    const { history } = useHistory();
    
    const [client, setClient] = useState();
    const [mov, setMovements] = useState([]);

    p = Number.isInteger(p) ? p : 1;
    const loading = t('loading.label');

    const isValidUID = records.find((item) => {
        return item.uid === uid;
    });

    if(!isValidUID) {
        history.replace('/admin');
    }

    const columns = [
        {
            desc: "Amount",
        },
        {
            desc: "Type"
        },
        {
            desc: "Description"
        },
        {
            desc: "Date"
        }
    ];

    const fetchClientMovements = async () => {
        const movements = await api.getClientMovements(ls.token, uid, p);
        if(movements) {
            const cl = records.find((item) => {
                return item.uid === uid;
            });

            const m = movements.records.map((item) => {
                return {
                    amount: item.amount,
                    type: item.type,
                    description: item.description,
                    date: {
                        date: true,
                        value: item.created_at
                    }
                }
            });

            setClient(cl);
            setMovements(m);

            //TODO: Create table info from here
        }

        return null;
    };

    useEffect(() => {
        fetchClientMovements();
    }, [p]);

    return (
        <div className="admin-client-info-wrapper">
            { client ? (
                <>
                    <h2> { client.nombre } { client.apellido } { client.segundo_apellido }</h2>
                    <Table columns={columns} content={mov} options={{ order: "desc" }} />
                </>
            ) : loading }
        </div>
    );
};

const mapStateToProps = ({ current }) => {
    return {
        records: current.records
    }
};

export default connect(mapStateToProps)(Client);
