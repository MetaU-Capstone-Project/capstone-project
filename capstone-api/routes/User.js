const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

router.get('/', (req, res) => {
    try {
        let currUser = UserModel.getCurrentUser();
        res.send({currUser: currUser});
    } catch {
        // TODO
        res.send({currUser: currUser});
    }
})

// router.get('/orders', (req, res) => {
//     const orders = StoreModel.orders();
//     res.send({orders: orders});
// })

// router.get('/orders/:orderId', (req, res) => {
//     const orderId = req.params.orderId;
//     const order = StoreModel.order(orderId);
//     res.send({order: order});
// })

// router.get('/:productId', (req, res) => {
//     const productId = req.params.productId;
//     const product = StoreModel.product(productId);
//     res.send({product : product});
// })

// router.get('/', (req, res) => {
//     const products = StoreModel.products();
//     res.send({products: products});
// })

module.exports = router