import { useEffect, useState } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import SimpleAttendance from './SimpleAttendance';
import PeriodAttendance from './PeriodAttendance';
import CheckInAttendance from './CheckInAttendance';
import { useGetSchoolById } from '../../../queries/School';
import TokenService from '../../../queries/token/tokenService';
import type { AttendanceMode } from '../../../types';

/**
 * Main Teacher Attendance Page
 * Routes to appropriate attendance component based on school's attendance mode
 */
const TeacherAttendance = () => {
    const schoolId = TokenService.getSchoolId() || '';
    const { data: schoolData, isLoading, error } = useGetSchoolById(schoolId);
    const [mode, setMode] = useState<AttendanceMode>('simple');

    useEffect(() => {
        if (schoolData?.data?.attendanceSettings?.mode) {
            setMode(schoolData.data.attendanceSettings.mode as AttendanceMode);
        }
    }, [schoolData]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">Failed to load school settings</Alert>
            </Box>
        );
    }

    // Render appropriate attendance component based on mode
    switch (mode) {
        case 'period_wise':
            return <PeriodAttendance />;
        case 'check_in_out':
            return <CheckInAttendance />;
        case 'simple':
        default:
            return <SimpleAttendance />;
    }
};

export default TeacherAttendance;
