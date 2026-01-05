import { Box, Typography } from '@mui/material';

const TeacherStudents = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                My Students
            </Typography>
            <Typography variant="body1" color="text.secondary">
                View all students in your classes.
            </Typography>
        </Box>
    );
};

export default TeacherStudents;
