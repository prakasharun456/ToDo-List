let list = document.querySelector('ul.list');
let addBtn = document.querySelector('#addBtn');
// Array of task list
let taskList=[];

// getting stored tasks from localstorage and parsing it to taskList array
if(localStorage.getItem('taskList')!=null){
    taskList = JSON.parse(localStorage.getItem('taskList'));
}
// saving the taskList array data to localstorage
function saveLocalStorage(){
    localStorage.setItem('taskList',JSON.stringify(taskList));
}
// updating the status of task and updating localstorage
function completeTask(index){
    taskList[index].status='complete';
    addTaskToHTML();
    saveLocalStorage();
}
// deleting the particular task and updating taskList array and updating html and localstorage
function deleteTask(index){
    taskList=taskList.filter((currentTask,currentTaskKey)=> {return currentTaskKey!=index})
    addTaskToHTML();
    saveLocalStorage();
}
// adding all tasks in taskList to HTML
function addTaskToHTML(){
    list.innerHTML=''
    taskList.forEach((task,index)=>{
        let newTask = document.createElement('li');
        newTask.classList.add(task.status);
        newTask.innerHTML=`<div class="complete-icon" aria-label="Mark as completed">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <div class="content">${task.content}</div>
                    <div class="delete-icon" aria-label="delete">
                        <i class="fa-regular fa-circle-xmark"></i>
                    </div>`;
        newTask.querySelector('.complete-icon').addEventListener('click',()=>completeTask(index))
        newTask.querySelector('.delete-icon').addEventListener('click',()=>deleteTask(index))
        list.appendChild(newTask); 
    })
}

// pushing task to taskList array 
let form=document.querySelector('form')
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let content=document.querySelector('#task').value.trim();
    if(content){
        taskList.push({
            content:content,
            status:'todo'
        })
    }
    // function to refresh page with updated task with dom manipulation
    document.querySelector('#task').value='';
    addTaskToHTML();
    saveLocalStorage();
})

// initial rendering
addTaskToHTML(); 

