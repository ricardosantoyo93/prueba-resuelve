import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";

import api from '../../utils/api';
import ls from '../../utils/localStorage';
import CurrentActions from '../../store/current/actions';
import Pagination from '../table/pagination';
import Table from '../table';

import './admin.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const Admin = ({ saveCurrentInfo}) => {
    const { t } = useTranslation();
    let { p } = useParams();
    p = !Number.isNaN(Number(p)) ? p : 1;

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [order, setOrder] = useState('asc');
    const [clients, setClients] = useState();

    const loading = t('loading.label');

    const updateTable = async () => {
        const userList = await api.getUserList(ls.token, p);
        if(userList) {
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

    useEffect(() => {
        const fetchClients = async () => {
            const clients = await updateTable();
            setClients(clients);
        }

        fetchClients();
    }, [p]);

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
            ) : loading}
        </div>
    );
}

const mapStateToProps = ({ current }) => {
    return {
        current
    }
}

export default connect(mapStateToProps, CurrentActions)(Admin);
