(()=>{"use strict";const t=class{constructor(t){this.name=t,this.tasks=[]}get showList(){this.tasks.forEach((t=>{console.log(t)}))}get fullList(){return this.tasks}get listName(){return this.name}addTask(t){this.tasks.push(t)}deleteTask(t){this.tasks=this.tasks.filter((e=>e!==t))}},e=(document.querySelector(".display-general"),document.querySelector(".display-list"),document.querySelector(".priority-tasks"),document.querySelector(".display-task")),s=document.querySelector("#new-button"),n=document.querySelector("#new-task"),o=document.querySelector("#new-task-input"),d=document.querySelector("#add-new-task"),l=document.querySelector("#list-showcase"),a=document.querySelector("#reset-button");let i=new t("tasklist"),c="",r="",u=!1;function m(t){const e=document.createElement("button");e.classList.add("list-edit-button"),e.classList.add("list-buttons"),e.textContent="Edit";const s=document.createElement("button");s.classList.add("list-delete-button"),s.classList.add("list-buttons"),s.textContent="Delete";const n=document.createElement("button");n.textContent="confirm",n.classList.add("confirm-button"),n.classList.add("list-buttons");const o=document.createElement("button");o.classList.add("set-priority"),o.classList.add("list-buttons"),o.textContent="Set as Priority";const d=document.createElement("button");d.classList.add("display-todos"),d.classList.add("list-buttons"),d.textContent="Show Details";const a=document.createElement("p");a.classList.add("each-task"),a.textContent=t.name;const c=document.createElement("div");c.classList.add("task-title");const m=document.createElement("div");m.classList.add("task-showcase");const b=document.createElement("div");b.classList.add("list-buttons-div"),c.appendChild(a),c.appendChild(n),m.appendChild(c),m.appendChild(b),l.appendChild(m);let E=i.tasks;a.addEventListener("click",(()=>{y(),u&&L(),u=!0,a.classList.add("selected"),h(),console.log(r),b.appendChild(e),b.appendChild(s),b.appendChild(o),b.appendChild(d)})),d.addEventListener("click",(()=>{h(),console.log(r),L(),y(),p(E[r])})),o.addEventListener("click",(()=>{h(),E[r].setTaskAsPriority(),a.classList.add("priority"),C()})),e.addEventListener("click",(()=>{a.setAttribute("contenteditable","true"),n.setAttribute("style","display:contents")})),n.addEventListener("click",(()=>{k("todos"),k("todo-form"),n.setAttribute("style","display:none"),E[r].setName=a.textContent,p(E[r]),a.setAttribute("contenteditable","false"),C()})),s.addEventListener("click",(()=>{let t=E[r];i.deleteTask(t),i.showList,l.removeChild(m),y(),C()}))}function p(t){const s=document.createElement("button");s.classList.add("add-button"),s.textContent="Add Todos";const n=document.createElement("form");n.classList.add("todo-form");const o=document.createElement("input");o.classList.add("add-todo"),o.setAttribute("type","text"),o.setAttribute("placeholder","Enter New Todos");const d=document.createElement("button");d.setAttribute("id","submit"),d.textContent="Enter",e.appendChild(s),e.appendChild(n),n.appendChild(o),n.appendChild(d),b(t),d.addEventListener("click",(e=>{e.preventDefault(),t.todos.push(o.value),k("todos"),n.setAttribute("style","display:none"),o.value="",C(),b(t)})),s.addEventListener("click",(()=>{n.setAttribute("style","display:contents")}))}function h(){let t=i.tasks,e=document.querySelector(".selected").textContent;for(let s=0;s<t.length;s++)if(t[s].name===e){r=s,console.log("index found");break}}function b(t){let s=t.todos;for(let t=0;t<s.length;t++){const n=document.createElement("div");n.classList.add("todos");const o=document.createElement("ul");o.textContent=s[t];const d=document.createElement("button");d.textContent="Edit";const l=document.createElement("button");l.textContent="Delete";const a=document.createElement("button");a.classList.add("confirm-button"),a.textContent="confirm",e.appendChild(n),n.appendChild(o),n.appendChild(a),n.appendChild(d),n.appendChild(l),d.addEventListener("click",(()=>{o.setAttribute("contenteditable","true"),a.setAttribute("style","display:contents")})),a.addEventListener("click",(()=>{s[t]=o.textContent,a.setAttribute("style","display:none"),C()})),l.addEventListener("click",(()=>{s.splice(t,1),e.removeChild(n),C()}))}}function k(t){const e=document.getElementsByClassName(t);for(;e.length>0;)e[0].parentNode.removeChild(e[0])}function y(){k("todos"),k("todo-form"),k("add-button"),k("list-edit-button"),k("list-delete-button"),k("set-priority"),k("display-todos")}function E(){n.setAttribute("style","display:none")}function L(){document.querySelector(".selected").classList.remove("selected"),u=!1}function C(){localStorage.clear(),console.log(i.tasks);const t=JSON.stringify(i);localStorage.setItem("list",t),console.log(t)}!function(){const e=localStorage.getItem("list");i=Object.assign(new t,JSON.parse(e)),console.log(i.tasks),i.tasks.forEach((t=>{console.log("Task Name is: "+t.name),console.log("Todos: "+t.todos)}))}(),i.tasks.forEach((t=>{m(t)})),s.addEventListener("click",(()=>{y(),n.setAttribute("style","display:contents")})),a.addEventListener("click",(()=>{y(),!0===u&&L()})),d.addEventListener("click",(t=>{if(t.preventDefault(),c=o.value,""===c)return void window.alert("Task Name Cannot be Empty");const e=new class{constructor(t){this.name=t,this.todos=[],this.priority=!1}set setName(t){this.name=t}setTaskAsPriority(){this.priority=!0}get getToDos(){return this.todos}get taskName(){return this.name}get taskOverview(){console.log(this.todos)}addToDos(t){this.todos.push(t)}}(c);e.addToDos("DefaultTest1"),i.addTask(e),C(),m(e),E(),console.log(`${c} added`),o.value="",c=""}))})();