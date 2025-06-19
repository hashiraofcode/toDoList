let toDoListData = [
        {id:1, description: "passear com o cachorro", checked: false},
        {id:2, description: "fazer faxina", checked: false},
        {id:3, description: "fazer compras", checked: false},
        {id:4, description: "andar de bicicleta", checked: false},
];
// removendo tarefas marcadas como true;
const removeTaskTrue = () => {
    const asRemoverItem = toDoListData.filter(({checked}) => checked);
    toDoListData = toDoListData.filter(({checked}) => !checked);
    asRemoverItem.forEach(({id}) => {
        const itemAsRemoved = document.getElementById(String(id))
        document.getElementById("lista")
        .removeChild(itemAsRemoved);
    });
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
    console.log(objectValues)
    const item = creatToDoItem(objectValues);
    getItem(item);
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
    toDoListData.forEach((task) => {
        const item = creatToDoItem(task);
        getItem(item);
    });
}