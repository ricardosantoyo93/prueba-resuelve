import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import LoadingScreen from 'react-loading-screen';

import api from '../../utils/api';
import ls from '../../utils/localStorage';
import CurrentActions from '../../store/current/actions';
import Pagination from '../table/pagination';
import Table from '../table';

import './admin.scss';

/**
 * Admin dashboard, where the list of users will be displayed
 * @param {Object} props
 * @param {Function} props.saveCurrentInfo Redux action to save the current info into the state 
 */
const Admin = ({ saveCurrentInfo }) => {
    const { t } = useTranslation();
    let { p } = useParams();
    p = !Number.isNaN(Number(p)) ? p : 1;

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [order, setOrder] = useState('asc');
    const [clients, setClients] = useState();

    /**
     * This method will call the API to get the user list, and will update the displayed table
     */
    const updateTable = async () => {
        const userList = await api.getUserList(ls.token, p);

        // If userList is defined, i.e. the call was successful
        if(userList) {
            // I create an array of objects whit just the info I actually need to be displayed
            const cl = userList.records.map((item) => {
                return {
                    name: { 
                        value: `${item.nombre} ${item.segundo_nombre} ${item.apellido} ${item.segundo_apellido}`,
                        url: `/admin/client/${item.uid}`
                    },
                    email: item.email,
                    active: {
                        value: item.active,
                        yesno: true
                    }
                }
            });

            setPage(userList.pagination.page);
            setTotalPages(userList.pagination.totalPages);

            saveCurrentInfo(userList);

            return [...cl]
        }

        return null;
    }

    // Calling updateTable after rendering, and every time the page changes
    useEffect(() => {
        const fetchClients = async () => {
            const clients = await updateTable();
            setClients(clients);
        }

        fetchClients();
    }, [p]);

    /**
     * This will resort the table by a given key
     * It will trigger a re-render of the table since the clients array is stored in the state
     * @param {String} key The object key (name, email, etc...)
     */
    const handleSort = (key) => {
        const sortedArray = clients.sort((a, b) => {
            if(key === "email") {
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

        setClients(sortedArray);
        setOrder(order === "desc" ? "asc" : "desc");
    }

    /**
     * Array of the columns info and metadata to send it to the Table component
     */
    const columns = [
        {
            desc: t('name.label'),
            sort: true,
            cb: () => handleSort("name")
        },
        {
            desc: "Email",
            sort: true,
            cb: () => handleSort("email")
        },
        {
            desc: t('active.label'),
            sort: true,
            cb: () => handleSort("active")
        }
    ];

    return (
        <div className="user-list-wrapper">
            { clients ? (
                <>
                    <Table columns={columns} content={clients} options={{order}} />
                    <Pagination page={page} totalPages={totalPages} options={{ path: '/admin/p' }} />
                </>
            ) : (
                <LoadingScreen
                    loading={true}
                    bgColor='#282c34'
                    spinnerColor='#9ee5f8'
                    textColor='#fff'
                    text={ t('wait.label') }
                /> 
            )}
        </div>
    );
}

const mapStateToProps = ({ current }) => {
    return {
        current
    }
}

export default connect(mapStateToProps, CurrentActions)(Admin);
