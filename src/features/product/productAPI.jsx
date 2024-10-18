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
  
export async function fetchProductsByFilters(filter) {
    let queryString = '?';
    for(let key in filter){
      queryString += `${key}=${filter[key]}&`
    }
    console.log('queryString',queryString);
    try {
        const response = await axios.get('http://localhost:8080/products'+queryString);

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
