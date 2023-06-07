import React, { useState } from 'react';
import _get from 'lodash/get';
import Button from './Button';
// import MapIcon from '@mui/icons-material/Map';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import DeleteIcon from '@mui/icons-material/Delete';

function Table({ data, columns, onAction, onViewOnMap }) {
    const [searchText, setSearchText] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSort = (columnKey) => {
        if (sortColumn === columnKey) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(columnKey);
            setSortOrder('asc');
        }
    };

    const filteredData = data.filter((row) =>
        Object.values(row).some((value) =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const sortedData = [...filteredData].sort((a, b) => {
        const columnA = _get(a, sortColumn) || '';
        const columnB = _get(b, sortColumn) || '';

        if (columnA < columnB) {
            return sortOrder === 'asc' ? -1 : 1;
        } else if (columnA > columnB) {
            return sortOrder === 'asc' ? 1 : -1;
        } else {
            return 0;
        }
    });

    const handleAction = (row) => {
        onAction(row);
    };

    const handleViewOnMap = (ride) => {
        onViewOnMap(ride); // Call the onViewOnMap function passed from the parent component
    };

    return (
        <div>
            <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search"
                style={{
                    padding: '8px',
                    marginBottom: '16px',
                    borderRadius: '2%',
                }}
            />
            <table
                // style={{
                //     width: '100%',
                //     borderCollapse: 'collapse',
                // }}
                className="greyGridTable"
            >
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                // style={{
                                //     padding: '8px',
                                //     border: '1px solid #ccc',
                                //     backgroundColor: '#f2f2f2',
                                //     fontWeight: 'bold',
                                //     cursor: 'pointer',
                                // }}
                                onClick={() => handleSort(column.key)}
                            >
                                {column.header}
                                {sortColumn === column.key && (
                                    <span style={{ marginLeft: '4px' }}>
                                        {sortOrder === 'asc' ? '▲' : '▼'}
                                    </span>
                                )}
                            </th>
                        ))}
                        <th
                            style={{
                                // padding: '8px',
                                // border: '1px solid #ccc',
                                // backgroundColor: '#f2f2f2',
                                fontWeight: 'bold',
                            }}
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, index) => (
                        <tr key={row._id}>
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    style={{
                                        padding: '8px',
                                        border: '1px solid #ccc',
                                        textAlign: 'left',
                                    }}
                                >
                                    {_get(row, column.key)}
                                </td>
                            ))}
                            <td
                                style={{
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                }}
                            >
                                <Button
                                    className="primary"
                                    onClick={() => handleViewOnMap(row)}
                                    text={'View on Map'}
                                    // icon={MapIcon}
                                ></Button>
                                <Button
                                    className="success"
                                    onClick={() => handleAction(row._id, 'duplicate')}
                                    text={'Duplicate'}
                                    // icon={ContentCopyIcon}
                                ></Button>
                                <Button
                                    className="danger"
                                    onClick={() => handleAction(row._id, 'delete')}
                                    text={'Delete'}
                                    // icon={DeleteIcon}
                                ></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
