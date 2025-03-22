export const fetchBooks = async (queryParams: string = "") => {
    try {
      const response = await fetch(`http://localhost:4000/api/books${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
  
      return await response.json(); // Return the events data
    } catch (error) {
      console.error("Error fetching events:", error);
      return []; // Return empty array if fetch fails
    }
  };