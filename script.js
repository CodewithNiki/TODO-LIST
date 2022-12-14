const toDoList = document.querySelector("#list");
const toDoAddBtn = document.querySelector(".add-a-todo");
const toDoInput = document.querySelector("input");
const toDoClearList = document.querySelector(".trash");

// Selecting the Icons
const checkBtn = "fa-circle-check";
const unCheckBtn = "fa-circle";
const textLineThrough = "line-through";

// Creating an array for the list-container
let listContainer;
let id;
// we use let and not const for local storage use

// Updating the local storage
let toDoData = localStorage.getItem("to-do-item");

if (toDoData) {
    listContainer = JSON.parse(toDoData);
    id = listContainer.length;
    loadListContainer(listContainer)
}
else {
    listContainer = []
    id = 0
}

function loadListContainer(array) {
    array.forEach(item => {
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

// Clearing the local Storage
toDoClearList.addEventListener("click", () => {
    localStorage.clear();
    location.reload()
})

// Creating a addToDO function
function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }

    const toDoDone = done ? checkBtn : unCheckBtn;
    const toDoLine = done ? textLineThrough : "";

    const item =
        ` <li class= "item">
                <i class="fa-regular ${toDoDone}" status= "complete" id= "${id}"></i>
                <p class = "${toDoLine}">${toDo}</p>
                <div>
                <i class = "far fa-edit" status= "edit" id = "${id}"></i>
                <i class="fa-regular fa-trash-can delete" status= "delete" id = "${id}"></i>
                </div>
        </li>`
    const toDoPosition = "beforeend";
    toDoList.insertAdjacentHTML(toDoPosition, item);
}

// Adding the to do list when the enter key is pressed 
document.addEventListener('keyup', displayToDo);
// Adding the to do list when the toDoAddBtn key is clicked
toDoAddBtn.addEventListener("click", displayToDo);

function displayToDo(event) {
    if (event.key === "Enter" || event.target === toDoAddBtn) {
        let toDo = toDoInput.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            listContainer.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            })
            localStorage.setItem("to-do-item", JSON.stringify(listContainer))
            id++;
        }
        toDoInput.value = "";
    }
}

// Targetting the toDoList
toDoList.addEventListener("click", (e) => {

    if (
        e.target.localName === "p" ||
        e.target.localName === "li" ||
        e.target.localName === "ul"
    )
        return;

    const toDoItem = e.target;
    const toDoStatus = toDoItem.attributes.status.value

    if (toDoStatus === "complete") {
        toDoItem.classList.toggle(checkBtn)
        toDoItem.classList.toggle(unCheckBtn)

        listContainer[toDoItem.id].done = listContainer[toDoItem.id].done
            ? false
            : true
        toDoItem.parentNode.childNodes[3].classList.toggle(textLineThrough)
        localStorage.setItem("to-do-item", JSON.stringify(listContainer))
    }

    if (toDoStatus === "delete") {
        deleteToDo(toDoItem)
    }

    if (toDoStatus === "edit") {
        editToDo(toDoItem);
        deleteToDo(toDoItem);
    }

    localStorage.setItem("to-do-item", JSON.stringify(listContainer))

})

function editToDo(toDoItem){
    toDoInput.value = toDoItem.parentNode.parentNode.parentNode.querySelector("p").innerHTML;
}

function deleteToDo(toDoItem){
    toDoItem.parentNode.parentNode.parentNode.removeChild(toDoItem.parentNode.parentNode);
    listContainer[toDoItem.id].trash = true;
}