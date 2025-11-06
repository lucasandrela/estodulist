// Mantenha o seu arquivo script.js da última iteração, ele está funcionalmente completo.

document.addEventListener('DOMContentLoaded', () => {
    // Seletores de Elementos Principais
    const taskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const searchInput = document.getElementById('search-input');
    const filterSelect = document.getElementById('filter-select');

    // VARIÁVEIS DO MODAL DE CONFIRMAÇÃO (EXCLUSÃO)
    const customModal = document.getElementById('custom-confirm-modal');
    const confirmMessage = document.getElementById('confirm-message');
    let confirmOkBtn = document.getElementById('confirm-ok-btn');
    let confirmCancelBtn = document.getElementById('confirm-cancel-btn');

    // VARIÁVEIS DO MODAL DE EDIÇÃO
    const editModal = document.getElementById('edit-modal');
    const editTaskInput = document.getElementById('edit-task-input');
    const editSaveBtn = document.getElementById('edit-save-btn');
    const editCancelBtn = document.getElementById('edit-cancel-btn');

    // Estado para armazenar as tarefas
    let tasks = [];
    let currentEditTaskId = null;

    // --- Funções de Persistência de Dados ---

    function loadTasks() {
        const storedTasks = localStorage.getItem('estodolist_tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        } else {
            tasks = [
                { id: Date.now() + 1, text: "", completed: false },
                { id: Date.now() + 2, text: "", completed: true },
            ];
        }
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('estodolist_tasks', JSON.stringify(tasks));
    }


    // --- Funções de Criação e Manipulação de Tarefas ---

    // 1. Cria o HTML de um item da lista (<li>)
    function createTaskElement(task) {
        const listItem = document.createElement('li');
        
        // Classes base: Fundo semi-transparente e borda branca sutil
        let itemClasses = 'task-item flex justify-between items-center p-3 rounded-lg cursor-pointer transition duration-200 hover:shadow-lg border border-white/20 bg-white/10';
        
        // Estilo para concluída: Fundo mais opaco e texto mais discreto
        const completedClasses = 'bg-black/20 line-through text-white/50 opacity-90 border-transparent'; 

        if (task.completed) {
            listItem.className = `${itemClasses} ${completedClasses}`;
            listItem.setAttribute('data-status', 'completed');
        } else {
            listItem.className = `${itemClasses}`;
            listItem.setAttribute('data-status', 'pending');
        }
        
        // Garante que o texto quebre a linha e não cause scroll horizontal
        listItem.innerHTML = `
            <span class="task-text text-lg font-medium flex-1 mr-4 min-w-0 break-words">${task.text}</span>
            <div class="task-actions flex space-x-2 flex-shrink-0">
                <button class="btn-edit text-accent-blue hover:text-blue-400 p-2 rounded transition duration-150" title="Editar">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="btn-delete text-red-500 hover:text-red-400 p-2 rounded transition duration-150" title="Excluir">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        
        listItem.setAttribute('data-id', task.id);

        // Adiciona Listeners
        listItem.querySelector('.task-text').addEventListener('click', () => toggleComplete(task.id));
        listItem.querySelector('.btn-edit').addEventListener('click', (e) => {
            e.stopPropagation(); 
            showEditModal(task.id, task.text); 
        });
        listItem.querySelector('.btn-delete').addEventListener('click', (e) => {
            e.stopPropagation();
            showCustomConfirm(
                "Tem certeza que deseja excluir esta tarefa?", 
                () => {
                    tasks = tasks.filter(t => t.id !== task.id);
                    renderTasks();
                    saveTasks();
                    hideCustomConfirm();
                }, 
                () => {
                    hideCustomConfirm();
                }
            );
        });

        return listItem;
    }

    // 2. Renderiza a lista 
    function renderTasks() {
        taskList.innerHTML = '';
        
        let processedTasks = tasks.filter(task => {
            const filterValue = filterSelect.value;
            const searchValue = searchInput.value.toLowerCase();
            
            const matchesFilter = filterValue === 'all' || 
                                  (filterValue === 'completed' && task.completed) ||
                                  (filterValue === 'pending' && !task.completed);
                                  
            const matchesSearch = task.text.toLowerCase().includes(searchValue);
            
            return matchesFilter && matchesSearch;
        });

        const pendingTasks = processedTasks.filter(task => !task.completed);
        const completedTasks = processedTasks.filter(task => task.completed);
        
        const sortedTasks = [...pendingTasks, ...completedTasks];

        sortedTasks.forEach(task => {
            taskList.appendChild(createTaskElement(task));
        });
    }

    // 3. Adiciona uma Nova Tarefa
    function addTask() {
        const text = taskInput.value.trim();
        if (text === "") {
            alert("Por favor, digite uma tarefa!"); 
            return;
        }

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        tasks.push(newTask);
        taskInput.value = ''; 
        renderTasks(); 
        saveTasks(); 
    }
    
    // 4. Marca/Desmarca como Concluída
    function toggleComplete(id) {
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            renderTasks();
            saveTasks(); 
        }
    }

    // 5. Salva a Edição
    function saveEdit() {
        const newText = editTaskInput.value.trim();
        const taskId = currentEditTaskId;

        if (newText === "") {
            alert("A tarefa não pode estar vazia.");
            return;
        }

        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].text = newText;
            renderTasks();
            saveTasks();
        }

        hideEditModal();
    }


    // --- Lógica dos Modais Customizados ---

    // Modal de Confirmação (Exclusão)
    function hideCustomConfirm() {
        customModal.classList.add('hidden');
    }

    function showCustomConfirm(message, onConfirm, onCancel) {
        confirmMessage.textContent = message;
        
        confirmOkBtn.replaceWith(confirmOkBtn.cloneNode(true));
        confirmCancelBtn.replaceWith(confirmCancelBtn.cloneNode(true));
        
        confirmOkBtn = document.getElementById('confirm-ok-btn');
        confirmCancelBtn = document.getElementById('confirm-cancel-btn');

        confirmOkBtn.addEventListener('click', onConfirm);
        confirmCancelBtn.addEventListener('click', onCancel);

        customModal.classList.remove('hidden');
    }

    // Modal de Edição
    function hideEditModal() {
        editModal.classList.add('hidden');
        currentEditTaskId = null;
        editTaskInput.value = '';
    }

    function showEditModal(id, text) {
        currentEditTaskId = id;
        editTaskInput.value = text;
        editModal.classList.remove('hidden');
        editTaskInput.focus();
    }


    // --- Listeners de Eventos Globais ---
    
    // Adicionar Tarefa
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Pesquisar e Filtrar
    searchInput.addEventListener('input', renderTasks);
    filterSelect.addEventListener('change', renderTasks);
    
    // Listeners do Modal de Edição
    editSaveBtn.addEventListener('click', saveEdit);
    editCancelBtn.addEventListener('click', hideEditModal);
    editTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
    
    // INICIA O APP CARREGANDO AS TAREFAS SALVAS
    loadTasks();
});