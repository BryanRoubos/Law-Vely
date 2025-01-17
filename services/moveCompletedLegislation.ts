import { db } from "../firebase";

export const moveCompletedLegislation = async () => {
  try {
    const snapshot = await db.ref("categories").once("value");
    const categories = snapshot.val();

    if (!categories) {
      console.log("No categories found.");
      return;
    }

    for (const id in categories) {
      const legislation = categories[id];

      if (legislation.status === "completed") {
        await db.ref(`legislationSummaries/${id}`).set({
          ...legislation,
          updatedAt: Date.now(),
        });

        await db.ref(`categories/${id}`).remove();
        console.log(
          `Moved legislation to legislationSummaries: ${legislation.title}`
        );
      }
    }
  } catch (error) {
    console.error("Error moving completed legislation:", error);
  }
};

moveCompletedLegislation();
