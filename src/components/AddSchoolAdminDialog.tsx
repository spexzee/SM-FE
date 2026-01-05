import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    CircularProgress,
    Alert,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useCreateSchoolAdmin } from '../queries/SchoolAdmin';
import { useGetSchools } from '../queries/School';
import type { CreateSchoolAdminPayload } from '../types';

interface AddSchoolAdminDialogProps {
    open: boolean;
    onClose: () => void;
}

const AddSchoolAdminDialog: React.FC<AddSchoolAdminDialogProps> = ({ open, onClose }) => {
    const [formData, setFormData] = useState<CreateSchoolAdminPayload>({
        username: '',
        email: '',
        password: '',
        schoolId: '',
        contactNumber: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const createMutation = useCreateSchoolAdmin();
    const { data: schoolsData, isLoading: schoolsLoading } = useGetSchools();

    const schools = schoolsData?.data || [];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!formData.schoolId) {
            newErrors.schoolId = 'Please select a school';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await createMutation.mutateAsync(formData);
            handleClose();
        } catch (error) {
            // Error is handled by mutation
        }
    };

    const handleClose = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            schoolId: '',
            contactNumber: '',
        });
        setErrors({});
        createMutation.reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Add School Admin
                <IconButton onClick={handleClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {createMutation.isError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {(createMutation.error as { message?: string })?.message || 'Failed to create school admin'}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl fullWidth error={!!errors.schoolId} required>
                            <InputLabel>School</InputLabel>
                            <Select
                                value={formData.schoolId}
                                label="School"
                                onChange={(e) => handleSelectChange('schoolId', e.target.value)}
                                disabled={schoolsLoading}
                            >
                                {schools.map((school) => (
                                    <MenuItem key={school.schoolId} value={school.schoolId}>
                                        {school.schoolName} ({school.schoolId})
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.schoolId && <FormHelperText>{errors.schoolId}</FormHelperText>}
                        </FormControl>

                        <TextField
                            name="username"
                            label="Username"
                            value={formData.username}
                            onChange={handleChange}
                            error={!!errors.username}
                            helperText={errors.username}
                            required
                            fullWidth
                        />

                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            required
                            fullWidth
                        />

                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            required
                            fullWidth
                        />

                        <TextField
                            name="contactNumber"
                            label="Contact Number"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleClose} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={createMutation.isPending}
                        startIcon={createMutation.isPending ? <CircularProgress size={20} /> : null}
                    >
                        {createMutation.isPending ? 'Creating...' : 'Create Admin'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddSchoolAdminDialog;
