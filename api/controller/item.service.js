const config = require('config.json');
const db = require('_helpers/db');
const Item = db.Item;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Item.find();
}

async function getById(id) {
    return await Item.findById(id);
}

async function create(itemParam) {
    const item = new Item(itemParam);
    // save item
    await item.save();
}

async function update(id, itemParam) {
    const item = await Item.findById(id);

    // validate
    if (!item) throw 'Item not found';

    // copy itemParam properties to item
    Object.assign(item, itemParam);

    await item.save();
}

async function _delete(id) {
    await Item.findByIdAndRemove(id);
}