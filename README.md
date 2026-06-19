# 📚 Sistema de Gerenciamento de Turmas

Sistema web desenvolvido para permitir que um professor realize login, cadastre turmas, visualize suas turmas, registre atividades, exclua turmas (quando permitido) e realize logout.

---

# 👨‍💻 Tecnologias Utilizadas

## IDE

* Visual Studio Code (VS Code)

## Servidor de Aplicação

* Node.js

## Banco de Dados
* Schema Prisma
* MySQL 
* XAMPP (Apache + MySQL)

## Linguagens

### Back-end

* JavaScript (Node.js)

### Front-end

* JavaScript
* HTML
* CSS


# 📁 Estrutura do Projeto

```text
escola full stack/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── prisma.js
│   └── server.js
│
├── frontend/
│   ├── login.html/
│   ├── style.css/
│   ├── professor.html/
|   ├── atividade.html/
│   └── script.js
│
├── assets/
│   ├── Cadastrar Atividade.png
│   ├── Cadastro de Turmas.png
│   ├── Pagina Atividades.png
│   ├── Pagina Login.png
│   └── Pagina Turmas.png
│
└── docs/
    ├── Insomnia_2026-06-17
    └── README.md
```

---

# ✅ Funcionalidades

* Login de professor
* Cadastro de turmas
* Listagem de turmas
* Exclusão de turmas
* Cadastro de atividades
* Listagem de atividades
* Logout

---

# 🖼️ Prints das Telas

## Tela de Login

![Tela de Login](ASSETS/Página%20Login.png)

---

## Tela Principal

![Tela Principal](ASSETS/Página%20Turmas.png)


## Cadastro de Turma

![Cadastro de Turma](ASSETS/Cadastro%20de%20Turmas.png)

---

## Tela de Atividades

![Tela Principal](ASSETS/Página%20Atividades.png)

## Cadastro de Atividade

![Cadastro de Turma](ASSETS/Cadastrar%20Atividade.png)


---

# ⚙️ Como Executar o Projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/Livia-singer08/escolaAvaliacao.git
```

Entre na pasta do projeto:

```bash
cd nome-do-projeto
```

---

## 2. Configurar o Banco de Dados

1. Abra o XAMPP.
2. Inicie o Apache e o MySQL.
3. Acesse o phpMyAdmin.
4. Crie o banco:

```sql
CREATE DATABASE turmas_db;
```

5. Importe o arquivo:

```
docs/banco.sql
```

---

## 3. Executar o Back-end

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure a conexão com o banco de dados no arquivo correspondente.

Execute:

```bash
npm start
```

ou

```bash
node server.js
```

Servidor disponível em:

```
http://localhost:3000
```

---

## 4. Executar o Front-end

Abra outro terminal.

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

ou

```bash
npm start
```

Acesse:

```
http://localhost:3000
```


---

# 🧪 Como Testar

## Login

Utilize um usuário cadastrado.

Exemplo:

```
Email: r.noris@gmail.com
Senha: senha123
```

## Cadastro de Turma

1. Faça login.
2. Clique em **Cadastrar Turma**.
3. Informe o nome da turma.
4. Clique em **Cadastrar**.

## Exclusão de Turma

1. Clique em **Excluir**.
2. Confirme a exclusão.
3. Caso existam atividades cadastradas, será exibida a mensagem:

```
Você não pode excluir uma turma com atividades cadastradas.
```

## Cadastro de Atividade

1. Clique em **Visualizar** na turma.
2. Clique em **Cadastrar Atividade**.
3. Informe a descrição.
4. Salve.

## Logout

Clique em **Sair** para encerrar a sessão e retornar à tela de login.

---

# 👤 Usuário para Testes

```
Email: r.noris@gmail.com
Senha: senha123
```

---

# 👨‍🎓 Autor

Lívia Mazzolini Guarizo
