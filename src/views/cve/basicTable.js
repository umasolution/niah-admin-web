import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { IconButton, Pagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { AddCircle } from '@mui/icons-material';

const useStyles = makeStyles({
    customTableContainer: {
        overflowX: 'initial',
        overflowY: 'auto',
        height: '550px'
    }
});

export default function BasicTable({ columns, rows, title, onEdit, onSelect, onPaginate }) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} classes={{ root: classes.customTableContainer }}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="">
                <TableHead>
                    <TableRow>
                        {columns?.map((column) => {
                            return <TableCell>{column.title}</TableCell>;
                        })}

                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {columns.map((column, index) => {
                                return (
                                    <TableCell component="th" scope="row">
                                        {rows[rowIndex][column.field]}
                                    </TableCell>
                                );
                            })}
                            {onEdit != null ? (
                                <TableCell scope="row">
                                    <IconButton onClick={() => onEdit(row)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            ) : (
                                ''
                            )}
                            {onSelect != null ? (
                                <TableCell scope="row">
                                    <IconButton onClick={() => onSelect(row)}>
                                        <AddCircle />
                                    </IconButton>
                                </TableCell>
                            ) : (
                                ''
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
