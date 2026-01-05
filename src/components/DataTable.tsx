import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Button,
    CircularProgress,
    Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Column definition
export interface Column<T> {
    id: keyof T | string;
    label: string;
    minWidth?: number;
    align?: 'left' | 'center' | 'right';
    format?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    title: string;
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    error?: string | null;
    onAddClick?: () => void;
    addButtonLabel?: string;
    emptyMessage?: string;
    getRowKey: (row: T) => string;
}

function DataTable<T>({
    title,
    columns,
    data,
    isLoading = false,
    error = null,
    onAddClick,
    addButtonLabel = 'Add New',
    emptyMessage = 'No data found',
    getRowKey,
}: DataTableProps<T>) {
    return (
        <Box sx={{ width: '100%' }}>
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <Typography variant="h5" fontWeight={600} color="text.primary">
                    {title}
                </Typography>
                {onAddClick && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onAddClick}
                        sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 3,
                        }}
                    >
                        {addButtonLabel}
                    </Button>
                )}
            </Box>

            {/* Table */}
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={String(column.id)}
                                    align={column.align || 'left'}
                                    sx={{
                                        minWidth: column.minWidth,
                                        fontWeight: 600,
                                        backgroundColor: '#f5f5f5',
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                                    <CircularProgress size={40} />
                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                        Loading...
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                                    <Typography color="error">{error}</Typography>
                                </TableCell>
                            </TableRow>
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                                    <Typography color="text.secondary">{emptyMessage}</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row) => (
                                <TableRow hover key={getRowKey(row)}>
                                    {columns.map((column) => {
                                        const value = (row as Record<string, unknown>)[column.id as string];
                                        return (
                                            <TableCell key={String(column.id)} align={column.align || 'left'}>
                                                {column.format
                                                    ? column.format(value as T[keyof T], row)
                                                    : (value as React.ReactNode)}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

// Helper component for status chips
export const StatusChip: React.FC<{ status: 'active' | 'inactive' }> = ({ status }) => (
    <Chip
        label={status}
        size="small"
        color={status === 'active' ? 'success' : 'default'}
        sx={{ textTransform: 'capitalize' }}
    />
);

export default DataTable;
