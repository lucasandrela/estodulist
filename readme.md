# 📝 EsToDoList – Projeto de To-Do List em JavaScript Puro

Este é um projeto simples de **To-Do List (Lista de Tarefas)** desenvolvido com foco em **JavaScript puro (Vanilla JS)** e **boas práticas de Clean Code**, utilizando a biblioteca utilitária **Tailwind CSS** para estilização rápida.  

O objetivo do projeto é demonstrar a implementação de um **CRUD** (Create, Read, Update, Delete) básico de tarefas, com **persistência de dados via LocalStorage**.

---

## 🚀 Funcionalidades

O aplicativo permite ao usuário gerenciar tarefas com as seguintes funcionalidades:

- ✅ **Adicionar Tarefa (Create)**: Inserir novas tarefas utilizando o campo de texto e o botão **“+”** ou a tecla **Enter**.  
- 📋 **Listar Tarefas (Read)**: Exibir todas as tarefas salvas.  
- 💾 **Persistência de Dados**: Salvar as tarefas no navegador utilizando o **localStorage**, garantindo que permaneçam após o fechamento da página.  
- 🔄 **Marcar Conclusão (Update)**: Clicar no texto da tarefa para alternar o status entre **ativa** e **concluída**.  
- ✏️ **Editar Tarefa (Update)**: Utilizar o ícone de **lápis** para editar o texto da tarefa via `prompt()`.  
- 🗑️ **Excluir Tarefa (Delete)**: Utilizar o ícone de **lixeira** para remover a tarefa após confirmação.  
- 🔍 **Pesquisa**: Filtrar as tarefas exibidas em tempo real com base no texto digitado.  
- 🎯 **Filtro por Status**: Visualizar **todas**, **apenas ativas** ou **apenas concluídas** através do seletor.

---

## 🧠 Arquitetura e Clean Code (JavaScript)

O arquivo `script.js` segue uma **arquitetura modular** baseada no modelo de **Clean Code**, garantindo **organização** e **fácil manutenção**.

### 📦 Estrutura e Princípios

- **Separação de Preocupações**  
  O código é dividido em seções numeradas, onde cada parte é responsável por uma área específica de funcionalidade  
  *(Ex: Seleção de Elementos, Persistência, CRUD, Eventos).*

- **Módulos de Persistência**  
  Funções dedicadas (`salvarTarefas`, `carregarTarefasSalvas`) encapsulam toda a lógica de interação com o `localStorage`.

- **Módulos de Renderização**  
  A função central `exibirTarefas()` é a única responsável por manipular o DOM e renderizar a lista, recebendo o array de dados já filtrado ou pesquisado.

- **Nomenclatura Consistente**  
  Variáveis e funções utilizam **nomes em português** que refletem claramente seu propósito  
  *(Ex: `adicionarTarefa`, `campoPesquisa`, `alternarConclusao`).*

---

## 💻 Como Executar

Para rodar este projeto localmente:

1. **Clone ou baixe** os arquivos `index.html` e `script.js` para uma pasta no seu computador.  
2. **Abra** o arquivo `index.html` diretamente no navegador.  
3. *(Opcional)* Utilize uma extensão como **Live Server (VS Code)** para iniciar um servidor local e visualizar as mudanças em tempo real.

---

## 🧩 Tecnologias Utilizadas

- **HTML5**
- **CSS3 (Tailwind CSS)**
- **JavaScript (Vanilla JS)**
- **LocalStorage (persistência de dados)**

---

## 📚 Autor

Desenvolvido com foco em **simplicidade, organização e boas práticas** de programação.  
Sinta-se à vontade para usar, modificar e aprimorar este projeto! 💡
