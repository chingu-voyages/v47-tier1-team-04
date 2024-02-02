import app, {Task, View} from "./script.js";

export default class Controller{
    init(title) {
        app.view.init(title);
    }

    returnUniqueGroupNames() {
        return [...new Set(app.tasks.map(task => task.group))];
    }
    returnUniqueCategoryNames() {
        return [...new Set(app.tasks.map(task => task.category))]; 
    }
    returnUniqueCategoriesByGroup(group) {
        const categories = this.returnCategoryByGroup(group) 
        return [...new Set(categories.map(task => task.category))]; 
    }
    returnCategoryByGroup(group) {
        return app.tasks.filter(task => task.group === group);
    }
}