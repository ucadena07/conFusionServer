const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate')

const Promos = require('../models/promotions');
const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.get((req, res, next) => {
  Promos.find({})
  .then((promos) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.json(promos);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
  Promos.create(req.body)
  .then((promos) => {
    console.log("Promotion Created", leader);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promos)
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put(authenticate.verifyUser,(req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported in promotions')
})
.delete(authenticate.verifyUser,(req, res, next) => {
  Promos.remove({})
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

promotionRouter.route('/:promoId')
  .get(function (req, res, next) {
      Promos.findById(req.params.promoId)
      .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported in promotions')
  })
  .put(authenticate.verifyUser,(req, res, next) => {
    Promos.findOneAndUpdate(req.params.leaderId, {
      $set: req.body
    }, {new: true})
    .then((promos) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promos);
    }, (err) => next(err))
    .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser,(req, res, next) => {
    Promos.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
  });


module.exports = promotionRouter;