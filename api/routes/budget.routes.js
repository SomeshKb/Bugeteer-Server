const express = require('express');
const router = express.Router();
const budgetService = require('../controller/budget.service');

// budget routes

router.get('/all', getAll);
router.get('/:id', getById);
router.post('/add', insertItem)
router.put('/:id', update);
router.put('/settled/:id',hasSettled);
router.delete('/:id', _delete);

module.exports = router;


function getAll(req, res, next) {
    budgetService.getAll()
        .then(budgets => res.json(budgets))
        .catch(err => next(err));
}

function insertItem(req, res, next) {
    budgetService.create(req.body)
        .then(budgets => {
            budgetService.addBudgetToUser(budgets._id, budgets.buyer).then(result => {
                res.send(result);
            }).catch(err =>
                next(err)
            );
        })
        .catch(err =>
            next(err)
        );
}

function getById(req, res, next) {
    budgetService.getById(req.params.id)
        .then(budget => budget ? res.json(budget) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    budgetService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}


function hasSettled(req, res, next) {
    budgetService.updateBudgetSettle(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}


function _delete(req, res, next) {
    budgetService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}