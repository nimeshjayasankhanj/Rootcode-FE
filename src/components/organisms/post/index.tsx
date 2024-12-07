import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from 'src/store';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createPostService } from 'src/services/post-service';
import { CreatePostDTO } from 'src/DTO/post';
import { closePostPopUp } from 'src/store/slices/post';
import { useEffect } from 'react';

// Yup validation schema
const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    color: yup.string().required('Title color is required'),
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const CreatePost = () => {
    const { isPostPopUpOpen, isPostSaving } = useSelector((state: RootStore) => state.posts);
    const dispatch = useDispatch<AppDispatch>();

    // React Hook Form setup
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            color: ''
        }
    });

    const handleClose = () => {
        reset();
        dispatch(closePostPopUp());
    };

    const handleSave = (data: CreatePostDTO) => {
        dispatch(createPostService(data));
    };

    const handleColorChange = (color: string) => {
        setValue('color', color);
    };


    useEffect(() => {
        if (isPostSaving) {
            handleClose();
        }
    }, [isPostSaving])

    return (
        <Modal
            keepMounted
            open={isPostPopUpOpen}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Create a Post
                    </Typography>
                    <IconButton onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>


                <form onSubmit={handleSubmit(handleSave)}>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Title"
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 2 }}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 2 }}
                                multiline
                                rows={4}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        )}
                    />

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1">Title Color</Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    bgcolor: '#3779b4',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                }}
                                onClick={() => handleColorChange('#3779b4')}
                            >
                            </Box>
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    bgcolor: '#f5dc7d',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                }}
                                onClick={() => handleColorChange('#f5dc7d')}
                            >
                            </Box>
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    bgcolor: '#eb9182',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                }}
                                onClick={() => handleColorChange('#eb9182')}
                            >
                            </Box>
                        </Box>
                        {errors.color && (
                            <Typography sx={{ color: 'red', fontSize: '12px', mt: 1 }}>
                                {errors.color?.message}
                            </Typography>
                        )}
                    </Box>

                    {/* Footer with Save and Close Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button type="submit" variant="contained" disabled={isPostSaving}>
                            Publish
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};
