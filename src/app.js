import React, { useReducer } from "react";
import { Routes , Route } from 'react-router-dom';
import Users from "./routers/users/index";
import NotFound from "./routers/notFound";

export default function App () {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}