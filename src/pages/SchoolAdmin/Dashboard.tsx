import { Box, Typography } from '@mui/material';

const SchoolAdminDashboard = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                School Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Welcome to the School Admin Dashboard. Manage your school, teachers, students, and parents.
            </Typography>
        </Box>
    );
};

export default SchoolAdminDashboard;
