import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// COMPONENTS
import Header from './components/Header';
import BottomHeader from './components/BottomHeader';
import Footer from './components/Footer';
import BottomFooter from './components/BottomFooter';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';

// ADMIN SCREENS
import DashboardScreen from './screens/DashboardScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import MessagesScreen from './screens/MessagesScreen';

// SCREENS
import AboutScreen from './screens/AboutScreen';
import CartScreen from './screens/CartScreen'; // step 1
import ContactScreen from './screens/ContactScreen';
import HomeScreen from './screens/HomeScreen';
import JigScreen from './screens/JigScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethod3Screen from './screens/PaymentMethod3Screen'; // step 3
import PlaceOrder4Screen from './screens/PlaceOrder4Screen'; // step 4
import ProductMagScreen from './screens/ProductMagScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import ShippingAddress2Screen from './screens/ShippingAddress2Screen'; // step 2
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <BottomHeader />
      <main className='mt-0'>
        <Routes>
          <Route path='/about' element={<AboutScreen />} />
          <Route path='/jig' element={<JigScreen />} />
          <Route path='/product/:slug' element={<ProductMagScreen />} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/contact' element={<ContactScreen />} />
          <Route path='/search' element={<SearchScreen />} />
          <Route path='/signin' element={<SigninScreen />} />
          <Route path='/signup' element={<SignupScreen />} />
          <Route path='/forget-password' element={<ForgetPasswordScreen />} />
          <Route
            path='/reset-password/:token'
            element={<ResetPasswordScreen />}
          />
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
            path='/admin/messages'
            element={
              <AdminRoute>
                <MessagesScreen />
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
