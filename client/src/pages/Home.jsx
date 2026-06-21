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

    // Updated Skeleton to match new image-heavy cards
    const SkeletonCard = () => (
        <div className="flex flex-col animate-pulse">
            <div className="aspect-[4/5] w-full bg-zinc-900 mb-4 rounded-sm"></div>
            <div className="flex justify-between mb-2">
                <div className="h-4 bg-zinc-900 rounded w-1/2"></div>
                <div className="h-4 bg-zinc-900 rounded w-1/4"></div>
            </div>
            <div className="h-3 bg-zinc-900 rounded w-1/3 mb-4"></div>
            <div className="mt-auto pt-3 border-t border-zinc-900">
                <div className="h-10 bg-zinc-900 rounded w-full"></div>
            </div>
        </div>
    );

    if (error) {
        return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    return (
        <div className="space-y-10">
            {/* Elegant Centered Hero */}
            <div className="mb-16 mt-8 flex flex-col items-center text-center">
                <motion.h2 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl sm:text-3xl font-light tracking-[0.2em] text-zinc-100 uppercase mb-5"
                >
                    New Arrivals
                </motion.h2>
                <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-12 h-[1px] bg-zinc-700 mb-6"
                ></motion.div>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-[10px] sm:text-xs text-zinc-500 tracking-[0.2em] uppercase"
                >
                    Curated for Nagpur • Gondiya • Pune • Mumbai
                </motion.p>
            </div>

            {/* Product Display Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {[...Array(8)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
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