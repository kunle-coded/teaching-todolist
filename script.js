"use strict";

// Variables
const formInputEl = document.getElementById("new-task");
const btnAddEl = document.querySelector(".btn__add");
const listContainerEl = document.querySelector(".todo__list");
const taskCounterEl = document.getElementById("task__counter");
const quoteEl = document.getElementById("quote");

// Storage helpers
const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];
const saveTask = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

// Event listeners

// 1. Store task in localStorage
// 2. Display existing tasks in a list
// 3. Remove a task from list on delete
// 4. On page load, check localStorage and load existing tasks
// localStorage.clear();
// Add new task

const welcomeMesge = prompt("welcome Kunle");

const name = btnAddEl.addEventListener("click", () => {
  const text = formInputEl.value.trim();
  if (!text) return;

  const tasks = getTasks();

  tasks.push({ id: Date.now(), task: text, isCompleted: false });
  saveTask(tasks);

  formInputEl.value = "";
  displayTask();
});

// Mark task as complete
listContainerEl.addEventListener("change", (e) => {
  if (!e.target.classList.contains("task-check")) return;

  const listItem = e.target.closest(".list__item");
  const id = Number(listItem.dataset.taskId);

  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) return;
  task.isCompleted = e.target.checked;
  saveTask(tasks);
  displayTask();
});

// Delete a task
listContainerEl.addEventListener("click", (e) => {
  // 1. Select clicked target element: button | svg
  // 2. Select button element (parent of svg)
  const deleteBtn = e.target.closest(".btn__delete");

  // 3. Check if button element exists
  if (!deleteBtn) return;

  // 4. Select the parent li element of the button
  const listItem = deleteBtn.closest(".list__item");
  const id = Number(listItem.dataset.taskId);

  // 5. Get tasks from storage, remove the selected task, save remaining
  saveTask(getTasks().filter((t) => t.id !== id));
  displayTask();
});

// Functions
function displayTask() {
  const emptyTaskInfo = listContainerEl.querySelector(".task__empty");

  const tasks = getTasks();

  listContainerEl.querySelectorAll(".list__item").forEach((el) => el.remove());
  taskCounterEl.textContent = countTask();

  if (tasks.length === 0) {
    emptyTaskInfo.classList.remove("hide");
  } else {
    emptyTaskInfo.classList.add("hide");

    tasks.forEach((task) => {
      listContainerEl.insertAdjacentHTML("afterbegin", taskTemplate(task));
    });
  }

  taskCounterEl.textContent = countTask();
}

function taskTemplate(task) {
  return `
    <li data-task-id="${task.id}" class="list__item">
        <div class="item--container ${task.isCompleted ? "completed" : ""}">
            <input class="task-check" type="checkbox" ${task.isCompleted ? "checked" : ""} />
                <span class="todo__text">
                   ${task.task}
                </span>
        </div>
        <button class="btn__delete">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-x"
            >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
            </svg>
        </button>
    </li>
    `;
}

function countTask() {
  // const tasks = getTasks();
  // const uncompletedTasks = tasks.reduce(
  //   (acc, curr) => (!curr.isCompleted ? acc + 1 : acc),
  //   0,
  // );

  // return uncompletedTasks;

  return getTasks().reduce(
    (acc, curr) => (!curr.isCompleted ? acc + 1 : acc),
    0,
  );
}

async function getQuote() {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");

    if (!res.ok) throw new Error("Network error");

    const data = await res.json();
    quoteEl.innerHTML = `"${data.quote}" &mdash; <span>${data.author}</span>`;
  } catch (error) {
    quoteEl.innerHTML = "Could not load quote";
  }
}

displayTask();
getQuote();

/*
localStorage.setItem("name", "John Doe");
localStorage.setItem("age", "16");
const data = localStorage.getItem("name");
localStorage.removeItem("age");
localStorage.clear();


const userData = {
  id: 0,
  name: "John Doe",
  age: 25,
  email: "jdoe@email.com",
  password: "JDOE1234",
};

const users = [
  {
    id: 0,
    name: "John Doe",
    age: 25,
    email: "jdoe@email.com",
    password: "JDOE1234",
  },
  {
    id: 1,
    name: "Amina Yusuf",
    age: 18,
    email: "ayusuf@email.com",
    password: "AY1234",
  },
  {
    id: 2,
    name: "Amos Adamu",
    age: 32,
    email: "aadamu@email.com",
    password: "AA1234",
  },
];

localStorage.setItem("user", JSON.stringify(userData));
localStorage.setItem("users", JSON.stringify(users));
const userDataM = JSON.parse(localStorage.getItem("user"));
const usersDataM = JSON.parse(localStorage.getItem("users"));
console.log(userData.name);
console.log(usersDataM);
*/
