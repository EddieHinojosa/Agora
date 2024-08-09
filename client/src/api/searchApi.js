import axios from "axios";
 
export const searchProducts = async (searchQuery) => {
    try {
        const response = await axios.get('/search', {
            params: { query: searchQuery },
        })
        console.log('Search Success!');
        return response.data;
    } catch (error) {
        console.error('Search failed', error)
        throw error;
    }
}