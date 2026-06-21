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
            toast.success(`${product.name} added to bag!`, {
                style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' }
            });
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="group flex flex-col cursor-pointer"
        >
            {/* The Image Container - Essential for Luxury E-commerce */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 mb-4">
                {/* Fallback placeholder if you don't have images in your DB yet */}
                <img 
                    src={product.image || `https://via.placeholder.com/400x500/18181b/ffffff?text=${encodeURIComponent(product.name)}`} 
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
                />
            </div>

            {/* Minimalist Details */}
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-medium text-zinc-100 uppercase tracking-wide">
                        {product.name}
                    </h3>
                    <span className="text-sm text-zinc-300 ml-4">
                        ₹{product.price}
                    </span>
                </div>
                
                <p className="text-xs text-zinc-500 mb-4 uppercase tracking-wider">
                    {product.category}
                </p>
                
                <div className="mt-auto pt-3 border-t border-zinc-900">
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className={`w-full py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                            product.stock > 0 
                                ? 'bg-zinc-100 text-zinc-950 hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                                : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                        }`}
                    >
                        {product.stock > 0 ? 'Add to Bag' : 'Sold Out'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;