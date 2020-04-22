module.exports.Query = {
    getItems: async (parent, args, context) => {
        const items = await context.dataSources.itemAPI.getAllItems();
        const ret = [];
        for(let i = 0; i < items.length; i++){
            ret.push({
                name: items[i].name,
                price: items[i].price,
                imgUrl: items[i].imgUrl,
            });
        }
        return ret;
    },
};
