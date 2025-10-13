// script.js
// -------------------------------------------------------
//  TODO LIST APP — FRONTEND FETCH API LOGIC
// -------------------------------------------------------
//  Gin-gamit ini nga file para maghimo hin CRUD operations
//     (Create, Read, Update, Delete) gamit an Fetch API.
//     Iya konektado ha backend nga gin-run mo ha Spring Boot.


// -------------------------------------------------------
//  BASIC CONFIGURATION
// -------------------------------------------------------
//  Base URL han imo backend API — ilisi an "testuser" kun may
//     laen nga username nga ginhihingyap han backend mo.
const BASE_URL = "http://localhost:8080/users/testuser/todos";

const todoForm = document.getElementById("todoForm");
const todoTitle = document.getElementById("todoTitle");
const todoList = document.getElementById("todoList");


// -------------------------------------------------------
//  READ (GET all todos)
// -------------------------------------------------------
//  Gin-gamit ini para kuhaon an ngatanan nga tasks tikang han backend.
async function fetchTodos() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error("Failed to fetch todos");
        const todos = await response.json();
        renderTodos(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
}


// -------------------------------------------------------
//  CREATE (POST new todo)
// -------------------------------------------------------
//  Pag-submit han form para magdugang hin bag-o nga task.
todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newTodo = {
        id: null,
        username: "testuser", // kinahanglan pareho ha backend
        description: todoTitle.value,
        targetDate: new Date().toISOString().slice(0,10),
        done: false
    };

    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo)
        });

        if (!response.ok) throw new Error("Failed to add todo");

        //  Pag-clear han textbox pagkatapos mag-submit.
        todoTitle.value = "";

        //  I-refresh an list para makita an bag-o nga entry.
        fetchTodos();
    } catch (error) {
        console.error("Error adding todo:", error);
    }
});


// -------------------------------------------------------
//  UPDATE (PUT existing todo)
// -------------------------------------------------------
//  Para bag-ohon an existing nga task gamit an iya ID.
async function updateTodo(id, updatedDescription) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
                username: "testuser",
                description: updatedDescription,
                targetDate: new Date().toISOString().slice(0,10),
                done: false
            })
        });

        if (!response.ok) throw new Error("Failed to update todo");

        //  I-refresh liwat an list para makita an updates.
        fetchTodos();
    } catch (error) {
        console.error("Error updating todo:", error);
    }
}


// -------------------------------------------------------
//  DELETE (DELETE todo)
// -------------------------------------------------------
//  Para burahon an task nga base ha iya ID.
async function deleteTodo(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete todo");

        //  I-refresh an list pagkatapos mag-delete.
        fetchTodos();
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
}


// -------------------------------------------------------
//  RENDER (Display todos in the UI)
// -------------------------------------------------------
//  Gin-gagamit ini para ipakita ha screen an ngatanan nga tasks.
function renderTodos(todos) {
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "todo-title";
        span.textContent = todo.description;

        const actions = document.createElement("div");
        actions.className = "actions";

        //  Edit button — para magliwat hin description han task.
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.onclick = () => {
            const newDesc = prompt("Edit task:", todo.description);
            if (newDesc && newDesc.trim() !== "") {
                updateTodo(todo.id, newDesc);
            }
        };

        //  Delete button — para mag-delete hin entry.
        const delBtn = document.createElement("button");
        delBtn.textContent = "🗑️";
        delBtn.onclick = () => deleteTodo(todo.id);

        actions.append(editBtn, delBtn);
        li.append(span, actions);
        todoList.appendChild(li);
    });
}


// -------------------------------------------------------
//  INITIAL LOAD
// -------------------------------------------------------
//  Ginpapatikad ini nga function pag-open han app
//     basi makita dayon an mga tasks tikang ha backend.
fetchTodos();
//mao la po sir tanan na ako kinaya ngan naintindihan. and sir, sa ungod la po, nag ayo lat po ako bulig sir
// sa AI. para mas lalo maintindihan an kailangan himuon.
