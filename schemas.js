const Joi = require("joi"); //used for validations
const { number } = require("joi");
const review = require("./models/review");

module.exports.campgroundSchema = Joi.object({
	campground: Joi.object({
		title: Joi.string().required(),
		// image: Joi.string().required(),
		price: Joi.number().required().min(0),
		description: Joi.string().required(),
		location: Joi.string().required(),
	}).required(),
	deleteImages: Joi.array().items(Joi.string()).optional() // Validate deleteImages as an optional array of strings
});

module.exports.reviewSchema = Joi.object({
	rating: Joi.number().required().min(1).max(5),
	body: Joi.string().required(),
}).required();
