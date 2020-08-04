module.exports.Mutation = {
    setItems: async (parent, args, context) => {
        return await context.dataSources.itemAPI.setAllItems(args.selectedInfo);
    },
};
