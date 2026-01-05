import { Box, Typography } from '@mui/material';

const StudentDashboard = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Student Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Welcome to your dashboard. View your classes, attendance, and results.
            </Typography>
        </Box>
    );
};

export default StudentDashboard;
