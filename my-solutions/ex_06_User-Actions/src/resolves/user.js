module.exports = {
	notes: async (user, args, { models }) => {
		return await models.Note.find( { author: _id}).sort({id: -1});
	},
	favorites: async (user, args, {models }) => {
		return await models.Note.find({ favoritedBy: user._id}).sort({_id: -1});
	},
}