/* eslint-disable */
import React from "react";
import Join from "./router/Join";
import Login from "./router/Login";
import TodoList from "./router/TodoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/join" element={<Join/>}/>
        <Route path="/todo" element={<TodoList/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;