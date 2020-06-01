import React from 'react';

import Table from 'react-bootstrap/Table';
import { faLongArrowAltDown, faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const ReTable = ({ columns, content, options }) => {
    const { order } = options;
    const { t } = useTranslation();

    const thead = columns.map((item) => {
        return (<th className="orderBy" onClick={item.cb ? item.cb : ()=>{}}>{ item.desc } { item.sort ? <FontAwesomeIcon size="xs" icon={order === "asc" ? faLongArrowAltDown : faLongArrowAltUp} /> : null }</th>);
    });

    const checkItem = (item) => {
        if(item.yesno) {
            return item.value ? t('yes.label') : "No";
        }

        if(item.url) {
            return <Link to={item.url}>{item.desc}</Link>;
        }

        return item;
    }

    const tbody = content.map((item, index) => {
            return (
                <tr key={index}>
                    { Object.keys(item).map((it) => {
                        return <td>{ checkItem(item[it]) }</td>;
                    }
                    )}
                </tr>
            );
        });

    return (
        <Table responsive striped bordered hover variant="dark">
            <thead>
                <tr>
                    { thead }
                </tr>
            </thead>
            <tbody>
                { tbody }
            </tbody>
        </Table>
    );
};

export default ReTable;
