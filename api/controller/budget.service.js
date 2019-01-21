const config = require('config.json');
const db = require('_helpers/db');
const Budget = db.Item;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Budget.find();
}

async function getById(id) {
    return await Budget.findById(id);
}

async function create(itemParam) {
    const budget = new Budget(itemParam);
    // save item
    await budget.save();
}

async function update(id, itemParam) {
    const budget = await Budget.findById(id);
    // validate
    if (!budget) throw 'Budget not found';
    // copy itemParam properties to item
    Object.assign(budget, itemParam);
    await budget.save();
}

async function _delete(id) {
    await Budget.findByIdAndRemove(id);
}