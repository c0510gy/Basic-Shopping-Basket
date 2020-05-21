module.exports.Mutation = {
    updateItems: async (parent, args, context) => {
        await context.dataSources.itemAPI.updateItems(args.items);
        return true;
    }
}