module.exports.Query = {
    getItems: async (parent, args, context) => {
        const items = await context.dataSources.itemAPI.getAllItems();
        const selected = await context.dataSources.itemAPI.getSelected(args.token);

        const ret = [];
        for(let i = 0; i < items.length; i++){
            ret.push({
                name: items[i].name,
                price: items[i].price,
                imgUrl: items[i].imgUrl,
                selected: selected[i],
            });
        }
        return ret;
    },
};
