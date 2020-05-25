module.exports.Mutation = {
    signup: async (parent, args, context) => {
        return await context.dataSources.itemAPI.createNewUser(args.name, args.userID, args.password);
    },
    login: async (parent, args, context) => {
        const result = await context.dataSources.itemAPI.userLogin(args.userID, args.password);
        if(result == false) return '';
        return result;
    },
    logout: async (parent, args, context) => {
        return await context.dataSources.itemAPI.userLogout(args.token);
    },
    save: async (parent, args, context) => {
        return await context.dataSources.itemAPI.updateSelected(args.token, args.selected);
    },
};