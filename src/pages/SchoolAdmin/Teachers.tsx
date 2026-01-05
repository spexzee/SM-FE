import { Box, Typography } from '@mui/material';

const Teachers = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Teachers Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
                View and manage all teachers in your school.
            </Typography>
        </Box>
    );
};

export default Teachers;
