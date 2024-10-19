


import axios from "axios";
export async function fetchAllProducts() {

    try {
        const response = await axios.get('http://localhost:8080/products');

        // Check if the response is ok (status code 200-299)
        if (!response) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const {data} = await response;
        return  data ;  // Simply return the data object
    } catch (error) {
        console.log("Error fetching count:", error);
        throw error;  // Re-throw to propagate the error
    }
}
  
export async function fetchProductsByFilters(filter,sort) {
    
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}

  // TODO : on server we will support multi values in filter
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }


    try {
        const response = await axios.get('http://localhost:8080/products?'+queryString);

        // Check if the response is ok (status code 200-299)
        if (!response) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const {data} = await response;
        return  data ;  // Simply return the data object
    } catch (error) {
        console.log("Error fetching count:", error);
        throw error;  // Re-throw to propagate the error
    }
}
