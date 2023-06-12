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

    get listName(){
        return this.name;
    }

    addTask(task){
        this.tasks.push(task);
    }
    
    deleteTask(task){
        this.tasks = this.tasks.filter(item => item !== task);
    }
    
    setTaskAsPriority(){

    }
}

let taskList = new List('tasklist');

class Task{

    constructor(name){
        this.name = name;
        this.todos = [];
    }

    set taskName(name){
        this.name = name;
    }

    get taskOverview(){
        console.log(this.todos);
    }

    addToDos(toDo){
        this.todos.push(toDo);
    }

}


const displayGeneral = document.querySelector('.display-general');
const listDisplay = document.querySelector('.display-list');
const taskDisplay = document.querySelector('.display-task');
const newButton = document.querySelector('#new-button');
const newTask = document.querySelector('#new-task');
const newTaskInput = document.querySelector('#new-task-input');
const addNewTaskButton = document.querySelector('#add-new-task');
const listShowCase = document.querySelector('#list-showcase');

function showNewTaskInput(){
    newButton.addEventListener('click',()=>newTask.setAttribute('style','display:contents'));
}

function hideInput(){
    newTask.setAttribute('style','display:none');
}

//Create indivisual Task objects and add them to the List object
let placeholder = "";

function deleteElementByClass(className){
    const elements = document.querySelector(className);
    while(elements.length>0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function addNewTask(){
    addNewTaskButton.addEventListener('click',(e)=>{
        e.preventDefault();
        placeholder = newTaskInput.value;

        if(placeholder === ""){
            window.alert("Task Name Cannot be Empty");
            return;
        }

        const task = new Task(placeholder);
        taskList.addTask(task);

        const editButton = document.createElement('button');
        editButton.classList.add('list-edit-button');
        editButton.textContent = "Edit";
    
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('list-delete-button');
        deleteButton.textContent = "Delete";
    
        const reUsableTaskContainer = document.createElement('p');
        reUsableTaskContainer.classList.add('each-task');
        reUsableTaskContainer.textContent = placeholder;
        
        const taskShowCase = document.createElement('div');
        listShowCase.appendChild(taskShowCase);

        taskShowCase.appendChild(reUsableTaskContainer);
        taskShowCase.appendChild(editButton);
        taskShowCase.appendChild(deleteButton);

        deleteButton.addEventListener('click', ()=>{
            taskList.deleteTask(task);
            taskList.showList
            listShowCase.removeChild(taskShowCase);

        }
        )

        hideInput();

        console.log(`${placeholder} added`);
        taskList.showList;

        newTaskInput.value = '';
        placeholder = '';
        
    })
}

function displayTaskDetails(){

}

showNewTaskInput();
addNewTask();


