export interface Product {
	_id: string;
	_createdAt: string;
	name: string;
	slug: {
	  current: string;
	};
	price: number;
	image: {
	  asset: {
		_ref: string;
		_type: string;
	  };
	};
	description?: string;
  }
  