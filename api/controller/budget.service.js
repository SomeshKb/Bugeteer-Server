const config = require('config.json');
const db = require('_helpers/db');
const Budget = db.Item;
const User = db.User;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    addBudgetToUser,
    updateBudgetSettle
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
    return await budget.save();
   
}

async function addBudgetToUser(id,buyer) {
   return await User.updateOne({
        _id: buyer
    }, {
        $addToSet: {
            budgetBuyer: id
        }
    })
}


async function update(id, itemParam) {
    const budget = await Budget.findById(id);
    // validate
    if (!budget) throw 'Budget not found';
    // copy itemParam properties to item
    Object.assign(budget, itemParam);
    await budget.save();
}


async function updateBudgetSettle(id){
    const budget = await Budget.findById(id);
    // validate
    if (!budget) throw 'Budget not found';
    // copy itemParam properties to item
    await budget.update({_id:id},{$set:{hasSettled:true}});
}

async function _delete(id) {
    await Budget.findByIdAndRemove(id);
}