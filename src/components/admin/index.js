import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router-dom";

import api from '../../utils/api';
import ls from '../../utils/localStorage';

import './admin.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class Admin extends Component {
    constructor(props) {
        super(props);

        const { t } = props;
        this.t = t;

        this.columns = [
            {
                dataField: 'name',
                text: t('name.label'),
                sort: true,
                key: 0
            }, {
                dataField: 'movements',
                text: t('movements.label'),
                key: 1
            }, {
                dataField: 'active',
                text: t('active.label'),
                key: 1
            }
        ];

        this.state = {
            clients: [
                {
                    name: "Test1",
                    movements: "",
                    active: "No",
                    key: 0
                },
                {
                    name: "Test2",
                    movements: "",
                    active: "No",
                    key: 1
                }
            ]
        }
    }

    async componentDidMount() {
        let { p } = this.props.match.params;
        p = p ? p : '';

        const userList = await api.getUserList(ls.token, p);
        if(userList) {
            const cl = userList.records.map((item, index) => {
                return {
                    name: `${item.nombre} ${item.segundo_nombre} ${item.apellido} ${item.segundo_apellido}`,
                    movements: "",
                    active: item.active ? this.t('yes.label') : "No",
                    key: index
                }
            });

            this.setState({
                ...this.state,
                clients: cl
            })
        }
    }

    render() {
        return (
            <div className="user-list-wrapper">
                <BootstrapTable bootstrap4 responsive keyField='id' data={ this.state.clients } columns={ this.columns }
                    classes="user-list table table-dark table-striped table-bordered table-hover" />
            </div>
        );
    }
}

export default withTranslation()(withRouter(Admin));
