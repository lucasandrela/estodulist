
README.md (Estrutura do Projeto EsToDoList)
Este é um projeto simples de To-Do List (Lista de Tarefas) desenvolvido com foco em JavaScript puro (Vanilla JS) e boas práticas de Clean Code, utilizando a biblioteca utilitária Tailwind CSS para estilização rápida. O objetivo do projeto é demonstrar a implementação de um CRUD (Create, Read, Update, Delete) básico de tarefas com persistência de dados via LocalStorage.

Funcionalidades
O aplicativo permite ao usuário gerenciar tarefas com as seguintes funcionalidades:

Adicionar Tarefa (Create): Inserir novas tarefas utilizando o campo de texto e o botão '+' ou a tecla 'Enter'.

Listar Tarefas (Read): Exibir todas as tarefas salvas.

Persistência de Dados: Salvar as tarefas no navegador utilizando o localStorage para que elas permaneçam após o fechamento da página.

Marcar Conclusão (Update): Clicar no texto da tarefa para alternar o status entre ativa e concluída.

Editar Tarefa (Update): Utilizar o ícone de lápis para editar o texto da tarefa via prompt().

Excluir Tarefa (Delete): Utilizar o ícone de lixeira para remover a tarefa após confirmação.

Pesquisa: Filtrar as tarefas exibidas em tempo real com base no texto digitado.

Filtro por Status: Visualizar todas, apenas tarefas Ativas ou apenas tarefas Concluídas através do seletor.

Arquitetura e Clean Code (JavaScript)
O arquivo script.js segue uma arquitetura modular baseada no modelo de Clean Code, garantindo organização e fácil manutenção.

Separação de Preocupações: O código é dividido em seções numeradas, onde cada seção é responsável por uma única área de funcionalidade (e.g., Seleção de Elementos, Persistência, CRUD, Eventos).

Módulos de Persistência: Funções dedicadas (salvarTarefas e carregarTarefasSalvas) encapsulam toda a lógica de interação com o localStorage.

Módulos de Renderização: A função central exibirTarefas é a única responsável por manipular o DOM e renderizar a lista, recebendo o array de dados já filtrado ou pesquisado.

Nomenclatura Consistente: Variáveis e funções utilizam nomes em Português que refletem claramente seu propósito (adicionarTarefa, campoPesquisa, alternarConclusao).

Como Executar
Para rodar este projeto:

Clone ou baixe os arquivos index.html e script.js para uma pasta local.

Abra o arquivo index.html diretamente no seu navegador.

Alternativamente, use uma extensão como Live Server (VS Code) para iniciar um servidor local e visualizar as mudanças em tempo real.