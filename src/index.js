import { List } from './list-class.js';
import { Task } from './task-class.js';

let taskList = new List('tasklist');

// to run on local server: http-server -c-1 from main directory
// choose directory containing the html file you want to test



const displayGeneral = document.querySelector('.display-general');
const listDisplay = document.querySelector('.display-list');
const taskDisplay = document.querySelector('.display-task');
const newButton = document.querySelector('#new-button');
const newTask = document.querySelector('#new-task');
const newTaskInput = document.querySelector('#new-task-input');
const addNewTaskButton = document.querySelector('#add-new-task');
const listShowCase = document.querySelector('#list-showcase');
const resetButton = document.querySelector('#reset-button');

let placeholder = "";
let indexInList = '';
let untouched = true;

function showNewTaskInput(){
    newButton.addEventListener('click',()=>{
        resetTaskDisplay();
        newTask.setAttribute('style','display:contents')});
}

function initializeResetButton(){
    resetButton.addEventListener('click',()=>{
        resetTaskDisplay();
        removeSelectedClass();
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
        newTask.addToDos("GayTest1");
        taskList.addTask(newTask);

        generateListButtons();
        hideInput();

        console.log(`${placeholder} added`);
        taskList.showList;

        newTaskInput.value = '';
        placeholder = '';
        
    })
}

function generateListButtons(){
    const editButton = document.createElement('button');
    editButton.classList.add('list-edit-button');
    editButton.textContent = "Edit";

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('list-delete-button');
    deleteButton.textContent = "Delete";

    const confirmButton = document.createElement('button');
    confirmButton.textContent = "confirm"; 
    confirmButton.classList.add('confirm-button');

    const setPriority = document.createElement('button');
    setPriority.classList.add('set-priority');
    setPriority.textContent = "Set This Task as Priority";

    const reUsableTaskContainer = document.createElement('p');
    reUsableTaskContainer.classList.add('each-task');
    reUsableTaskContainer.textContent = placeholder;
    
    const taskShowCase = document.createElement('div');
    taskShowCase.classList.add("task-showcase");

    taskShowCase.appendChild(reUsableTaskContainer);
    taskShowCase.appendChild(confirmButton);
    listShowCase.appendChild(taskShowCase);

    let list = taskList.fullList;

    reUsableTaskContainer.addEventListener('click',()=>{
        if(untouched !== true){
        resetTaskDisplay();
        }
        untouched = false;
        taskShowCase.appendChild(editButton);
        taskShowCase.appendChild(deleteButton);     
        taskShowCase.appendChild(setPriority);
        setPriority.setAttribute('style','display:contents');    
    })

    reUsableTaskContainer.addEventListener('dblclick',()=>{
        reUsableTaskContainer.setAttribute('class','selected');
        getIndexOfSelectedClass();
        resetTaskDisplay();
        generateAllTaskDisplay(list[indexInList]);   

    })

    setPriority.addEventListener('click',()=>{
        getIndexOfSelectedClass();
        list[indexInList].setTaskAsPriority();
        reUsableTaskContainer.classList.add('priority');
    }
    );

    editButton.addEventListener('click', ()=>{
        //make reusableTaskContainer "contenteditable='true'"
        //update the object's name, and the display
        //maybe add "double click"(??) event listener to the reusableTaskContainer/
        reUsableTaskContainer.setAttribute('contenteditable','true');
        confirmButton.setAttribute('style','display:contents');

        });

    confirmButton.addEventListener('click',()=>{
        resetTodoDisplay();
        confirmButton.setAttribute('style','display:none'); 
        getIndexOfSelectedClass();
        list[indexInList].setName = reUsableTaskContainer.textContent;
        generateAllTaskDisplay(list[indexInList]);
    })
    
    deleteButton.addEventListener('click', ()=>{
        let task = list[indexInList];
        taskList.deleteTask(task);
        taskList.showList
        listShowCase.removeChild(taskShowCase);
        resetTaskDisplay();
    }
    )
}

function removeSelectedClass(){
    const element = document.querySelector(".selected");
    element.classList.remove('selected');
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
        task.addToDos(newInput.value);
        deleteElementByClass('todos');
        todoForm.setAttribute('style','display:none');
        newInput.value = "";
        displayEachTaskDetail(task);
    })
    
    addButton.addEventListener('click',()=>{
      todoForm.setAttribute('style', 'display:contents');
    })

}

function getIndexOfSelectedClass(){ 
    let list = taskList.fullList;
    let target = ''
    let selected = document.querySelector(".selected").textContent;
        for(let i=0;i<list.length;i++){
        if(list[i].taskName === selected){
            indexInList = i;
            break;
        }
    }

}


function displayEachTaskDetail(task){
    let todos = task.getToDos;

    for(let i = 0; i < todos.length; i++){
        const container = document.createElement('div');
        container.classList.add('todos');

        const content = document.createElement('ul');
        content.textContent = todos[i];
        
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";

        const confirmChangeButton = document.createElement('button');
        confirmChangeButton.classList.add('confirm-button');
        confirmChangeButton.textContent = "confirm";
        taskDisplay.appendChild(container);
        container.appendChild(content);
        container.appendChild(confirmChangeButton);
        container.appendChild(editButton);
        container.appendChild(deleteButton);

        editButton.addEventListener('click',()=>{
            content.setAttribute('contenteditable','true');
            confirmChangeButton.setAttribute('style','display:contents');
        });

        confirmChangeButton.addEventListener('click',()=>{
            todos[i] = content.textContent;
            confirmChangeButton.setAttribute('style','display:none');

        })

        deleteButton.addEventListener('click',()=>{
            todos.splice(i,1);
            taskDisplay.removeChild(container);
        })
    }
}

//utility functions

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
}

function hideInput(){
    newTask.setAttribute('style','display:none');
}



showNewTaskInput();
initializeResetButton();
addNewTask();

