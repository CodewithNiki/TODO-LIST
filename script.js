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
                <i class="fa-regular fa-trash-can delete" status= "delete" id = "${id}"></i>
        </li>`
    // console.log(item);
    const toDoPosition = "beforeend";
    toDoList.insertAdjacentHTML(toDoPosition, item);
    // console.log(toDoList);hi
}

// addToDo("walk the dogs", 0, false, false);
// addToDo("walk the dogs", 0, true, false);
// addToDo("walk the dogs", 0, true, true);
// console.log(toDoList);


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

        // console.log(listContainer[toDoItem.id].done);

        toDoItem.parentNode.childNodes[3].classList.toggle(textLineThrough)

        // console.log(toDoItem.parentNode.childNodes[3]);

        localStorage.setItem("to-do-item", JSON.stringify(listContainer))
    }
    if (toDoStatus === "delete") {
        toDoItem.parentNode.parentNode.removeChild(toDoItem.parentNode)
        // console.log(listContainer[toDoItem.id].trash);
        listContainer[toDoItem.id].trash = listContainer[toDoItem.id].trash
            ? false
            : true
        // console.log(listContainer[toDoItem.id].trash);
    }
    localStorage.setItem("to-do-item", JSON.stringify(listContainer))

})