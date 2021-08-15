const { models } = require("mongoose");

module.exports = {
	newNote: async (parent, args, { models }) => {
		return await models.Note.create({
			content: args.content,
			author: 'Paul'
		});
	},
	
	deleteNote: async(parent, { id }, { models }) => {
		try {
			await models.Note.findOneAndRemove({_id: id});
		}	catch (err) {
			return false;
		}
		return true;
	},

	updateNote: async (parent, {content, id}, {models}) => {
		return await models.Note.findOneAndUpdate(
			{
				_id: id,
			},
			{
				$set: {
					content
				}
			},
			{
				new: true
			}
		);
	},

	deleteNotes: async() => {
		await models.Note.deleteMany({});
		return true;
	}

}