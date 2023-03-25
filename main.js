//Define our array
let todo_list = [];

//define the todolist from the localsrtorage
const todo_key = 'todo_list_storage';

const input_got_focus = () => input_text.placeholder = ''

const  input_lost_focus = () => input_text.placeholder = 'Add your task'

const addNewToDO = () => {
    const newToDo =input_text.value;
    input_text.focus();
    if (newToDo != ''){
    todo_list.push(newToDo);
    show_todo(newToDo)
    const json_todo_list = JSON.stringify(todo_list);  //converting from js to json
    localStorage.setItem(todo_key, json_todo_list);    //saving the values in the localstorage to todo_key
    input_text.value = '';
    input_button.style.display = 'block';
    update_button.style.display = 'none';
    quote_display_none();
    }
}

const show_todo = (todo_item) => {
    my_todo.innerHTML += `
    <div id="todo_div_container">
    <span id="singleToDo">${todo_item}</span>
    <button id="circle" onClick="done(this)"></button>
    <i class="far fa-edit" onclick='update_item(this)'></i>
    <i class="fas fa-trash-alt" onclick='delete_item(this)'></i>
    </div>
    `
}

const done = (done_item) => {
    done_item.style.backgroundColor= "green";
    done_item.style.border= "1px solid white";
    done_item.previousElementSibling.style.textDecoration= "line-through";
    done_item.parentElement.style.opacity = ".8";
}

const update_item = (edit_icon) => {
    input_text.focus(); 
    const text_updated = edit_icon.parentElement.innerText;
    input_text.value = text_updated;
    input_button.style.display = 'none';
    update_button.style.display = 'block';
    edit_icon.parentElement.remove();
}

const delete_item = (delete_icon) => {
    const text_to_delete = delete_icon.parentElement.innerText;
    delete_icon.parentElement.remove();
    
    todo_list = todo_list.filter(item => item != text_to_delete)
    
    localStorage.setItem(todo_key, JSON.stringify(todo_list))
    
    const todo_blocks = my_todo.querySelectorAll('div').length;
    if (todo_blocks == 0) {
        quote_display_block();
    }
}

addEventListener('keyup', (e) => {
    switch (e.key){
        case 'Enter':
            addNewToDO();
            break;
        case 'Escape':
            input_text.value = '';
            break;
    }
})

const quote_display_none = () => {
    start_quote.style.display= "none";
}

const quote_display_block = () => {
    start_quote.style.display= "block";
}

const json_todo_list_back = localStorage.getItem(todo_key);  //getting the values from the localstorage from the todo_key
todo_list = JSON.parse(json_todo_list_back);     //converting from json to js

if(json_todo_list_back && todo_list.length != 0) {
    todo_list.forEach(show_todo);
    quote_display_none();
}else{
    quote_display_block();
}

        