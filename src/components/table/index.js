import React from 'react';

import Table from 'react-bootstrap/Table';
import { faLongArrowAltDown, faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

/**
 * 
 * @param {Object} props
 * @param {Array} props.columns Columns to be displayed, with their metadata
 * @param {Array} props.content The content that will fill the table
 * @param {Object} props.options Extra options for the table, like the initial order the content is being displayed
 */
const ReTable = ({ columns, content, options }) => {
    const { order } = options;
    const { t } = useTranslation();

    // Creating the head of the table
    // Adding sort callbacks if they are sortable
    const thead = columns.map((item) => {
        return (
            <th className="orderBy" onClick={item.cb ? item.cb : ()=>{}}>
                { item.desc } { item.sort ? <FontAwesomeIcon size="xs" icon={order === "asc" ? faLongArrowAltDown : faLongArrowAltUp} /> : null }
            </th>
        );
    });

    // Method to split a number with commas
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
     * Checks the item metadata to see what and how to render it
     * @param {Object} item Current item to be rendered
     */
    const checkItem = (item) => {
        if(item.yesno) {
            return item.value ? t('yes.label') : "No";
        }

        if(item.url) {
            return <Link to={item.url}>{item.value}</Link>;
        }

        if(item.dc) {
            return item.value === "credit" ? t('credit.label') : t('debit.label')
        }

        if(item.amount) {
            return <i>{ `$ ${numberWithCommas(item.value)} ${item.currency}` }</i>
        }

        if(item.date) {
            const date = new Date(item.value);
            const dd = date.getDate();
            const mm = date.getMonth() + 1;
            const yy = date.getFullYear();
            
            return `${dd}/${mm}/${yy}`;
        }

        return item;
    }

    // Creating the body of the table
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
