module.exports.Mutation = {
    postMutation: async (parent, args, context) => {
        for(let id = 0; id < args.selected.length; id++)
            await context.dataSources.itemAPI.setMutation(args.selected[id], id);
        return true;
    }
}