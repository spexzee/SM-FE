import { Box, Typography } from '@mui/material';

const School = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                School Details
            </Typography>
            <Typography variant="body1" color="text.secondary">
                View and manage your school information.
            </Typography>
        </Box>
    );
};

export default School;
