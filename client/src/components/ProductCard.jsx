// client/src/components/ProductCard.jsx
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const handleAddToCart = () => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const qty = existItem ? existItem.qty + 1 : 1;
        if (qty <= product.stock) {
            dispatch(addToCart({ ...product, qty }));
        }
    };

    return (
        <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 inline-block w-fit px-2 py-1 rounded mt-1">
                {product.category}
            </span>
            <p className="text-sm text-gray-500 mt-3 flex-grow line-clamp-2">{product.description}</p>
            
            <div className="mt-5 flex items-center justify-between">
                <span className="font-bold text-xl text-gray-900">₹{product.price}</span>
                <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                        product.stock > 0 
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

