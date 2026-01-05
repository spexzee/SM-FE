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
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useCreateSchool } from '../queries/School';
import type { CreateSchoolPayload } from '../types';

interface AddSchoolDialogProps {
    open: boolean;
    onClose: () => void;
}

const AddSchoolDialog: React.FC<AddSchoolDialogProps> = ({ open, onClose }) => {
    const [formData, setFormData] = useState<CreateSchoolPayload>({
        schoolName: '',
        dbName: '',
        schoolLogo: '',
        schoolAddress: '',
        schoolEmail: '',
        schoolContact: '',
        schoolWebsite: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const createMutation = useCreateSchool();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.schoolName.trim()) {
            newErrors.schoolName = 'School name is required';
        }
        if (!formData.dbName.trim()) {
            newErrors.dbName = 'Database name is required';
        } else if (!/^[a-z0-9-]+$/.test(formData.dbName)) {
            newErrors.dbName = 'Only lowercase letters, numbers, and hyphens allowed';
        }
        if (formData.schoolEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.schoolEmail)) {
            newErrors.schoolEmail = 'Invalid email format';
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
            schoolName: '',
            dbName: '',
            schoolLogo: '',
            schoolAddress: '',
            schoolEmail: '',
            schoolContact: '',
            schoolWebsite: '',
        });
        setErrors({});
        createMutation.reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Add New School
                <IconButton onClick={handleClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {createMutation.isError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {(createMutation.error as { message?: string })?.message || 'Failed to create school'}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            name="schoolName"
                            label="School Name"
                            value={formData.schoolName}
                            onChange={handleChange}
                            error={!!errors.schoolName}
                            helperText={errors.schoolName}
                            required
                            fullWidth
                        />

                        <TextField
                            name="dbName"
                            label="Database Name"
                            value={formData.dbName}
                            onChange={handleChange}
                            error={!!errors.dbName}
                            helperText={errors.dbName || 'Lowercase letters, numbers, and hyphens only (e.g., lincoln-high)'}
                            required
                            fullWidth
                        />

                        <TextField
                            name="schoolLogo"
                            label="School Logo URL"
                            value={formData.schoolLogo}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            name="schoolEmail"
                            label="School Email"
                            type="email"
                            value={formData.schoolEmail}
                            onChange={handleChange}
                            error={!!errors.schoolEmail}
                            helperText={errors.schoolEmail}
                            fullWidth
                        />

                        <TextField
                            name="schoolContact"
                            label="Contact Number"
                            value={formData.schoolContact}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            name="schoolAddress"
                            label="Address"
                            value={formData.schoolAddress}
                            onChange={handleChange}
                            multiline
                            rows={2}
                            fullWidth
                        />

                        <TextField
                            name="schoolWebsite"
                            label="Website"
                            value={formData.schoolWebsite}
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
                        {createMutation.isPending ? 'Creating...' : 'Create School'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddSchoolDialog;
