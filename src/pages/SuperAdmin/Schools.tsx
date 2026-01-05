import { Box, Typography } from '@mui/material';

const Schools = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Schools Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
                View and manage all registered schools.
            </Typography>
        </Box>
    );
};

export default Schools;
