import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';

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
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [order, setOrder] = useState('asc');
    const [currency, setCurrency] = useState('usd');

    p = !Number.isNaN(Number(p)) ? p : 1;
    const loading = t('loading.label');

    const isValidUID = records.find((item) => {
        return item.uid === uid;
    });

    if(!isValidUID) {
        history.replace('/admin');
    }

    const fetchClientMovements = async () => {
        const movements = await api.getClientMovements(ls.token, uid, p);
        if(movements) {
            const cl = records.find((item) => {
                return item.uid === uid;
            });

            const currency = await api.getCurrencyConversion();

            const m = movements.records.map((item) => {
                return {
                    amount: {
                        amount: true,
                        value: item.amount,
                        mxn: currency ? (item.amount * currency.usd2mxn).toFixed(2) : item.amount,
                        usd: item.amount,
                        currency: "USD"
                    },
                    type: {
                        dc: true,
                        value: item.type
                    },
                    description: item.description,
                    date: {
                        date: true,
                        value: item.created_at
                    }
                }
            });

            setPage(movements.pagination.page);
            setTotalPages(movements.pagination.totalPages);
            setClient(cl);
            setMovements(m);
            setCurrency("usd");
        }
    };

    useEffect(() => {
        fetchClientMovements();
    }, [p]);

    const handleSort = (key) => {
        const sortedArray = mov.sort((a, b) => {
            if(key === "description") {
                if (a[key] < b[key]) {
                    return order === "desc" ? -1 : 1;
                }
                if (a[key] > b[key]) {
                    return order === "desc" ? 1 : -1;
                }
            }

            if (a[key].value < b[key].value) {
                return order === "desc" ? -1 : 1;
            }
            if (a[key].value > b[key].value) {
                return order === "desc" ? 1 : -1;
            }
            return 0;
        });

        setMovements(sortedArray);
        setOrder(order === "desc" ? "asc" : "desc");
    }

    const columns = [
        {
            desc: t('amount.label'),
            sort: true,
            cb: () => handleSort('amount')
        },
        {
            desc: t('type.label'),
            sort: true,
            cb: () => handleSort('type')
        },
        {
            desc: t('description.label'),
            sort: true,
            cb: () => handleSort('description')
        },
        {
            desc: t('date.label'),
            sort: true,
            cb: () => handleSort('date')
        }
    ];

    const changeCurrency = () => {
        const newArray = mov.map((item) => {
            if(currency === "usd") {
                return {...item, amount: {
                    ...item.amount,
                    value: item.amount.mxn,
                    currency: "MXN"
                }};
            }
            if(currency === "mxn") {
                return {...item, amount: {
                    ...item.amount,
                    value: item.amount.usd,
                    currency: "USD"
                }};
            }

            return item;
        });

        setMovements(newArray);
        setCurrency(currency === "usd" ? "mxn" : "usd");
    };

    return (
        <div className="admin-client-info-wrapper">
            { client ? (
                <>
                    <h2> { client.nombre } { client.apellido } { client.segundo_apellido }</h2>
                    <br />
                    <Table columns={columns} content={mov} options={{ order }} />
                    <span>
                        <Pagination page={page} totalPages={totalPages} options={{ path: `/admin/client/${uid}/p` }} />
                        <Button type="button" size="sm" variant="dark" onClick={changeCurrency}>
                            <i>{ currency === "usd" ? 'USD → MXN' : "MXN → USD"}</i>
                        </Button>
                    </span>
                </>
            ) : loading }
        </div>
    );
};

const mapStateToProps = ({ current }) => {
    return {
        records: current.records,
        pagination: current.pagination
    }
};

export default connect(mapStateToProps)(Client);
