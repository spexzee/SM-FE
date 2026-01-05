import { Box, Typography } from '@mui/material';

const Students = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Students Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
                View and manage all students in your school.
            </Typography>
        </Box>
    );
};

export default Students;
