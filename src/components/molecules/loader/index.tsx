import { Grid, Skeleton } from "@mui/material";

export const Loader = () => {
    return (
        <Grid container spacing={10}>
            <Grid item xs={12} md={12} sm={12}>
                <Skeleton variant="rounded" width={"100%"} height={300} role="loader" />
            </Grid>
        </Grid>
    );
};
