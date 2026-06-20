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
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
                    <p className="text-gray-500 mb-4">Your Axara cart is empty.</p>
                    <Link to="/" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded font-medium hover:bg-indigo-700 transition-colors">
                        Go Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                                    <p className="text-sm text-gray-500 mt-0.5">{item.category}</p>
                                    <p className="text-indigo-600 font-bold mt-2">₹{item.price}</p>
                                </div>

                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                    <select
                                        value={item.qty}
                                        onChange={(e) => updateCartHandler(item, e.target.value)}
                                        className="border border-gray-300 rounded p-1.5 bg-white text-sm font-medium focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        {[...Array(item.stock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        type="button"
                                        onClick={() => removeFromCartHandler(item._id)}
                                        className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-fit">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                        <div className="flex justify-between border-b border-gray-100 pb-4 mb-4 text-gray-600">
                            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                            <span className="font-semibold text-gray-900">₹{itemsPrice}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg text-gray-900 mb-6">
                            <span>Total Estimated</span>
                            <span>₹{itemsPrice}</span>
                        </div>
                        <button
                            type="button"
                            onClick={checkoutHandler}
                            className="w-full bg-gray-900 text-white py-3 rounded font-semibold tracking-wide hover:bg-gray-800 transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;