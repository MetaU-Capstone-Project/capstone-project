const express = require('express');
const router = express.Router();
const StoreModel = require('../models/Store');

router.post('/', (req, res) => {
    const purchaseOrder = StoreModel.purchaseOrder(req.body);
    res.status(201).send({purchase: purchaseOrder});
})

router.get('/orders', (req, res) => {
    const orders = StoreModel.orders();
    res.send({orders: orders});
})

router.get('/orders/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const order = StoreModel.order(orderId);
    res.send({order: order});
})

router.get('/:productId', (req, res) => {
    const productId = req.params.productId;
    const product = StoreModel.product(productId);
    res.send({product : product});
})

router.get('/', (req, res) => {
    const products = StoreModel.products();
    res.send({products: products});
})

module.exports = router