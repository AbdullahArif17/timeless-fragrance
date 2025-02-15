export default {
	name: 'product',
	title: 'Product',
	type: 'document',
	fields: [
	  {
		name: 'name',
		title: 'Name',
		type: 'string',
		validation: (Rule: any) => Rule.required(),
	  },
	  {
		name: 'slug',
		title: 'Slug',
		type: 'slug',
		options: {
		  source: 'name',
		  maxLength: 96,
		},
		validation: (Rule: any) => Rule.required(),
	  },
	  {
		name: 'price',
		title: 'Price',
		type: 'number',
		validation: (Rule: any) => Rule.required().min(0),
	  },
	  {
		name: 'description',
		title: 'Description',
		type: 'text',
	  },
	  {
		name: 'images',
		title: 'Images',
		type: 'array',
		of: [{ type: 'image' }],
		validation: (Rule: any) => Rule.required().min(1),
	  },
	],
  };