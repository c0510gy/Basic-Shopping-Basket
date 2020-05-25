const {DataSource} = require('apollo-datasource');
const Sequelize = require('sequelize');
const {isUndefinedOrNull} = require('../utils');
const jwt = require('jsonwebtoken');

const itemsAttributes = [
    'id',
    'name',
    'price',
    'imgUrl',
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

    async getSelected(token) {
        const user = await this.store.Users.findOne({
            where: {token: token},
        });

        const userID = await user.dataValues.userID;
        const select = await this.store.Selection.findAll({
            where: {userID: userID},
        });

        const ret = [];
        const items = await this.store.Items.findAll();
        for(let i=0; i < items.length; i++) ret.push(0);
        for(let i=0; i < items.length; i++) {
            ret[select[i].dataValues.itemID - 1] = select[i].dataValues.selected;
        }

        return ret;
    }

    async createNewUser(name, userID, password) {
        if(name=='' || userID=='' || password=='') return false;
        else if(await this.store.Users.findOne({where: {userID: userID}}) != null) return false;
        const newUser = {
            name: name,
            userID: userID,
            password: password,
            token: '',
        };
        await this.store.Users.create(newUser);

        const items = await this.store.Items.findAll();
        for(let i=0; i<items.length; i++) {
            const newSelect = {
                userID: userID,
                itemID: items[i].dataValues.id,
                selected: 0,
            }
            await this.store.Selection.create(newSelect);
        }

        return true;
    }

    async userLogin(userID, password) {
        const user = await this.store.Users.findOne({
            where: {userID: userID},
        });
        if(user == null) return false;
        else if(user.password != password) return false;
        else if(user.token != '') return false;

        const token = jwt.sign({sub: 'antifly_admin'}, 'beemil');
        console.log(token);
        await this.store.Users.update({token: token}, {where: {userID: userID}});
        return token;
    }

    async userLogout(token) {
        if(token == '') return false;
        else if(await this.store.Users.findOne({where: {token: token}}) == null) return false;
        await this.store.Users.update({token: ''}, {where: {token: token}});
        return true;
    }

    async updateSelected(token, selected) {
        const user = await this.store.Users.findOne({
            where: {token: token},
        });

        const userID = user.dataValues.userID;
        const items = await this.store.Items.findAll();
        for(let i=1; i<=items.length; i++){
            await this.store.Selection.update({selected: selected[i-1]}, {where: {userID: userID, itemID: i}});
        }

        return true;
    }

}

module.exports={
    ItemAPI,
};
