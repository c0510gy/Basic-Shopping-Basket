module.exports.Mutation = {
    updateItems: async (parent, args, context) => {
        console.log(args.items);
        await context.dataSources.itemAPI.updateItems(args.items);
        return true;
    }
}