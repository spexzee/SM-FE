import { Box, Typography } from '@mui/material';

const SuperAdminDashboard = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Super Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Welcome to the Super Admin Dashboard. Manage schools and users from here.
            </Typography>
        </Box>
    );
};

export default SuperAdminDashboard;
