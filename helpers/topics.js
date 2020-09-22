const Topic  = require('../models/topic');

module.exports = {
	async isTopicCreator(req, res, next){
		const topic = await Topic.findById(req.params.id);

		if(req.user._id === topic.owner._id){
			req.creator = true;
			next();
		}else{
			req.creator = false;
			next();
		}		
	}
}