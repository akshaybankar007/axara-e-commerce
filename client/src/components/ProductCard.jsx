import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const handleAddToCart = () => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const qty = existItem ? existItem.qty + 1 : 1;
        if (qty <= product.stock) {
            dispatch(addToCart({ ...product, qty }));
            toast.success(`${product.name} added to cart!`, {
                style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' }
            });
        }
    };

    return(
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            whileHover={{ y: -5 }}
            className="border border-zinc-800 rounded-xl p-5 shadow-sm hover:shadow-xl hover:border-zinc-700 transition-all bg-zinc-900 flex flex-col group"
        >
            <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                {product.name}
            </h3>
            <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 inline-block w-fit px-2 py-1 rounded mt-2">
                {product.category}
            </span>
            <p className="text-sm text-zinc-400 mt-3 flex-grow line-clamp-2">
                {product.description}
            </p>
            
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-800/50">
                <span className="font-bold text-xl text-zinc-100">₹{product.price}</span>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`px-4 py-2 rounded font-medium text-sm transition-all duration-300 ${
                        product.stock > 0 
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_10px_rgba(79,70,229,0.3)] hover:shadow-[0_0_15px_rgba(79,70,229,0.5)]' 
                            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProductCard;