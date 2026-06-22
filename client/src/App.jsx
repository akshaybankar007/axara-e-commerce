import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast'; 

// Existing Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';

// Route Protectors
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute'; // You need to create this file next

// New Pages (Stubs you need to create)
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import OrderDetails from './pages/OrderDetails';
import AdminDashboard from './pages/admin/AdminDashboard';

import { logout } from './store/authSlice';

const App = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Just counting the total items so the cart badge doesn't look useless
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-zinc-100 bg-zinc-950 selection:bg-indigo-500/30">
      <Toaster position="top-center" reverseOrder={false} />
      
      <header className="bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          
          <Link to="/" className="text-xl font-light text-white tracking-[0.2em] uppercase">
            Akshay & Devi <span className="font-bold">Co.</span>
          </Link>
          
          <nav className="flex items-center gap-8 text-xs font-medium tracking-widest uppercase">
            <Link to="/cart" className="text-zinc-400 hover:text-white transition-colors relative flex items-center gap-2">
              Bag 
              {cartCount > 0 && (
                <span className="bg-zinc-100 text-zinc-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {userInfo ? (
              <div className="flex items-center gap-6">
                
                {/* Let admins actually see the admin link */}
                {userInfo.role === 'admin' && (
                  <Link to="/admin/dashboard" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                    Dashboard
                  </Link>
                )}

                <Link to="/profile" className="text-zinc-500 hover:text-zinc-300 hidden sm:inline-block transition-colors">
                  Hi, <span className="text-zinc-200">{userInfo.name}</span>
                </Link>
                
                <button 
                  onClick={logoutHandler} 
                  className="text-zinc-400 hover:text-white cursor-pointer transition-colors uppercase tracking-widest text-xs"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-zinc-400 hover:text-white transition-colors">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        <Routes>
          {/* Public access. Anyone can look, but they gotta pay to play. */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Locked behind the login wall. No guests allowed beyond this point. */}
          <Route path="" element={<PrivateRoute />}>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Admin routes. Keep the peasants out. */}
          <Route path="" element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* You can add /admin/users or /admin/products here later */}
          </Route>
        </Routes>
      </main>

      <footer className="bg-zinc-950 text-zinc-500 text-center p-4 text-sm mt-auto border-t border-zinc-800">
        &copy; {new Date().getFullYear()} Serving Nagpur, Gondiya, Pune, and Mumbai.
      </footer>
    </div>
  );
};

export default App;