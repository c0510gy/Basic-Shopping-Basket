const Sequelize = require('sequelize');

const createStore = (force=false) => {
    let sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.sqlite',
    });

    sequelize.authenticate().then(() => {
        console.log('Connection to the database has been established successfully');
    }).catch((err) => {
        console.error(`Unable to connect to the database: ${err}`);
    });

    const Model = Sequelize.Model;

    class Items extends Model {}
    class Users extends Model {}
    class Selection extends Model {}

    Items.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.TEXT,
        price: Sequelize.INTEGER,
        imgUrl: Sequelize.TEXT,
    },
    {
        sequelize,
        modelName: 'Items',
    });

    Users.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.TEXT,
        userID: Sequelize.TEXT,
        password: Sequelize.TEXT,
        token: Sequelize.TEXT,
    },
    {
        sequelize,
        modelName: 'Users',
    });

    Selection.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userID: Sequelize.TEXT,
        itemID: Sequelize.INTEGER,
        selected: Sequelize.INTEGER,
    },
    {
        sequelize,
        modelName: 'Selection',
    });

    sequelize.sync({force: force});

    return {
        Items,
        Users,
        Selection,
        sequelize,
    };
};

module.exports = {
    createStore,
};
