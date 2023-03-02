import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import JigScreen from './screens/JigScreen';
import Header from './components/Header';
import BottomHeader from './components/BottomHeader';
import BottomFooter from './components/BottomFooter';
import Footer from './components/Footer';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import OrderScreen from './screens/OrderScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <BottomHeader />
      <main className='mt-0'>
        <Routes>
          <Route path='/product/:slug' element={<ProductScreen />} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/' element={<HomeScreen />} />
          <Route path='/about' element={<AboutScreen />} />
          <Route path='/jig' element={<JigScreen />} />
          <Route path='/signin' element={<SigninScreen />} />
          <Route path='/signup' element={<SignupScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/order/:id' element={<OrderScreen />} />
          <Route path='/shipping' element={<ShippingAddressScreen />} />
          <Route path='/payment' element={<PaymentMethodScreen />} />
          <Route path='/orderhistory' element={<OrderHistoryScreen />} />
        </Routes>
      </main>
      <Footer />
      <BottomFooter />
    </BrowserRouter>
  );
}

export default App;
