const Category = require('../models/category');


module.exports = {

	newCat(req, res){
		res.render('settings/new', {title: 'Settings'});
	},
	async catPost(req, res){
		const category = new Category(req.body.category);
		await category.save();
		return res.redirect(`/categories/new`);
	}

}