import { userActivities } from "./data.js"

console.log("In the harbor, boats are safe; but they were built for voyages.")

for (let category of userActivities) {
    console.log("Category:", category.categoryName);
  
    for (let activityType of category.activityTypes) {
      console.log("  Activity Type:", activityType.activityName);
  
      for (let task of activityType.Tasks) {
        console.log("    Task Name:", task.taskName);
      }
    }
  }