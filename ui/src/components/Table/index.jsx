import React, { useEffect } from 'react';
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
        gridApi.sizeColumnsToFit();
        gridApi.resetRowHeights()
    }

    useEffect(() => {
        if (gridApi) gridApi.sizeColumnsToFit();
    });

    return (
        <div className="ag-theme-balham table-comp" style={{
              height: "450px",
              width: "100%"
            }}>
            <AgGridReact
                columnDefs={columns}
                rowData={data}
                onGridReady={onGridReady}
                {...props} />
        </div>
    );
};

export default Table;