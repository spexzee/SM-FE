import { Box, Typography } from '@mui/material';

const Users = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Users Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
                View and manage all users across schools.
            </Typography>
        </Box>
    );
};

export default Users;
