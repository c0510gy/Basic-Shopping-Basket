const {DataSource} = require('apollo-datasource');
const Sequelize = require('sequelize');
const {isUndefinedOrNull} = require('../utils');

const itemsAttributes = [
    'id',
    'name',
    'price',
    'imgUrl',
    'select',
];

class ItemAPI extends DataSource {
    constructor(store) {
        super();
        this.store = store;
    }

    initialize(config) {
        this.context = config.context;
    }

    async getAttributeOfItem(attributeName, id) {
        if (id === undefined || id === null) {
            throw new Error('idIsNotPassedMessage');
        }
        if (!itemsAttributes.includes(attributeName)) {
            throw new Error('attributeNameIsNotValidMessage');
        }
        const item = await this.store.Items.findOne({
            where: {id: id},
            attributes: [attributeName],
            raw: true,
        });
        return (item && isUndefinedOrNull(item[attributeName])) ?
            item[attributeName] : null;
    }

    async getAllItems() {
        const items = await this.store.Items.findAll();
        const ret = [];
        for(let i = 0; i < items.length; i++){
            ret.push(items[i].dataValues);
        }
        return ret;
    }

    async setMutation(select, id) {
        await this.store.Items.update({select: select}, {where: {id: id+1}});
    }
}

module.exports={
    ItemAPI,
};
