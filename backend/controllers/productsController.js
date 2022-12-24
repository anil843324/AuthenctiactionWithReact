import Product  from  '../models/Product.js';

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;

  const queryObj = {};

  if (company) {
    queryObj.company = company;
  }
  if (featured) {
    //key      value
    queryObj.featured = featured;
  }

  if (name) {
    queryObj.name = { $regex: name, $options: 'i' };
  }
  // sorting

  let apiData = Product.find(queryObj);

  if (sort) {
    let sortFix = sort.split(',').join(' ');

    apiData = apiData.sort(sortFix);
  }
// select
  if (select) {
    let selectFix = select.split(',').join(' ');

    apiData = apiData.select(selectFix);
  }

  // console.log(queryObj)
  //pagination

   let page= Number(req.query.page)||1
   let limitt= Number(req.query.limit) || 10
   
   
   let skipp=(page-1)*limitt;

   apiData = apiData.skip(skipp).limit(limitt);

 const totalItems=await Product.find();

  const product = await apiData;

  res.status(201).json({
    success: true,
    totalItems: totalItems.length,
    totalPerPage:product.length,
    product,
  });
};

export {getAllProducts} 