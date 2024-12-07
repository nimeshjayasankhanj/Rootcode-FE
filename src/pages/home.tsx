import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'src/components/molecules';
import { Empty } from 'src/components/molecules/empty';

import { Comments, PostLists } from 'src/components/organisms';
import { postListsService } from 'src/services/post-service';
import { AppDispatch, RootStore } from 'src/store';

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data, isLoading, isPostSaving } = useSelector(
        (state: RootStore) => state.posts
    );

    const { isCommentSaving } = useSelector(
        (state: RootStore) => state.comments
    );

    useEffect(() => {
        commentLists();
    }, [isPostSaving, isCommentSaving]);

    const commentLists = () => {
        dispatch(postListsService());
    };

    if (isLoading) {
        return <Loader />;
    }

    return (

        <Grid container>
            <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                    {data.length === 0 ? (
                        <Grid item xs={12} md={12} sm={12}>
                            <Empty />
                        </Grid>
                    ) : (
                        data.map((value, index: number) => (
                            <Grid item xs={12} md={3} key={index}>
                                <PostLists value={value} />
                            </Grid>
                        ))
                    )}

                </Grid>
            </Grid>
            <Comments />
        </Grid>
    );
}

export default Home;