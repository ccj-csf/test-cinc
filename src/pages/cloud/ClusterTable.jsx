import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Checkbox } from '@mui/material';

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';

import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import StopIcon from '@mui/icons-material/Stop';
import DeleteIcon from '@mui/icons-material/Delete';

const actions = [
    { icon: <InfoIcon color='action' />, name: 'Info' },
    { icon: <StopIcon />, name: 'Stop' },
    { icon: <EditIcon />, name: 'Rename' },
    { icon: <DeleteIcon color='warning' />, name: 'Delete' },
];

function ClusterTable({ columns, rowData, page, showDetails }) {

    return (<>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>

                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                            // indeterminate={numSelected > 0 && numSelected < rowCount}
                            // checked={rowCount > 0 && numSelected === rowCount}
                            // onChange={onSelectAllClick}
                            // inputProps={{
                            //     'aria-label': 'select all desserts',
                            // }}
                            />
                        </TableCell>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                            // align={column.align}
                            // style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                        <TableCell sx={{ minWidth: '4rem', position: 'relative' }}>

                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowData
                        .slice((page.number) * page.size, page.number * page.size + page.size)
                        .map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.cluster_id}>
                                    <TableCell >
                                        <Checkbox
                                            color="primary"
                                        // indeterminate={numSelected > 0 && numSelected < rowCount}
                                        // checked={rowCount > 0 && numSelected === rowCount}
                                        // onChange={onSelectAllClick}
                                        // inputProps={{
                                        //     'aria-label': 'select all desserts',
                                        // }}
                                        />

                                    </TableCell>
                                    {
                                        columns.map((column) => {
                                            let value;
                                            switch (column.id) {
                                                case "brand_info":
                                                    value = row[column.id].map(m => m.brand_name).join()
                                                    break;
                                                case "hardware_info":
                                                    value = `${row[column.id].hardware_name}-${row[column.id].quantity}`
                                                    break;
                                                case "locations":
                                                    value = row[column.id].map(m => m.name).join()
                                                    break;
                                                default:
                                                    value = row[column.id];
                                                    break;
                                            }
                                            return (
                                                <TableCell key={`${row['cluster_id']}_${column.id}_${value}`}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })
                                    }
                                    <TableCell>
                                        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
                                            <SpeedDial
                                                direction='left'
                                                ariaLabel="SpeedDial openIcon example"
                                                sx={{ position: 'absolute', top: -30, right: 16 }}
                                                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                                            >
                                                {actions.map((action) => (
                                                    <SpeedDialAction
                                                        key={action.name}
                                                        icon={action.icon}
                                                        tooltipTitle={action.name}
                                                        onClick={() => {
                                                            showDetails(row);
                                                        }}
                                                    />
                                                ))}
                                            </SpeedDial>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={page.sizeOptions}
            component="div"
            count={rowData.length}
            rowsPerPage={page.size}
            page={page.number}
            onPageChange={(e, pn) => {
                page.handleChangePage(e, pn);
            }}
            onRowsPerPageChange={(e) => {
                page.handleChangeRowsPerPage(+e.target.value)
            }}
        />
    </>);
}

export default ClusterTable;