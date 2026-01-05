import { Box, Typography } from '@mui/material';

const TeacherAttendance = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Attendance
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Mark and view attendance for your classes.
            </Typography>
        </Box>
    );
};

export default TeacherAttendance;
