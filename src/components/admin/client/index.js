import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'react-loading-screen';

import Button from 'react-bootstrap/Button';

import api from '../../../utils/api';
import ls from '../../../utils/localStorage';
import Table from '../../table';
import Pagination from '../../table/pagination';

import './client.scss';

/**
 * Component to see a client movements given a uid (for admins)
 * @param {Object} props 
 * @param {Array} props.records User records to display the current user info
 */
const Client = ({ records }) => {
    let { p } = useParams();
    const { uid } = useParams();
    const { t } = useTranslation();
    const { history } = useHistory();

    // ! The api is not returning a jwt token for the client in the headers, 
    // ! that's why I need to look for their info in the past api call for the users list.
    // ! And that's the reason I need to store the records in localStorage
    const client = records.find((item) => {
        return item.uid === uid;
    });

    if(!client) {
        history.replace('/admin');
    }
    
    const [movements, setMovements] = useState();
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [order, setOrder] = useState('asc');
    const [currency, setCurrency] = useState('usd');

    p = !Number.isNaN(Number(p)) ? p : 1;

    /**
     * Fetching the client movements from the api
     */
    const fetchClientMovements = async () => {
        const mov = await api.getClientMovements(ls.token, uid, p);
        if(mov) {
            // Calling the currency api to know the values in whick I have to multiply
            const currency = await api.getCurrencyConversion();

            // I create an array of objects whit just the info I actually need to be displayed
            const m = mov.records.map((item) => {
                return {
                    amount: {
                        amount: true,
                        value: item.amount,
                        mxn: currency ? (item.amount * currency.usd2mxn).toFixed(2) : item.amount,
                        // Since the original info is in USD, I only have to multiply to get the MXN value
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

            setPage(mov.pagination.page);
            setTotalPages(mov.pagination.totalPages);
            setMovements(m);
            setCurrency("usd");
        }
    };

    // Calling the fetchClientMovements method after the component renders and every time the page changes
    useEffect(() => {
        fetchClientMovements();
    }, [p]);

    /**
     * Method to sort the movements info. It will trigger a re-render
     * @param {String} key The name of the key of the content object
     */
    const handleSort = (key) => {
        const sortedArray = movements.sort((a, b) => {
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

    // Columns info to be sent to the Table component
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

    // This will re-render the table with the updated currency conversion
    const changeCurrency = () => {
        const newArray = movements.map((item) => {
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
            { movements ? (
                <>
                    <h2> { client.nombre } { client.apellido } { client.segundo_apellido }</h2>
                    <p><i>{ client.email }</i></p>
                    <br />
                    <Table columns={columns} content={movements} options={{ order }} />
                    <span>
                        <Pagination page={page} totalPages={totalPages} options={{ path: `/admin/client/${uid}/p` }} />
                        <Button type="button" size="sm" variant="dark" onClick={changeCurrency}>
                            <i>{ currency === "usd" ? 'USD → MXN' : "MXN → USD"}</i>
                        </Button>
                    </span>
                </>
            ) : (
                <LoadingScreen
                    loading={true}
                    bgColor='#282c34'
                    spinnerColor='#9ee5f8'
                    textColor='#fff'
                    text={ t('wait.label') }
                /> 
            ) }
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
