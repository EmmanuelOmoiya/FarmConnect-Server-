const Product = require('../model/productModel');

module.exports.getAllProducts = (req, res) => {
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	Product.find()
		.select(['-_id'])
		.limit(limit)
		.sort({ id: sort })
		.then((products) => {
			res.json(products);
		})
		.catch((err) => console.log(err));
};

module.exports.getProduct = (req, res) => {
	const id = req.params.id;

	Product.findOne({
		id,
	})
		.select(['-_id'])
		.then((product) => {
			res.json(product);
		})
		.catch((err) => console.log(err));
};

module.exports.getProductCategories = (req, res) => {
	Product.distinct('productCategory')
		.then((categories) => {
			res.json(categories);
		})
		.catch((err) => console.log(err));
};

module.exports.getProductFarms = (req, res) => {
    Product.distinct("farmName")
        .then((farms) => {
            res.json(farms)
        })
        .catch((err) => console.log(err))
}

module.exports.getProductLocation = (req, res) => {
    Product.distinct("productLocation")
        .then((locate) => {
            res.json(locate)
        })
        .catch((err) => console.log(err))
}

module.exports.getProductsInCategory = (req, res) => {
	const product = req.params.product;
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	Product.find({ productCategory : product})
        .then(foundProductInCategory => res.json(foundProductInCategory))
}		

module.exports.getProductsInFarms = (req, res) => {
	const farm = req.params.farm;
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;
    Product.find({ farmName : farm})
		.limit(limit)
        .then(foundProductInFarms => res.json(foundProductInFarms))
};

module.exports.getProductsInLocation = (req, res) => {
	const location = req.params.location;
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;
    Product.find({ productLocation : location})
		.limit(limit)
        .then(foundProductInFarms => res.json(foundProductInFarms))
};

module.exports.getProductInFarm = (req, res) => {
	const product = req.params.product;
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;
    Product.find({ _id : product})
		.limit(limit)
        .then(foundProductInFarms => res.json(foundProductInFarms))
};


module.exports.getProductsInCategory = (req, res) => {
	const category = req.params.category;
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	Product.find({
		category,
	})
		.select(['-_id'])
		.limit(limit)
		.sort({ id: sort })
		.then((products) => {
			res.json(products);
		})
		.catch((err) => console.log(err));
};

module.exports.getProductsByFarmer = (req, res) => {
	const farmer = req.params.farmer;
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	Product.find({
		farmer,
	})
		.select(['-_id'])
		.limit(limit)
		.sort({ id: sort })
		.then((products) => {
			res.json(products);
		})
		.catch((err) => console.log(err));
};


module.exports.addProduct = (req, res) => {
    const newProduct = new Product({
        productName : req.body.productName,
        productQuantity: req.body.productQuantity,
        productPrice: req.body.productPrice,
        productCategory: req.body.productCategory,
        productLocation: req.body.productLocation,
        productImg: req.body.productImg,
        farmName: req.body.farmName,
        farmerName: req.body.farmerName,
        farmerImg: req.body.farmerImg,
        description : req.body.description,
        id: req.body.id,
    });

    newProduct.save()
        .then(data =>{
           res.json(data)
        })
        .catch(error=>{
        res.json(error)
        })
};

module.exports.editProduct = (req, res) => {
	if (typeof req.body == undefined || req.params.id == null) {
		res.json({
			status: 'error',
			message: 'something went wrong! check your sent data',
		});
	} else {
		res.json({
			id: parseInt(req.params.id),
			title: req.body.title,
			price: req.body.price,
			description: req.body.description,
			image: req.body.image,
			category: req.body.category,
		});
	}
};

module.exports.deleteProduct = (req, res) => {
	if (req.params.id == null) {
		res.json({
			status: 'error',
			message: 'cart id should be provided',
		});
	} else {
		Product.findOne({
			id: req.params.id,
		})
			.select(['-_id'])
			.then((product) => {
				res.json(product);
			})
			.catch((err) => console.log(err));
	}
};