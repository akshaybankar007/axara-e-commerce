// client/src/pages/Home.jsx
import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Premium Skeleton Loader Component
    const SkeletonCard = () => (
        <div className="border border-zinc-800/60 rounded-xl p-5 bg-zinc-900/50 animate-pulse flex flex-col h-[280px]">
            <div className="h-6 bg-zinc-800 rounded w-2/3 mb-3"></div>
            <div className="h-4 bg-zinc-800 rounded w-1/4 mb-4"></div>
            <div className="space-y-2 flex-grow">
                <div className="h-3 bg-zinc-800 rounded w-full"></div>
                <div className="h-3 bg-zinc-800 rounded w-5/6"></div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-zinc-800/40 mt-4">
                <div className="h-5 bg-zinc-800 rounded w-1/4"></div>
                <div className="h-9 bg-zinc-800 rounded w-24"></div>
            </div>
        </div>
    );

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4">
                <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <p className="text-zinc-400 font-medium">Failed to retrieve boutique catalog.</p>
                <p className="text-sm text-zinc-600 mt-1">{error}</p>
            </div>
        );
    }

    // Framer Motion Container Variant for staggered entry animations
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    return (
        <div className="space-y-10">
            {/* Elegant Minimalist Hero/Header */}
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            >
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
                        Latest <span className="font-semibold text-indigo-400">Arrivals</span>
                    </h2>
                    <p className="text-zinc-500 text-sm mt-2 font-medium">
                        Exclusive curations available for delivery.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 bg-zinc-900/60 border border-zinc-800/80 px-3 py-1.5 rounded-full w-fit">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                    Nagpur • Gondiya • Pune • Mumbai
                </div>
            </motion.div>

            {/* Product Display Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Home;