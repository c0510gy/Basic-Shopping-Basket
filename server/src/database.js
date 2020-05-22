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

    Items.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.TEXT,
        price: Sequelize.INTEGER,
        imgUrl: Sequelize.TEXT,
        select: Sequelize.INTEGER,
    },
    {
        sequelize,
        modelName: 'Items',
    });

    sequelize.sync({force: force});

    return {
        Items,
        sequelize,
    };
};

module.exports = {
    createStore,
};
