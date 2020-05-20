module.exports.Mutation = {
    postMutation: async(parent, args, context) => {
        for(let idx = 0; idx < args.selected.length; idx++)
            await context.dataSources.itemAPI.setMutation(args.selected[idx]);
        return true;
    }
}