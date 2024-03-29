import List from "./list-class";
import Task from "./task-class";
import {    displayGeneral,
    listDisplay,
    priorityDisplay,
    taskDisplay,
    newButton,
    newTask,
    newTaskInput,
    addNewTaskButton,
    listShowCase,
    resetButton,
    } from "./dom";
    

let taskList = new List('tasklist');

// to run on local server: http-server -c-1 from main directory
// choose directory containing the html file you want to test

let placeholder = "";
let indexInList = '';
let isSelected = false;

function showNewTaskInput(){
    newButton.addEventListener('click',()=>{
        resetTaskDisplay();
        newTask.setAttribute('style','display:contents')});

}

function initializeResetButton(){
    resetButton.addEventListener('click',()=>{
        resetTaskDisplay();
        if(isSelected===true){
        removeSelectedClass();
        }
    }
    )
}

function addNewTask(){
    addNewTaskButton.addEventListener('click',(e)=>{
        e.preventDefault();
        placeholder = newTaskInput.value;

        if(placeholder === ""){
            window.alert("Task Name Cannot be Empty");
            return;
        }

        const newTask = new Task(placeholder);
        newTask.addToDos("DefaultTest1");
        taskList.addTask(newTask);
        setStorage();

        generateListButtons(newTask);
        hideInput();

        console.log(`${placeholder} added`);

        newTaskInput.value = '';
        placeholder = '';
        
    })
}

function updateDisplay(tasks){
    tasks.forEach((task)=>{
        generateListButtons(task);
    });
}

function generateListButtons(task){
    const editButton = document.createElement('button');
    editButton.classList.add('list-edit-button');
    editButton.classList.add('list-buttons');
    editButton.textContent = "Edit";

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('list-delete-button');
    deleteButton.classList.add('list-buttons');
    deleteButton.textContent = "Delete";

    const confirmButton = document.createElement('button');
    confirmButton.textContent = "confirm"; 
    confirmButton.classList.add('confirm-button');
    confirmButton.classList.add('list-buttons');

    const setPriority = document.createElement('button');
    setPriority.classList.add('set-priority');
    setPriority.classList.add('list-buttons');
    setPriority.textContent = "Set as Priority";

    const displayButton = document.createElement('button');
    displayButton.classList.add('display-todos');
    displayButton.classList.add('list-buttons');
    displayButton.textContent = "Show Details";

    const reUsableTaskContainer = document.createElement('p');
    reUsableTaskContainer.classList.add('each-task');
    reUsableTaskContainer.textContent = task.name;

    const taskTitle = document.createElement('div');
    taskTitle.classList.add('task-title');
    
    const taskShowCase = document.createElement('div');
    taskShowCase.classList.add("task-showcase");

    const listButtons = document.createElement('div');
    listButtons.classList.add('list-buttons-div');

    taskTitle.appendChild(reUsableTaskContainer);
    taskTitle.appendChild(confirmButton);
    taskShowCase.appendChild(taskTitle);
    taskShowCase.appendChild(listButtons);
    listShowCase.appendChild(taskShowCase);

    let list = taskList.tasks;

    reUsableTaskContainer.addEventListener('click',()=>{
        resetTaskDisplay();
        if(isSelected){
        removeSelectedClass();
        };
        isSelected = true;
        reUsableTaskContainer.classList.add('selected');
        getIndexOfSelectedClass();
        console.log(indexInList);
        listButtons.appendChild(editButton);
        listButtons.appendChild(deleteButton);     
        listButtons.appendChild(setPriority);
        listButtons.appendChild(displayButton);
    })

    displayButton.addEventListener('click',()=>{
        getIndexOfSelectedClass();
        console.log(indexInList);
        removeSelectedClass();
        resetTaskDisplay();
        generateAllTaskDisplay(list[indexInList]);   

    })

    setPriority.addEventListener('click',()=>{
        getIndexOfSelectedClass();
        list[indexInList].setTaskAsPriority();
        reUsableTaskContainer.classList.add('priority');
        setStorage();

    }
    );

    editButton.addEventListener('click', ()=>{
        reUsableTaskContainer.setAttribute('contenteditable','true');
        // confirmButton.setAttribute('style','display:contents');
        confirmButton.classList.remove('confirm-button-hide');
        confirmButton.classList.add('confirm-button-display');
        });

    confirmButton.addEventListener('click',()=>{
        resetTodoDisplay();
        confirmButton.classList.remove('confirm-button-display');
        confirmButton.classList.add('confirm-button-hide');
        list[indexInList].setName = reUsableTaskContainer.textContent;
        generateAllTaskDisplay(list[indexInList]);
        reUsableTaskContainer.setAttribute('contenteditable','false');
        setStorage();

    })
    
    deleteButton.addEventListener('click', ()=>{
        let task = list[indexInList];
        taskList.deleteTask(task);
        taskList.showList
        listShowCase.removeChild(taskShowCase);
        resetTaskDisplay();
        setStorage()
        }
    )
}

