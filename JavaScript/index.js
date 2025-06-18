// tarefas a serem renderizadas
const toDoListData = [
        {id:1, description: "passear com o cachorro", checked: false},
        {id:2, description: "fazer faxina", checked: false},
        {id:3, description: "fazer compras", checked: false},
        {id:4, description: "andar de bicicleta", checked: false},
    ];

// função que gera um novo id para cada nova task;
const newTaskId = () => {
    const id = toDoListData[toDoListData.length - 1]?.id;
    return id ? id + 1 : 1;
};

// função que pega o valor do meu input;
const newTaskData = (event) => {
    const description = event.target.elements.description.value;
    const newId = newTaskId();
    return {newId,description};
}
    // função que limpa o input
    const inputDOMClear = () => {
        const inputDOMTasks = document.getElementById("description");
        inputDOMTasks.value = "";
    }
    //função que cria os itens a serem renderizados
    const createElementItem = (ArrayElement) => {
        // Criando os elementos que vão ser utilizados;
        const checkBox = document.createElement("input");
        const label = document.createElement("label");
        const wrapper = document.createElement("div");
        const elementId = `${ArrayElement.id}-checkBox`;
        const button = document.createElement("button")

        checkBox.type = "checkbox";
        checkBox.id = elementId;
        checkBox.checked = ArrayElement.checked;
        label.htmlFor = elementId;
        wrapper.classList.add("checkbox-label-container")
        label.textContent = ArrayElement.description;

        wrapper.appendChild(checkBox);
        wrapper.appendChild(label);
        wrapper.appendChild(button);

        return wrapper;
    } 
    
    // função que recebe as informações e cria uma nova tarefa;
     
const newTask = (event) => {
    const objectTaskValue = {id:0, description:0, checked: false};
    const {newId, description} = newTaskData(event)
    objectTaskValue.id = newId;
    objectTaskValue.description = description; 
    const taskItem = createElementItem(objectTaskValue);
    toDoListData.push({id: newId, description: description, checked: false});
    return taskItem;
};


const taskRenderizad = (newTask) => {
    const lista = document.getElementById("lista");
             // "li" que vai ir na lista;
            const listItem = document.createElement("li");
            const renderizedItem = newTask;
            // colocando o item no "li";
            listItem.appendChild(renderizedItem);
            // colocado o "li" na lista;
            lista.appendChild(listItem);
}
const createToDoTask = (event) => {
    event.preventDefault()
    const reserizedTask = newTask(event);
    taskRenderizad(reserizedTask);
    inputDOMClear();
}
// essa proppriedade serve para esperar o navegador (document) estar pronto para executar o meu programa. Isso básicamente diz o que ele vai executar assim que o doc terminar de renderizar;
    window.onload = () => {
        // função que previne a função default do meu navegador quando o botão for clicado
        const listForm = document.getElementById("create-toDo-form");
        listForm.addEventListener("submit", createToDoTask);
        toDoListData.forEach((task) => {
            // local onde os elementos vão ser renderizados;
            const lista = document.getElementById("lista");
             // "li" que vai ir na lista;
            const listItem = document.createElement("li");
            const finalItem = createElementItem(task);
            // colocando o item no "li";
            listItem.appendChild(finalItem);
            // colocado o "li" na lista;
            lista.appendChild(listItem);
        });

    }

    
/* 
código feito com o professor
// Para ter a certeza de que o documento está pronto para receber as informações do js é importante utilizar  o window.onload e dentro dele colocar a função que carrega o seu script do site para garantir que tudo só seja executado quando o document estiver pronto.
const toDoListData = [
        {id:1, description: "passear com o cachorro", checked: false},
        {id:2, description: "fazer faxina", checked: false},
        {id:3, description: "fazer compras", checked: false},
        {id:4, description: "andar de bicicleta", checked: false},
    ];


// Montando os itens que eu preciso;
const getCheckBox = (id, description, checked) => {
    //criando os elementos necessários
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const button = document.createElement("button");
    const wrapper = document.createElement("div");
    const checkBoxName = `${id}-checkbox`;
    // maniupulando eles
    checkBox.type = "checkbox";
    checkBox.id = checkBoxName;
    checkBox.checked = checked;
    label.textContent = description;
    label.htmlFor = checkBoxName;
    wrapper.className = "checkbox-label-container";
    //adicionando eles na wrapper
    wrapper.appendChild(checkBox);
    wrapper.appendChild(label);
    wrapper.appendChild(button)
    return wrapper;
}
// Criandoo um id para a terefa inserida no programa;
 const getNewId = () => {
    // Essa sentença verifica se o meu array possui um valor dentro dele caso ossua ele pega o valor do ultimo e soma, se não tiver ele retorna 1 que sera o valor do priemiro id.
    const length = toDoListData[toDoListData.length - 1]?.id;
    return length ? length + 1 : 1
}
// pegando as informações do meu input e retorna elas
const getNewTaskData = (event) => {
    const value = event.target.elements.description.value;
    const id = getNewId();
    return {description:value, id: id};

}
// Função que cria e renderiza a nova tarefa;
const createTaskListItem = (task,checkbox) => {
    const divLista = document.getElementById("lista");
    const tasks = document.createElement("li");
    tasks.classList.add("div-task");
    tasks.id = task.id
    tasks.appendChild(checkbox);
    divLista.appendChild(tasks);
    toDoListData.push({id: task.id, description: task.description, checked: false})
}
// pegando o input da minha página e lidando com o evento padrão dele.
 const createTask = (event) => {
    event.preventDefault();
    const newTask = getNewTaskData(event);
    const checkBox = getCheckBox(newTask.id,newTask.description, false);
    createTaskListItem(newTask,checkBox);
 }
 

window.onload = () => {
    const formValue = document.getElementById("create-toDo-form");
    formValue.addEventListener("submit",createTask)
    toDoListData.forEach((task) => {
    const divLista = document.getElementById("lista");
    const tasks = document.createElement("li");
    tasks.classList.add("div-task");
    tasks.appendChild(getCheckBox(task.id,task.description,task.checked));
    divLista.appendChild(tasks);    
    })
};
*/