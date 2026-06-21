import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast'; 
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
          <span className="text-zinc-500 hidden sm:inline-block">
            Hi, <span className="text-zinc-200">{userInfo.name}</span>
          </span>
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