import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Box, Divider, Stack } from '@mui/material';
import { Comment } from 'src/DTO/post';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { commentListsService } from 'src/services/comment-service';
import { openCommentPopUp } from 'src/store/slices/comment';

interface CommentListsProps {
    value: Comment;
}
export const PostLists = ({ value }: CommentListsProps) => {

    const dispatch = useDispatch<AppDispatch>();

    const openComments = (id: string) => {
        dispatch(openCommentPopUp(id))
        dispatch(commentListsService(id))
    }
    return (
        <Card variant="outlined" sx={{
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                boxShadow: 1,
                cursor: 'pointer'
            },
        }} onClick={() => openComments(value._id)}>
            <Box sx={{ p: 2 }}>
                <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: value.color }}>
                        {value.title}
                    </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {value.description}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="body2" sx={{ textAlign: 'right' }}>
                    {value.comment_count} comments
                </Typography>
            </Box>
        </Card>
    );
}
