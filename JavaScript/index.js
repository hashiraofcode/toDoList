// Para ter a certeza de que o documento está pronto para receber as informações do js é importante utilizar  o window.onload e dentro dele colocar a função que carrega o seu script do site para garantir que tudo só seja executado quando o document estiver pronto.


// fazendo os chebox da lista de tarefas
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
window.onload = () => {
    toDoListData = [
        {id:1, description: "passear com o cachorro", checked: false},
        {id:2, description: "fazer faxina", checked: false},
        {id:3, description: "fazer compras", checked: false},
        {id:4, description: "andar de bicicleta", checked: false},
    ];
    toDoListData.forEach((task) => {
        const divLista = document.getElementById("lista");
        const tasks = document.createElement("li");
        tasks.classList.add("div-task");
        tasks.appendChild(getCheckBox(task.id,task.description,task.checked))
        divLista.appendChild(tasks);
    });
};