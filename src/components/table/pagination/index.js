import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';

/**
 * 
 * @param {Object} props
 * @param {Number} props.page The current page
 * @param {Number} props.totalPages The total amount of pages that can be displayed
 * @param {Object} props.options Extra options, like the path the buttons will redirect to 
 */
const Pag = ({ page, totalPages, options }) => {
    if(page === 0) {
        return null
    }

    const { path } = options;

    return (
        <Pagination>
            { page > 1 ? (
                <>
                    { page > 2 ? (
                        <>
                            <Pagination.Item as="span"><Link to={`${path}/1`}>1</Link></Pagination.Item>
                            { page > 3 ? (
                                <Pagination.Ellipsis />
                            ) : null}
                        </>
                    ) : null}
                    <Pagination.Item><Link to={`${path}/${ page - 1 }`}>{ page - 1 }</Link></Pagination.Item>
                </>
            ) : null }

            <Pagination.Item active>{ page }</Pagination.Item>

            { page < totalPages ? (
                <>
                    <Pagination.Item><Link to={`${path}/${ page + 1 }`}>{ page + 1 }</Link></Pagination.Item>
                    { page < totalPages - 1 ? (
                        <>
                            { page < totalPages - 2 ? (
                                <Pagination.Ellipsis />
                            ) : null }
                            <Pagination.Item><Link to={`${path}/${ totalPages }`}>{ totalPages }</Link></Pagination.Item>
                        </>
                    ) : null}
                </>
            ) : null }
        </Pagination>
    );


};

export default Pag;
