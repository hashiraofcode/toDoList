// fazendo uma função que coloca um item de exemplo na exibição;
    const setExempleTask = () => {
       const exempleItemWrapper = document.createElement("li");
       const exempleItemContent = document.createElement("p");
       exempleItemWrapper.id = "list-item-exemplo";
       exempleItemContent.textContent = "Escreva Uma tarefa!!!"
       exempleItemWrapper.appendChild(exempleItemContent);
        document.getElementById("lista").appendChild(exempleItemWrapper);
    };
// função que apaga o li que foi criado como exemplo;
 const deleteExempleTask = () => {
    const itemRemoved = document.getElementById("list-item-exemplo");
    document.getElementById("lista").removeChild(itemRemoved);
}
// função que verifica se há tarefa em exibição;
const taskInDisplay = () => {
    if (toDoListData.length === 0) {
        setExempleTask();
    }
}
// função inicia array e carrega os dados do local storage nele;
const getTasksFromLocalStorage = () => {
    const localValue = window.localStorage.getItem("tasks");
    return localValue? 
    JSON.parse(localValue):
    [];
}
let toDoListData = getTasksFromLocalStorage();
console.log(toDoListData);
// pegando as tarefas novas e mandando para o local storage;
const setTasksInLocalStorage = (toDoListData) => {
    const localValue = JSON.stringify(toDoListData);
    window.localStorage.setItem("tasks", localValue);
}
// acessando um item no localStorage;
const getItemFromLocalStorage = () => {
    const localItem =JSON.parse(window.localStorage.getItem("tasks"));
    return localItem;
}
// removendo tarefas marcadas como true;
const removeTaskTrue = () => {
    const asRemoverItem = toDoListData.filter(({checked}) => checked);
    toDoListData = toDoListData.filter(({checked}) => !checked);
    setTasksInLocalStorage(toDoListData);
    asRemoverItem.forEach(({id}) => {
        const itemAsRemoved = document.getElementById(String(id))
        document.getElementById("lista")
        .removeChild(itemAsRemoved);
    });
    taskInDisplay();
}
// pegando o valor do input e atualizando ele na matriz;
const getCheckboxChecked = (event) => {
    const name = event.target.id;
    const [id] = name.split("-")
    toDoListData = toDoListData.map((task) => {
        if(parseInt(task.id) === parseInt(id)){
            return {...task,checked:true};
        } else return task;
    });
}
// remover o item com botão;
const removerTask = (idItem) => {
    toDoListData = toDoListData.filter(({id}) => id != idItem);
    const deletedItem = document.getElementById(String(idItem));
    document.getElementById("lista").removeChild(deletedItem);
    setTasksInLocalStorage(toDoListData);
    taskInDisplay();
}
// renderiza o item;
const getItem = (creatToDoItem) => {
    const {wrapper, getIdForLi} = creatToDoItem;
    const listItem = document.createElement("li");
    listItem.id = String(getIdForLi);
    listItem.appendChild(wrapper);
    document.getElementById("lista").appendChild(listItem);
}
// peggando um novo id;
const getNewId = () => {
    const id = toDoListData[toDoListData.length -1]?.id;
    return id ? id + 1 : 1
}
// pegando descrição;
const getDescripition = (event) => {
    const description =  event.target.elements.description.value;
    return description
}

// valores da nova tarefa;
const newTaskData = (event) => {
    const id = getNewId();
    const description = getDescripition(event);
    return {id, description};
}
// criando nova tarefa;
const createNewTask = (event) => {
    // prevendo o evento padrão do navegador;
     event.preventDefault()
    const {id, description} = newTaskData(event);
    if (description !== ""){
    const objectValues = {id,description,checked:false};
    objectValues.id = id;
    objectValues.description = description;
    toDoListData.push(objectValues);
    setTasksInLocalStorage(toDoListData);
    console.log(objectValues)
    const item = creatToDoItem(objectValues);
    getItem(item);
     deleteExempleTask();
    } else alert("Inseira uma tarefa válida");
}

// função que cria o item a ser renderizado;
const creatToDoItem = (arrData) => {
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const button = document.createElement("button");
    const wrapper = document.createElement("div");
    const inputName = `${arrData.id}-checkbox`;
    const getIdForLi = arrData.id;
    
    checkbox.type = "checkbox";
    checkbox.id = inputName;
    checkbox.name = inputName;
    checkbox.checked = arrData.checked;
    checkbox.addEventListener("change", getCheckboxChecked);
    label.htmlFor = inputName;
    label.textContent = arrData.description;
    button.textContent = "X";
    button.ariaLabel = "deletar tarefa";
    button.onclick = () => {removerTask(getIdForLi)}; 
    wrapper.classList.add("checkbox-label-container");

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    wrapper.appendChild(button);
    return {wrapper, getIdForLi};
};




// Fazendo função que vai conter a script do meu site;
window.onload = () => {
    // pegando evento do submit
    document.getElementById("create-toDo-form").addEventListener("submit",createNewTask);
    if(toDoListData.length > 0){
        deleteExempleTask();
        toDoListData.forEach((task) => {
        const item = creatToDoItem(task);
        getItem(item);
    })
    } else setExempleTask();
}