import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import './App.css';
import About from "./pages/About";
import Home from "./pages/Home";
import Products from "./pages/Products";
import RootLayout from "./layout/RootLayout";
import Login from "./pages/Login";
import Register from"./pages/Register";
import ContactLayout from "./layout/ContactLayout";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import  { Suspense } from "react";
import ErrorPage from "./components/ErrorPage";
function App() {
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactLayout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="users" element={<Users />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
    </Route>
    
  ));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
    
  );
};

export default App;
