module.exports = {
	note: async (parent, args, { models }) => {
		return await models.Nodte.findById(args.id)
	},
	notes: async (parent, args, { models }) => {
		return await models.Note.find();
	}
}