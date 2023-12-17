export function fetchAllProducts() {
  return new Promise( async(resolve) =>{
  const response = await fetch('http://localhost:8080/products')
   const data = await  response.json() 
   resolve({data}) 
});
}


export function fetchProductsByFilter(filter, sort, pagination) {
  // filter = {"category:["smartphone", "laptops"]}
  // sort = {_sort:"price", _order:"desc"}
  // pagination = {_page:1, _limit:10}
  let queryString = ''
  for(let key in filter){
    const CategoryValues = filter[key]
    if(CategoryValues.length){
      const lastCategoryValue = CategoryValues[CategoryValues.length -1]
     queryString += `${key}=${lastCategoryValue}&`
    }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise( async(resolve) =>{
    console.log(queryString)
  const response = await fetch('http://localhost:8080/products?'+queryString)
   const data = await  response.json() 
   const totalItems = await response.headers.get('X-Total-Count')
   resolve({data:{products:data, totalItems: +totalItems}}) 
});
}
