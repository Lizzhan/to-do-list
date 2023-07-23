class List{
    constructor(name){
        this.name = name;
        this.tasks = [];
    }

    get showList(){
        this.tasks.forEach((task)=>{
            console.log(task);
        })
    }

    get fullList(){
        return this.tasks;
    }

    get listName(){
        return this.name;
    }

    addTask(task){
        this.tasks.push(task);
    }
    
    deleteTask(task){
        this.tasks = this.tasks.filter(item => item !== task);
    }

}

export default List;