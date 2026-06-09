const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");

const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const filterButtons =
document.querySelectorAll(".filters button");

let tasks = [];

addBtn.addEventListener("click", addTask);

function addTask(){

    const text = taskInput.value.trim();

    if(text === ""){
        alert("Enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        date: taskDate.value,
        time: taskTime.value,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";

    renderTasks();
}

filterButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        document
        .querySelector(".filters .active")
        .classList.remove("active");

        btn.classList.add("active");

        renderTasks();

    });

});

function renderTasks(){

    taskList.innerHTML="";

    const filter =
    document.querySelector(".filters .active")
    .dataset.filter;

    let filtered = tasks.filter(task=>{

        if(filter==="pending")
            return !task.completed;

        if(filter==="completed")
            return task.completed;

        return true;

    });

    filtered.forEach(task=>{

        const li=document.createElement("li");

        li.className=
        task.completed
        ? "task completed"
        : "task";

        li.innerHTML=`

        <div class="task-info">

            <h3>${task.text}</h3>

            <p>
            📅 ${task.date || "No Date"}
            &nbsp;&nbsp;
            ⏰ ${task.time || "No Time"}
            </p>

        </div>

        <div class="actions">

            <button
            class="check"
            onclick="toggleTask(${task.id})">
            ✔
            </button>

            <button
            class="delete"
            onclick="deleteTask(${task.id})">
            ✖
            </button>

        </div>

        `;

        taskList.appendChild(li);

    });
}

function toggleTask(id){

    tasks = tasks.map(task=>

        task.id===id
        ? {...task,
            completed:!task.completed}
        : task

    );

    renderTasks();
}

function deleteTask(id){

    tasks=
    tasks.filter(task=>
        task.id!==id
    );

    renderTasks();
}