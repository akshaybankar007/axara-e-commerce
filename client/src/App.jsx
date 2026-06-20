import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PrivateRoute from './components/PrivateRoute';
import { logout } from './store/authSlice';
import PlaceOrder from './pages/PlaceOrder';

const App = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const logoutHandler = () => {
    dispatch(logout());
  };

return (
    <div className="min-h-screen flex flex-col font-sans text-zinc-100 bg-zinc-950 selection:bg-indigo-500/30">
      {/* Glassmorphism Header */}
      <header className="bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-extrabold text-white tracking-wider">
            AKSHAY & DEVI <span className="text-indigo-500">CO.</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/cart" className="text-zinc-300 hover:text-white transition-colors relative py-1">
              Cart 
              {cartCount > 0 && (
                <span className="bg-indigo-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full ml-1.5 shadow-[0_0_10px_rgba(79,70,229,0.5)]">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {userInfo ? (
              <div className="flex items-center gap-4">
                <span className="text-zinc-400 font-medium">Hello, <span className="text-zinc-100">{userInfo.name}</span></span>
                <button 
                  onClick={logoutHandler} 
                  className="text-red-400 hover:text-red-300 font-medium cursor-pointer transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-zinc-200 transition-colors">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        <Routes>
          {/* ... Routes remain identical ... */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          
          <Route path="" element={<PrivateRoute />}>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
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