function generateAllTaskDisplay(task){
    const addButton = document.createElement('button');
    addButton.classList.add('add-button');
    addButton.textContent = "Add Todos";

    const todoForm = document.createElement('form');
    todoForm.classList.add("todo-form");

    const newInput = document.createElement('input');    
    newInput.classList.add('add-todo');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder','Enter New Todos');

    const submitTodoBtn = document.createElement('button');
    submitTodoBtn.setAttribute('id','submit');
    submitTodoBtn.textContent = "Enter";


    taskDisplay.appendChild(addButton);    
    taskDisplay.appendChild(todoForm);
    todoForm.appendChild(newInput);
    todoForm.appendChild(submitTodoBtn);

    displayEachTaskDetail(task);


    submitTodoBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        task.todos.push(newInput.value);
        deleteElementByClass('todos');
        todoForm.setAttribute('style','display:none');
        newInput.value = "";
        setStorage();
        displayEachTaskDetail(task);
    })
    
    addButton.addEventListener('click',()=>{
      todoForm.setAttribute('style', 'display:contents');
    })

}


function getIndexOfSelectedClass(){ 
    let list = taskList.tasks;
    let selected = document.querySelector(".selected").textContent;
        for(let i=0;i<list.length;i++){
        if(list[i].name === selected){
            indexInList = i;
            console.log("index found")
            break;
        }
    }
}




function displayEachTaskDetail(task){
    let todos = task.todos;

    for(let i = 0; i < todos.length; i++){
        const container = document.createElement('div');
        container.classList.add('todos');

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.setAttribute('style','display:none');

        const content = document.createElement('ul');
        content.classList.add('each-todo')
        content.textContent = todos[i];
        
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.classList.add('todo-buttons');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.classList.add('todo-buttons');

        const confirmChangeButton = document.createElement('button');
        confirmChangeButton.classList.add('confirm-button');
        confirmChangeButton.textContent = "confirm";

        taskDisplay.appendChild(container);
        container.appendChild(content);
        container.appendChild(buttonContainer);
        buttonContainer.appendChild(confirmChangeButton);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        content.addEventListener('click',()=>{
            buttonContainer.setAttribute('style','display:contents');
        });

        editButton.addEventListener('click',()=>{
            content.setAttribute('contenteditable','true');
            confirmChangeButton.classList.add('confirm-button-display');

        });

        confirmChangeButton.addEventListener('click',()=>{
            todos[i] = content.textContent;
            confirmChangeButton.classList.remove('confirm-button-display');
            confirmChangeButton.classList.add('confirm-button-hide');
            setStorage();

        })

        deleteButton.addEventListener('click',()=>{
            todos.splice(i,1);
            taskDisplay.removeChild(container);
            setStorage();
        })
    }
}

//utility functions
function isListEmpty(){
    if(taskList.showList===""){
        return true;
    }else{
        return false;
    }
}

function deleteElementByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length>0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function resetTodoDisplay(){
    deleteElementByClass('todos');
    deleteElementByClass('todo-form');
}

function resetTaskDisplay(){
    deleteElementByClass('todos');
    deleteElementByClass('todo-form');
    deleteElementByClass('add-button');
    deleteElementByClass('list-edit-button');
    deleteElementByClass('list-delete-button'); 
    deleteElementByClass('set-priority');
    deleteElementByClass('display-todos');
}

function hideInput(){
    newTask.setAttribute('style','display:none');
}

function removeSelectedClass(){
    const element = document.querySelector(".selected");
    element.classList.remove('selected');
    isSelected = false;
}

function setStorage(){
    localStorage.clear();
    console.log(taskList.tasks);
    const toString = JSON.stringify(taskList);
    localStorage.setItem('list', toString);
    console.log(toString);
}

function getStorage(){
    // const listIsEmpty = isListEmpty;
    // console.log(listIsEmpty);
    // if(listIsEmpty){
    //     return;
    // }
    const toString = localStorage.getItem('list');
    taskList = Object.assign(
        new List(),
        JSON.parse(toString)
        );

    console.log(taskList.tasks);
    taskList.tasks.forEach((task)=>{
        console.log("Task Name is: " + task.name);
        console.log("Todos: " + task.todos);
    });
}

getStorage();
updateDisplay(taskList.tasks);
showNewTaskInput();
initializeResetButton();
addNewTask();



