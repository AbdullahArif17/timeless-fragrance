// schemas/product.ts
const product = {
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
		validation: (Rule: any) => Rule.required().positive(),
	  },
	  {
		name: 'productType',
		title: 'Product Type',
		type: 'string',
		options: {
		  list: [
			{ title: 'Eau de Parfum', value: 'eau-de-parfum' },
			{ title: 'Eau de Toilette', value: 'eau-de-toilette' },
			{ title: 'Perfume Oil', value: 'perfume-oil' },
		  ],
		},
		validation: (Rule: any) => Rule.required(),
	  },
	  {
		name: 'image',
		title: 'Image',
		type: 'image',
		options: {
		  hotspot: true,
		},
		validation: (Rule: any) => Rule.required(),
	  },
	  {
		name: 'description',
		title: 'Description',
		type: 'text',
		validation: (Rule: any) => Rule.max(500),
	  },
	],
  };
  
  export default product;