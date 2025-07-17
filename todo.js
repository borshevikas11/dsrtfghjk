let todoList = [];
const baseTodoId = 'todoitem';

// Load tasks from localStorage when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
});

function loadFromLocalStorage() {
    const savedTasks = localStorage.getItem('todoList');
    if (savedTasks) {
        todoList = JSON.parse(savedTasks);
        todoList.forEach(task => addToDoToHtml(task));
    }
}

function saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function deleteElement(id) {
    const index = todoList.findIndex(item => item.id === id);
    todoList.splice(index, 1);
    document.getElementById(baseTodoId + id).remove();
    saveToLocalStorage();
}

function addToDo() {
    const form = document.forms.toDoForm;
    const dateValue = form.elements.date.value ? new Date(form.elements.date.value) : null;
    
    const newTodo = {
        id: createNewId(),
        title: form.elements.title.value,
        color: form.elements.color.value,
        description: form.elements.description.value,
        date: dateValue,
        completed: false
    };
    
    if (!newTodo.title) {
        alert('Пожалуйста, введите название задачи');
        return;
    }
    
    todoList.push(newTodo);
    addToDoToHtml(newTodo);
    saveToLocalStorage();
    
    // Clear form
    form.elements.title.value = '';
    form.elements.description.value = '';
    form.elements.date.value = '';
}

function createNewId() {
    return todoList.length === 0 ? 1 : Math.max(...todoList.map(todo => todo.id)) + 1;
}

function addToDoToHtml(newToDo) {
    const div = document.createElement('div');
    div.id = baseTodoId + newToDo.id;
    div.className = 'row my-3';
    
    const formattedDate = newToDo.date ? 
        newToDo.date.toLocaleDateString('ru-RU') : 
        'Нет даты';
    
    div.innerHTML = `
        <div class="col">
            <div class="card ${newToDo.completed ? 'border-success' : ''}">
                <div class="card-header d-flex justify-content-between align-items-center" style="height: 35px; background-color: ${newToDo.color}">
                    <div>
                        <input type="checkbox" class="form-check-input me-2" id="checkbox${newToDo.id}" onchange="toggleTaskSelection(${newToDo.id})">
                        <span>${formattedDate}</span>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="completed${newToDo.id}" ${newToDo.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${newToDo.id})">
                        <label class="form-check-label" for="completed${newToDo.id}">Выполнено</label>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title ${newToDo.completed ? 'text-decoration-line-through' : ''}">${newToDo.title}</h5>
                    <p class="card-text ${newToDo.completed ? 'text-decoration-line-through' : ''}">${newToDo.description}</p>
                    <button type="button" class="btn btn-link" onclick="deleteElement(${newToDo.id})">Удалить задачу</button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('toDoContainer').append(div);
}

function toggleTaskCompletion(id) {
    const index = todoList.findIndex(item => item.id === id);
    todoList[index].completed = !todoList[index].completed;
    saveToLocalStorage();
    
    // Update the card appearance
    const card = document.querySelector(`#${baseTodoId}${id} .card`);
    const title = document.querySelector(`#${baseTodoId}${id} .card-title`);
    const text = document.querySelector(`#${baseTodoId}${id} .card-text`);
    
    if (todoList[index].completed) {
        card.classList.add('border-success');
        title.classList.add('text-decoration-line-through');
        text.classList.add('text-decoration-line-through');
    } else {
        card.classList.remove('border-success');
        title.classList.remove('text-decoration-line-through');
        text.classList.remove('text-decoration-line-through');
    }
}

function toggleTaskSelection(id) {
    // This function is for the selection checkbox (not the completion toggle)
    // We don't need to do anything here as we'll check all selected checkboxes when deleting
}

function deleteSelected() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(.form-switch .form-check-input)');
    const idsToDelete = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const id = parseInt(checkbox.id.replace('checkbox', ''));
            idsToDelete.push(id);
        }
    });
    
    if (idsToDelete.length === 0) {
        alert('Пожалуйста, выберите задачи для удаления');
        return;
    }
    
    if (confirm(`Вы уверены, что хотите удалить ${idsToDelete.length} задач?`)) {
        idsToDelete.forEach(id => {
            const index = todoList.findIndex(item => item.id === id);
            if (index !== -1) {
                todoList.splice(index, 1);
                document.getElementById(baseTodoId + id).remove();
            }
        });
        saveToLocalStorage();
    }
}