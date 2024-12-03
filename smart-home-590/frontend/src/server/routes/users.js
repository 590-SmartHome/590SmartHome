import { Router } from "express";
import users from "../config/models/users.js";
import { getAllUsers } from "../data/users.js";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
      path: '/products/:id',
      element: <ProductDetails />,
      loader: async ({ params }) => {
        const response = await fetch(`/api/products/${params.id}`);
        return response.json();
      },
    },
]);
/*
Router
.get("/api/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});*/
export default Router;