// client/src/pages/Cart.jsx
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../store/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const updateCartHandler = (item, qty) => {
        dispatch(addToCart({ ...item, qty: Number(qty) }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        if (userInfo) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=/shipping');
        }
    };

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <div className="max-w-6xl mx-auto pt-8">
            <h2 className="text-2xl font-light tracking-[0.2em] text-zinc-100 uppercase mb-12 border-b border-zinc-900 pb-4">
                Shopping Bag
            </h2>

            {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <p className="text-zinc-500 uppercase tracking-widest mb-6 text-sm">Your bag is empty.</p>
                    <Link 
                        to="/" 
                        className="bg-zinc-100 text-zinc-950 px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex gap-6 pb-6 border-b border-zinc-900">
                                {/* Item Image */}
                                <div className="w-24 h-32 bg-zinc-900 flex-shrink-0">
                                    <img 
                                        src={item.image || `https://via.placeholder.com/150x200/18181b/ffffff?text=${encodeURIComponent(item.name)}`} 
                                        alt={item.name}
                                        className="w-full h-full object-cover opacity-90"
                                    />
                                </div>
                                
                                {/* Item Details */}
                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <Link to={`/product/${item._id}`} className="text-sm uppercase tracking-wide text-zinc-100 hover:text-zinc-400 transition-colors">
                                                {item.name}
                                            </Link>
                                            <span className="text-sm text-zinc-300">₹{item.price}</span>
                                        </div>
                                        <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">{item.category}</p>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-4">
                                        {/* Styled Quantity Selector */}
                                        <div className="flex items-center border border-zinc-800">
                                            <select 
                                                value={item.qty} 
                                                onChange={(e) => updateCartHandler(item, e.target.value)} 
                                                className="bg-transparent text-zinc-100 text-xs py-1 px-2 outline-none cursor-pointer appearance-none text-center min-w-[3rem]"
                                            >
                                                {[...Array(item.stock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1} className="bg-zinc-900 text-zinc-100">{x + 1}</option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <button 
                                            type="button" 
                                            onClick={() => removeFromCartHandler(item._id)} 
                                            className="text-xs text-zinc-500 uppercase tracking-widest hover:text-red-400 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-zinc-950 border border-zinc-900 p-6 h-fit">
                        <h3 className="text-sm font-medium text-zinc-100 uppercase tracking-widest mb-6 border-b border-zinc-900 pb-4">
                            Order Summary
                        </h3>
                        
                        <div className="space-y-4 text-sm text-zinc-400 mb-8 tracking-wide">
                            <div className="flex justify-between">
                                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                <span className="text-zinc-100">₹{itemsPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-zinc-500 text-xs uppercase tracking-wider">Calculated at checkout</span>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center border-t border-zinc-900 pt-4 mb-8">
                            <span className="text-sm uppercase tracking-widest text-zinc-100">Total</span>
                            <span className="text-lg text-zinc-100">₹{itemsPrice}</span>
                        </div>
                        
                        <button 
                            type="button" 
                            onClick={checkoutHandler} 
                            className="w-full bg-zinc-100 text-zinc-950 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;