import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from 'src/store';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useEffect } from 'react';
import { Card, Divider, Stack } from '@mui/material';
import { CommentDTO, CommentDetail } from 'src/DTO/comment';
import { closeCommentPopUp } from 'src/store/slices/comment';
import { createCommentService } from 'src/services/comment-service';

// Yup validation schema
const schema = yup.object().shape({
    comment: yup.string().required('Title is required'),
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

export const Comments = () => {
    const { data, isLoading, isCommentPopUpOpen, isCommentSaving, selectedPost } = useSelector(
        (state: RootStore) => state.comments
    );

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
            comment: '',
        }
    });

    const handleClose = () => {
        reset();
        dispatch(closeCommentPopUp());
    };

    const handleSave = (data: any) => {
        const payload = {
            ...data,
            post_id: selectedPost
        }
        dispatch(createCommentService(payload));
    };

    useEffect(() => {
        if (isCommentSaving) {
            handleClose();
        }
    }, [isCommentSaving])

    if (isLoading) {
        <>
        </>
    }
    return (
        <Modal
            keepMounted
            open={isCommentPopUpOpen}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>

                <React.Fragment>
                    {data.map((value: CommentDTO, index: number) => (
                        <React.Fragment key={value._id}>
                            <Card variant="outlined" sx={{ mb: 2 }} >
                                <Box sx={{ p: 2 }}>
                                    <Stack
                                        direction="row"
                                        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                                    >
                                        <Typography gutterBottom variant="h5" component="div" sx={{ color: value?.color }}>
                                            {value?.title}
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {value?.description}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ p: 2 }}>
                                    <Typography gutterBottom variant="body2" sx={{ textAlign: 'right' }}>
                                        {value?.comments.length} comments
                                    </Typography>
                                </Box>
                            </Card>

                            {value?.comments.map((comment: CommentDetail, innerIndex: number) => (
                                <React.Fragment key={`${value._id}-${innerIndex}`}>
                                    <Card variant="outlined">
                                        <Box sx={{ p: 2 }}>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                {comment?.comment}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </React.Fragment>



                <form onSubmit={handleSubmit(handleSave)}>
                    <Controller
                        name="comment"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Comment"
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 2 }}
                                multiline
                                rows={4}
                                error={!!errors.comment}
                                helperText={errors.comment?.message}
                            />
                        )}
                    />

                    {/* Footer with Save and Close Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button type="button" variant="contained" sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" disabled={isCommentSaving}>
                            Comment
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal >
    );
};
