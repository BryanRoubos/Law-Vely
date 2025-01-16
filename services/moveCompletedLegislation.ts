import { db } from "../firebase";

export const moveCompletedLegislation = async () => {
    try {
      // Query the `categories` path
      const snapshot = await db.ref("categories").once("value");
      const categories = snapshot.val();
  
      if (!categories) {
        console.log("No categories found.");
        return;
      }
      // Loop through each entry in `categories`
      for (const id in categories) {
        const legislation = categories[id];
  
        // Check if the status is "completed"
        if (legislation.status === "completed") {
          // Move to `legislationSummaries`
          await db.ref(`legislationSummaries/${id}`).set({
            ...legislation,
            updatedAt: Date.now(), // Add an updated timestamp
          });
  
          // Remove from `categories`
          await db.ref(`categories/${id}`).remove();
          console.log(`Moved legislation to legislationSummaries: ${legislation.title}`);
        }
      }
    } catch (error) {
      console.error("Error moving completed legislation:", error);
    }
  };


  moveCompletedLegislation();
