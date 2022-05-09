
exports.Query = {
    hello: () =>  "World!",
    products: (parent, {filter}, {db}) => {
      let filterProducts = db.products;
    
      if(filter){
        const {onSale, avgRating} = filter;
        if(onSale === true){
          filterProducts = filterProducts.filter((product) => {
            return product.onSale;
          });
        }

        if([1,2,3,4,5].includes(avgRating)){
          filterProducts = filterProducts.filter((product) => {
            let sumRating = 0;
            let numOfReviews =0;
            db.reviews.forEach(review => {
              if(review.productId === product.id){
                sumRating += review.rating;
                numOfReviews++;
              } 
            });
            const avgProductRating = sumRating/numOfReviews;

            return avgProductRating >= avgRating;
          });
        }
      }
      return filterProducts;
    },
    product: (parent, args, {db}) =>{
      const  productId = args.id;
      const product = db.products.find((product) => product.id === productId);
      if(!product) return null;
      return product;
    },
    categories: (parent, args, {db}) => db.categories,
    category: (parent, args, {db}) => {
        const {id} = args;
        return db.categories.find((category) => category.id === id);
    },
}


