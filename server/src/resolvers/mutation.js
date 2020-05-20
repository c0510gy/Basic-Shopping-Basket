module.exports.Mutation = {
    updateSelected: async (parent, args, context) => {
        for (let i = 0; i < args.selected.length; i++) {
            await context.dataSources.itemAPI.setSelected(i+1, args.selected[i]);
        }
        return true;
    },
};