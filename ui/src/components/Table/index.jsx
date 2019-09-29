import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './styles.scss';

const Table = (props) => {
    const { data, columns } = props;
    let gridApi, gridColumnApi;

    const onGridReady = params => {
        gridApi = params.api;
        gridColumnApi = params.columnApi;
    }

    useEffect(() => {
        if (gridApi) gridApi.sizeColumnsToFit();
    });

    return (
        <div className="ag-theme-balham">
            <AgGridReact
                columnDefs={columns}
                rowData={data}
                domLayout='autoHeight'
                onGridReady={onGridReady}
                {...props} />
        </div>
    );
};

Table.propTypes = {
    data: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
}

export default Table;