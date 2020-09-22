const Topic = require('../models/topic');
const Category = require('../models/category');
const { cloudinary } = require('../cloudinary');

module.exports = {
	async topicIndex(req, res, next){
		var catIdArray = [];
		var categs = await Category.find({},{_id:1});
		for(let categ of categs){
			catIdArray.push(categ._id);
		}
		//-------
		var topics = [];
		//We can sort on basis of different things for different values

		for(let id of catIdArray){
			debugger;
			const someTopics = await Topic.find( { "category" : { $in : id } } ).sort({'_id': -1}).populate({path:'category',model:'Category'}).limit(4);
		
			
			for(let topic of someTopics){
				topics.push(topic);
			}
		}
		
		 
		//Doing all this to only return fixed no of objs in the array so that in the front-end
		//It won't have to iterate over thousands and thousands of docs each time.
		res.render('topics/index', { 
			topics, 
			title: 'All Topics' 
		});
	},


	async topicCatAll(req, res){

		//pass the dbQuery instead of {}

		let topics = await Topic.paginate({}, {
			page: req.query.page || 1,
			limit: 12,
			sort: '-_id',
			populate: {
					path:'category',
					model:'Category'
				}
		});

		
		topics.page = Number(topics.page);
		res.render('topics/index', { 
			topics, 
			title: "Category's All Topics" 
		});		
	},

	async topicNew(req, res){
		res.render('topics/new', {title: 'Create Topic'});
	},

	async topicCreate(req, res){

	if((req.body.topic.title.length<=35) && (req.body.topic.tagline.length<=55)){
		//ajax is doing some things to that array that's why need to do this stuff
		//converting array to contain unique elements
		//single element should not be converted to single letters so
		//only array should be converted to letters
		if(Array.isArray(req.body.tags)){
			var uniqueArr = [];

			for(i=0; i < req.body.tags.length; i++){
				if(uniqueArr.indexOf(req.body.tags[i]) === -1) {
					uniqueArr.push(req.body.tags[i]);
				}
			}
			req.body.tags = uniqueArr;
			//creating array elements where it encounters 
			req.body.tags = req.body.tags[0].split(",");
		}

		req.body.topic.logo = [];
		for(const file of req.files) {  //images are in req.files
			req.body.topic.logo.push({
				url: file.secure_url,
				public_id: file.public_id
			});
		}
		req.body.topic.category = req.body.topic.category.toLowerCase();
		const categ = await Category.findOne({'title': req.body.topic.category});
								//findOne is imp for it to give an object
		req.body.topic.category = categ._id;
		req.body.topic.category.title = categ.title;
		debugger;

		//putting tags in topic.tags
		req.body.topic.tags = req.body.tags;

		req.body.topic.owner = req.user._id;
		let topic = new Topic(req.body.topic);
		await topic.save();
		req.session.success = 'Topic created successfully!';
	   	return res.send({redirect:`/topics/${topic._id}`});
		//when post is created of course it will have /POST
		//for sharepost route is different
	}else {
		req.session.error = 'Plz do not exceed the characters length';
		res.redirect('back');
	}
				
	},

	async topicShow(req, res){
		var topic = await Topic.findById(req.params.id);
		if(req.creator === true){
			res.render('topics/manageTopic', {topic});
		}else if(req.creator === false){
			//Otherwise redirect to that route of /topics/:id/posts
		}else{//for some reason
			req.session.error = 'U cannot go to this page'
			res.redirect('back');
		}

	},

	async topicEdit(req, res){

	},
	
	async topicUpdate(req, res){

	},

	async topicDestroy(req, res){

	},

}