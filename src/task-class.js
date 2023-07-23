class Task{

    constructor(name){
        this.name = name;
        this.todos = [];
        this.priority = false;
    }

    set setName(name){
        this.name = name;
    }

    setTaskAsPriority(){
        this.priority = true;
    }

    get getToDos(){
        return this.todos;
    }

    get taskName(){
        return this.name;
    }
    get taskOverview(){
        console.log(this.todos);
    }

    addToDos(toDo){
        this.todos.push(toDo);
    }

}

export default Task ;