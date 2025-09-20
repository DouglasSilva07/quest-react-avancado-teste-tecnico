# **Pokédex** **React**

## 📌 Propósito da aplicação

Esta aplicação tem como objetivo listar, pesquisar e exibir detalhes de diferentes Pokémons utilizando a PokéAPI
.
Ela foi desenvolvida como um desafio prático para demonstrar conhecimentos em React, TypeScript, consumo de APIs e gerenciamento de estado.


## ⚡ **Funcionalidades**

Listagem de Pokémons paginada, carregando 10 por vez.

Busca por nome de Pokémon.

Busca por tipo de Pokémon (ex.: fire, water, grass etc.).

Exibição detalhada de um Pokémon com nome, imagem, tipos, habilidades (skills) e movimentos (moves).

Alternância de tema entre light e dark, persistido no localStorage.

Navegação entre páginas (lista e detalhes) com react-router-dom.

Tratamento de erros e feedback visual de carregamento.


## 🛠️ **Ferramentas** **utilizadas**

React + Vite → base da aplicação, rápido e moderno.

TypeScript → maior segurança e clareza no código.

React Router DOM → para gerenciar as rotas de listagem e detalhes.

Axios → para consumo da PokéAPI.

TailwindCSS → para estilização rápida e responsiva.

Context API → para gerenciamento do tema (dark/light).

### 🔎 **Por que essas escolhas?**

React + Vite: inicialização rápida e melhor performance no ambiente de desenvolvimento.

TypeScript: garante tipagem forte e evita erros comuns de dados vindos da API.

React Router: simplifica a navegação entre telas (listagem ↔ detalhes).

Axios: mais prático para chamadas HTTP do que fetch puro.

TailwindCSS: flexibilidade na estilização sem precisar criar diversos arquivos de CSS.

Context API: solução leve e simples para compartilhar estado global (tema).

### 📐 **Decisões de planejamento e execução**

Paginação manual com offset → para não sobrecarregar a tela nem a API, limitando a busca a 10 resultados por vez.

Separação por serviços (pokemonServices) → garante organização e reaproveitamento das chamadas à API.

Hook customizado (usePokemonSearch) → centraliza a lógica de pesquisa, melhorando a reutilização e testabilidade.

Persistência de tema no localStorage → experiência personalizada entre sessões.

Tratamento de erros e loading states → evita telas quebradas e melhora a usabilidade.


## 🚀 **Como rodar o projeto**
Pré-requisitos

Node.js (>= 18)

npm ou yarn

Passos
# 1. Clone o repositório
```git clone https://github.com/DouglasSilva07/quest-react-avancado-teste-tecnico.git```

# 2. Acesse a pasta do projeto
```cd pokedex-react```

# 3. Instale as dependências
```npm install```
# ou
```yarn install```

# 4. Inicie o servidor de desenvolvimento
```npm run dev```
# ou
```yarn dev```

# 5. Acesse no navegador
http://localhost:5173


```### 📂** Estrutura do projeto (resumida)**
src/
 ├── components/
 │    ├── PokemonsList.tsx      # Lista e busca de pokémons
 │    ├── header.tsx      # Header da Pokedéx
 │    ├──Details/
 │           ├── PokemonDetails.tsx    # Detalhes de um pokémon
 │    
 │
 ├── contexts/
 │    ├── ThemeContext.tsx      # Contexto do tema
 │    ├── theme.ts
 │    ├──Provider/ 
 │        ├── ThemeProvider.tsx      # Provider do tema
 │
 ├── hooks/
 │    ├── usePokemonSearch.tsx   # Hook customizado de busca
 │
 ├── services/
 │    ├── api.tsx                # Configuração base do Axios
 │    ├── PokemonServices.tsx    # Funções de chamada à API
 │
 ├── pages/
 │    ├── PokemonCard.tsx    # Rota da listagem dos Pokemons
 │    ├── PokemonSpecifics.tsx    # Rota dos detalhes dos Pokemons
 │    ├── routes.tsx         # Rotas principais
 │
 ├── tipos/
 │    ├── tipos.ts              # Tipagem de dados
 │
 ├── App.tsx # Onde é renderizado todos os elementos
 │
 ├── Main.tsx # Main da aplicação
```

### ✅ **Resultado esperado**

Listagem inicial de Pokémons.

Pesquisa por nome ou tipo funcionando.

Alternância de tema (dark/light).

Página de detalhes com informações do Pokémon selecionado.
