import React, { useState } from 'react';
import { Box } from '@mui/material';
import DataTable, { StatusChip } from '../../components/DataTable';
import type { Column } from '../../components/DataTable';
import AddSchoolDialog from '../../components/AddSchoolDialog';
import { useGetSchools } from '../../queries/School';
import type { School } from '../../types';

const columns: Column<School>[] = [
    { id: 'schoolId', label: 'School ID', minWidth: 120 },
    { id: 'schoolName', label: 'School Name', minWidth: 200 },
    { id: 'schoolEmail', label: 'Email', minWidth: 180 },
    { id: 'schoolContact', label: 'Contact', minWidth: 150 },
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

const SchoolsPage: React.FC = () => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const { data, isLoading, error } = useGetSchools();

    const schools = data?.data || [];

    return (
        <Box sx={{ p: 3 }}>
            <DataTable<School>
                title="Schools"
                columns={columns}
                data={schools}
                isLoading={isLoading}
                error={error ? (error as { message?: string })?.message || 'Failed to load schools' : null}
                onAddClick={() => setDialogOpen(true)}
                addButtonLabel="Add School"
                emptyMessage="No schools found. Click 'Add School' to create one."
                getRowKey={(row) => row.schoolId}
            />

            <AddSchoolDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </Box>
    );
};

export default SchoolsPage;
