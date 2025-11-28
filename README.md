# FaliAI  예측

**✨ Preveja o futuro da sua empresa com um clique! ✨**

O FaliAI é uma aplicação web (POC) que utiliza um modelo de inteligência artificial para prever a probabilidade de uma empresa falir. A partir de dados simples como o CNPJ e informações financeiras recentes, a ferramenta gera uma predição binária (0 para "não vai falir" e 1 para "vai falir"), oferecendo um insight rápido e direto sobre a saúde financeira do negócio.

## 🚀 Link de Produção

Acesse a aplicação em produção no seguinte link:
**[https://faliai.web.app](https://faliai.web.app)**

## 🛠️ Arquitetura e Tecnologias

O projeto foi estruturado seguindo os princípios da **Arquitetura Baseada em Features (Feature-Based Architecture)**. Essa abordagem organiza o código em torno de funcionalidades de negócio, o que facilita a manutenção, escalabilidade e o desenvolvimento paralelo.

```
src/
|
|-- components/        # Componentes de UI genéricos e reutilizáveis
|   |-- Button.tsx
|   |-- Card.tsx
|   |-- Input.tsx
|   |-- Select.tsx
|   +-- ToggleSwitch.tsx
|
|-- features/          # Lógica de negócio e componentes específicos
|   +-- prediction/    # Feature principal de predição
|       |-- components/  # Componentes da feature (CnpjForm, PredictionForm, etc.)
|       |-- hooks/       # Hooks específicos (usePrediction)
|       +-- types.ts     # Tipos e interfaces da feature
|
|-- pages/             # Páginas da aplicação que montam as features
|   +-- HomePage.tsx
|
|-- utils/             # Funções utilitárias puras
|
+-- App.tsx
+-- main.tsx
```

### Stack Principal

- **Vite:** Build tool de alta performance que oferece um ambiente de desenvolvimento rápido com Hot Module Replacement (HMR).
- **React:** Biblioteca para construção de interfaces de usuário.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática, aumentando a robustez e a manutenibilidade do código.
- **TailwindCSS:** Framework de CSS utility-first para estilização rápida e consistente.
- **Axios:** Cliente HTTP para realizar as chamadas para as APIs externas (consulta de estados no IBGE).

### Componentes

O fluxo da aplicação é orquestrado em `HomePage.tsx`, que gerencia a exibição dos seguintes componentes principais:

1.  **`CnpjForm`**: Formulário inicial onde o usuário insere o CNPJ.
2.  **`CompanyDetails` (Formulário de Predição)**: Após a primeira etapa, este componente renderiza um formulário para que o usuário insira dados financeiros adicionais (`tempo de atividade`, `dívidas`, `UF`, etc.).
3.  **`PredictionResult`**: Tela final que exibe o resultado da predição de forma bem-humorada.

## ⚙️ Como Rodar Localmente

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/faliai.git
    cd faliai
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

### Execução

1.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

2.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no terminal).

## ☁️ Deploy (CI/CD)

O deploy contínuo está configurado para automatizar a publicação do site em produção e a criação de previews para Pull Requests.

### Firebase Hosting

O projeto é hospedado no **Firebase Hosting**. A configuração se encontra no arquivo `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

- **`public`**: Define o diretório `dist` como a pasta pública, que contém os arquivos gerados pelo build.
- **`rewrites`**: Redireciona todas as rotas para o `index.html`, permitindo o funcionamento correto do roteamento do React (Single Page Application).

### GitHub Actions

Dois workflows de GitHub Actions foram configurados para automatizar o processo de build e deploy:

1.  **`firebase-hosting-pull-request.yml`**:
    - **Gatilho**: Abertura ou atualização de um Pull Request.
    - **Ação**: Realiza o build do projeto (`npm ci && npm run build`) e faz o deploy para um **canal de preview** no Firebase Hosting. Isso gera uma URL temporária para validar as alterações antes do merge.

2.  **`firebase-hosting-merge.yml`**:
    - **Gatilho**: Push para a branch `main`.
    - **Ação**: Realiza o build e faz o deploy para o **canal "live"** (produção), atualizando o site principal em [https://faliai.web.app](https://faliai.web.app).

Ambos os workflows utilizam `secrets` do GitHub para autenticação segura com o Firebase, garantindo que as credenciais não fiquem expostas no código.
