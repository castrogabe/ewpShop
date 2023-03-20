import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductMagScreen from './screens/ProductMagScreen';
import AboutScreen from './screens/AboutScreen';
import JigScreen from './screens/JigScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddress2Screen from './screens/ShippingAddress2Screen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethod3Screen from './screens/PaymentMethod3Screen';
import PlaceOrder4Screen from './screens/PlaceOrder4Screen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import BottomFooter from './components/BottomFooter';
import BottomHeader from './components/BottomHeader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <BottomHeader />
      <ToastContainer />
      <main className='mt-0'>
        <Routes>
          <Route path='/about' element={<AboutScreen />} />
          <Route path='/jig' element={<JigScreen />} />
          <Route path='/product/:slug' element={<ProductMagScreen />} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/search' element={<SearchScreen />} />
          <Route path='/signin' element={<SigninScreen />} />
          <Route path='/signup' element={<SignupScreen />} />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            }
          />
          <Route path='/placeorder' element={<PlaceOrder4Screen />} />
          <Route
            path='/order/:id'
            element={
              <ProtectedRoute>
                <OrderScreen />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path='/orderhistory'
            element={
              <ProtectedRoute>
                <OrderHistoryScreen />
              </ProtectedRoute>
            }
          ></Route>
          <Route path='/shipping' element={<ShippingAddress2Screen />}></Route>
          <Route path='/payment' element={<PaymentMethod3Screen />}></Route>
          {/* Admin Routes */}
          <Route
            path='/admin/dashboard'
            element={
              <AdminRoute>
                <DashboardScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path='/admin/orders'
            element={
              <AdminRoute>
                <OrderListScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path='/admin/users'
            element={
              <AdminRoute>
                <UserListScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path='/admin/products'
            element={
              <AdminRoute>
                <ProductListScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path='/admin/product/:id'
            element={
              <AdminRoute>
                <ProductEditScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path='/admin/user/:id'
            element={
              <AdminRoute>
                <UserEditScreen />
              </AdminRoute>
            }
          ></Route>

          <Route path='/' element={<HomeScreen />} />
        </Routes>
      </main>
      <Footer />
      <BottomFooter />
    </BrowserRouter>
  );
}

export default App;
