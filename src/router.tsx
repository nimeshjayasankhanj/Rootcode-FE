import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "src/components/organisms";
import Home from "src/pages/home";

const RouterLists = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />}></Route>
            </Route>
        </Routes>
    );
};

export default RouterLists;
