import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const addOrderItems = async (req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        shippingPrice, 
        totalPrice 
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
        orderItems: orderItems.map((x) => ({
            ...x,
            product: x._id,
            _id: undefined
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice
    });

    const createdOrder = await order.save();

    for (const item of order.orderItems) {
        const product = await Product.findById(item.product);
        if (product) {
            product.stock -= item.qty;
            await product.save();
        }
    }



    res.status(201).json(createdOrder);
};