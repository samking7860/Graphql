
exports.Category= {
    //getting the id of parent and renaming it to categoryId.
    products: ({id: categoryId}, {filter}, {db}) => {    
        const categoryProducts = db.products.filter((product) => product.categoryId === categoryId)
        let filterCategoryProducts = categoryProducts;

        if(filter){
            const {onSale, avgRating} = filter;
            if(onSale === true){
            filterCategoryProducts = filterCategoryProducts.filter((product) => {
                return product.onSale;
            });
            }
            
            if([1,2,3,4,5].includes(avgRating)){
                filterCategoryProducts = filterCategoryProducts.filter((product) => {
                  let sumRating = 0;
                  let numOfReviews =0;
                  reviews.forEach(review => {
                    if(review.productId === product.id){
                      sumRating += review.rating;
                      numOfReviews++;
                    } 
                  });
                  const avgProductRating = sumRating/numOfReviews;
                  console.log(sumRating,avgProductRating)
                  return avgProductRating >= avgRating;
                });
              }
            }
        return filterCategoryProducts;
    },
};