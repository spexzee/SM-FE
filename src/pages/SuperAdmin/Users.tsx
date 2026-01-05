import React, { useState } from 'react';
import { Box } from '@mui/material';
import DataTable, { StatusChip } from '../../components/DataTable';
import type { Column } from '../../components/DataTable';
import AddSchoolAdminDialog from '../../components/AddSchoolAdminDialog';
import { useGetSchoolAdmins } from '../../queries/SchoolAdmin';
import type { SchoolAdmin } from '../../types';

const columns: Column<SchoolAdmin>[] = [
    { id: 'userId', label: 'User ID', minWidth: 100 },
    { id: 'username', label: 'Username', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'schoolId', label: 'School ID', minWidth: 120 },
    { id: 'contactNumber', label: 'Contact', minWidth: 130 },
    {
        id: 'status',
        label: 'Status',
        minWidth: 100,
        align: 'center',
        format: (value) => <StatusChip status={value as 'active' | 'inactive'} />,
    },
    {
        id: 'createdAt',
        label: 'Created',
        minWidth: 120,
        format: (value) =>
            value ? new Date(value as string).toLocaleDateString() : '-',
    },
];

const UsersPage: React.FC = () => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const { data, isLoading, error } = useGetSchoolAdmins();

    const users = data?.data || [];

    return (
        <Box sx={{ p: 3 }}>
            <DataTable<SchoolAdmin>
                title="School Administrators"
                columns={columns}
                data={users}
                isLoading={isLoading}
                error={error ? (error as { message?: string })?.message || 'Failed to load users' : null}
                onAddClick={() => setDialogOpen(true)}
                addButtonLabel="Add School Admin"
                emptyMessage="No school administrators found. Click 'Add School Admin' to create one."
                getRowKey={(row) => row.userId}
            />

            <AddSchoolAdminDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </Box>
    );
};

export default UsersPage;
