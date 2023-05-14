import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import {
  Home,
  About,
  Register,
  Login,
  Products,
  SingleProduct,
  Cart,
  Checkout,
  UserLayout,
  Order,
  UpdateUser,
  UpdatePassword,
  Error,
  LoginRoute,
  AdminRoute,
  CreateProduct,
  UpdateProduct,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route
          path="/products/create"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/products/update/:id"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/user"
          element={
            <LoginRoute>
              <UserLayout />
            </LoginRoute>
          }
        >
          <Route index element={<Order />} />
          <Route path="/user/updateUser" element={<UpdateUser />} />
          <Route path="/user/updatePassword" element={<UpdatePassword />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
