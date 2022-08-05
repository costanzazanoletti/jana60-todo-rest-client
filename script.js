// variabili globali
const input = document.getElementById('todoInput');
const todoList = document.getElementById('todos');
const url = 'http://localhost:8080/api/todos';

// avvia app
getAllTodos();
input.addEventListener('change', postTodo);

// dichiarazione funzioni
function getAllTodos() {
  // chiamo l'api con la lista dei todo
  axios
    .get(url)
    .then((response) => {
      console.log(response);
      const todos = response.data;
      // con i todos costruisco i list items
      addTodoList(todos);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addTodoList(todos) {
  todoList.innerHTML = '';
  // per ogni todo crea un list item e lo aggiunge al ul
  todos.forEach((item) => {
    createTodoItem(item);
  });
}

function createTodoItem(item) {
  const li = document.createElement('li');
  li.className =
    'list-group-item d-flex justify-content-between align-items-center';
  li.setAttribute('data-id', item.id);
  //li.innerText = item.content;
  const span = document.createElement('span');
  span.innerText = item.content;
  span.className = item.completed
    ? 'text-decoration-line-through'
    : 'text-decoration-none';
  span.style.cursor = 'pointer';
  span.addEventListener('click', toggleTodo);
  const deleteBtn = document.createElement('a');
  deleteBtn.className = 'btn btn-info text-light';
  deleteBtn.innerHTML = 'Delete';
  deleteBtn.addEventListener('click', deleteTodo);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

// invia il todo all'api
function postTodo() {
  const value = input.value;
  console.log(value);
  if (value != '') {
    // faccio la post
    axios
      .post(url, {
        content: value,
        completed: false,
      })
      .then((response) => {
        // dopo avere aggiunto il todo ricarico la lista
        console.log(response);
        getAllTodos();
        input.value = '';
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// chiama l'api di delete
function deleteTodo(event) {
  // prendo l'id del todo dall'attributo data-id dell'li contenitore dell'ancora
  const todoId = event.target.closest('li').getAttribute('data-id');
  // chiamo l'api di delete
  axios
    .delete(url + '/' + todoId)
    .then((response) => {
      console.log(response);
      getAllTodos();
    })
    .catch((error) => {
      console.log(error);
    });
}
// chiama l'api di toggle
function toggleTodo(event) {
  console.log(event);
  // prendo l'id del todo dall'attributo data-id dell'li contenitore dell'ancora
  const todoId = event.target.closest('li').getAttribute('data-id');
  axios
    .get(url + '/' + todoId + '/toggle')
    .then((response) => {
      console.log(response);
      getAllTodos();
    })
    .catch((error) => {
      console.log(error);
    });
}
