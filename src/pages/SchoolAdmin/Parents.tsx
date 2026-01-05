import { Box, Typography } from '@mui/material';

const Parents = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Parents Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
                View and manage all parents in your school.
            </Typography>
        </Box>
    );
};

export default Parents;
