import React, { useState } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store";
import { openPostPopUp } from "src/store/slices/post";
import { CreatePost } from "src/components/organisms";

export const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const dispatch = useDispatch<AppDispatch>();

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const openPostModal = () => {
        dispatch(openPostPopUp())
    }
    return (
        <AppBar position="static">
            <Container maxWidth="xl" style={{ backgroundColor: "#8b26b2" }}>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >

                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link
                            to="/"
                            className="text-white"
                            style={{ color: "inherit", textDecoration: "none" }}
                        >
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                <MarkAsUnreadIcon
                                    sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                                />
                                PostApp
                            </Typography>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 0, display: { md: "flex" } }}>
                        <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={openPostModal}>
                            Create New Post
                        </Button>
                    </Box>
                </Toolbar>
                <CreatePost />
            </Container>
        </AppBar>
    );
};
