# Como Contribuir para o Seeb

Olá! Agradecemos imensamente seu interesse em contribuir para o Seeb. Esta extensão de navegador de código aberto tem como missão tornar a web um ambiente mais acessível, e sua colaboração é fundamental para o sucesso e a evolução contínua do projeto.

---

## 🤝 Nosso Código de Conduta

Para garantir um ambiente de colaboração respeitoso e acolhedor para todos, exigimos que todos os contribuidores sigam o nosso [Código de Conduta](./CODE_OF_CONDUCT.md). Sua participação implica na concordância com os princípios estabelecidos neste documento.

---

## ✅ Formas de Contribuição

Você pode contribuir com o Seeb de diversas maneiras, mesmo sem experiência aprofundada em codificação:

* **Reportar Bugs:** Ajude-nos a identificar e corrigir comportamentos inesperados utilizando nosso [Template de Relatório de Bug](./.github/ISSUE_TEMPLATE/bug_report.md).
* **Sugerir Novas Funcionalidades:** Compartilhe suas ideias para aprimorar o Seeb utilizando nosso [Template de Solicitação de Funcionalidade](./.github/ISSUE_TEMPLATE/feature_request.md).
* **Melhorar o Código:** Contribuindo com novas funcionalidades, corrigindo problemas existentes ou otimizando o código.
* **Atualizar a Documentação:** Aprimorando a clareza, corrigindo informações ou adicionando novos guias e exemplos.
* **Otimizar Design e Experiência do Usuário (UI/UX):** Propondo e implementando melhorias visuais e de interação.

---

## ⚙️ Configuração do Ambiente de Desenvolvimento

Para começar a contribuir com código, siga estes passos para configurar seu ambiente:

1.  **Faça um Fork e Clone:** Realize um fork do repositório oficial ([devrafcks/seeb-extension](https://github.com/devrafcks/seeb-extension)) e clone seu fork localmente.
    ```bash
    git clone [https://github.com/SEU_USUARIO/seeb-extension.git](https://github.com/SEU_USUARIO/seeb-extension.git)
    cd seeb-extension
    ```
    *(Substitua `SEU_USUARIO` pelo seu username do GitHub.)*

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```
    *Certifique-se de ter o [Node.js e o npm](https://nodejs.org/en/download/) instalados em sua máquina.*

3.  **Crie uma Nova Branch:**
    Crie um branch específico para suas alterações, utilizando um nome descritivo que siga as nossas [convenções](#-padrao-de-commits).
    ```bash
    git checkout -b tipo/descricao-da-sua-mudanca
    # Ex: git checkout -b feat/funcionalidade-modo-leitura
    ```

---

## 🧱 Onde Codificar

Suas alterações de código deverão ser feitas, preferencialmente, nas seguintes pastas:

* `src/js/` – Contém a lógica principal e os scripts JavaScript da extensão.
* `src/css/` – Contém os arquivos de estilo (CSS) da extensão.
* `manifest.json` – O arquivo de configuração central da extensão.

---

##  Gerando o Build e Testando Localmente

Após implementar suas alterações, é **crucial** gerar o build final e testar a extensão em seu navegador:

1.  **Gere o Build Final:**
    ```bash
    npm run build
    ```
    Este comando criará ou atualizará a pasta `dist/`, que contém os arquivos otimizados da extensão.

2.  **Teste no Navegador (Chromium-based):**
    * Abra seu navegador (ex: Chrome, Edge, Brave) e digite `chrome://extensions/` na barra de endereço.
    * Ative o **"Modo desenvolvedor"**.
    * Clique em **"Carregar sem compactação"** (ou "Load unpacked") e selecione a pasta `dist/` do seu projeto.
    * Teste a extensão em diferentes sites e cenários para garantir que a funcionalidade está correta e que não houve regressões.

---

##  Padrão de Commits

Para manter o histórico de commits claro e organizado, utilize o formato: `tipo: breve descrição da mudança`.

**Tipos de Commit Aceitos:**

* `feat`: **Nova funcionalidade** ou adição significativa de código.
* `fix`: **Correção de bug** ou comportamento inesperado.
* `doc`: **Alterações ou adições na documentação** (README, guias, comentários no código).
* `style`: Ajustes de **estilo ou formatação de código** que não alteram a lógica (espaços, identação, etc.).
* `refactor`: **Reestruturação de código** que não adiciona funcionalidade nem corrige bug.
* `chore`: **Tarefas de manutenção** ou configuração que não afetam o código-fonte diretamente (ex: atualizações de dependências).

**Exemplos:**

* `feat: implementar modo de alto contraste`
* `fix: corrigir falha no botão de fechar painel`
* `doc: atualizar README com instruções de build`
* `style: padronizar espaçamento de funções`
* `refactor: otimizar lógica de inicialização`
* `chore: atualizar versão do webpack`

---

##  Processo de Pull Request (PR)

Após finalizar suas alterações e testes:

1.  **Commit das Mudanças:** Certifique-se de que todas as suas alterações relevantes foram commitadas localmente seguindo o [Padrão de Commits](#-padrao-de-commits).
2.  **Envie para o Fork:** Envie sua branch local para o seu repositório forkado no GitHub.
    ```bash
    git push origin sua-branch-aqui
    ```
3.  **Abra um Pull Request:** Acesse a página do seu fork no GitHub e clique em "New pull request" ou "Compare & pull request".
4.  **Preencha o Template:** Utilize o nosso **[template de Pull Request](./.github/PULL_REQUEST_TEMPLATE.md)**, que será carregado automaticamente, para descrever suas alterações de forma clara e completa.
5.  **Aguarde a Revisão:** Seu PR será revisado pelos mantenedores do projeto. Esteja aberto(a) a feedbacks e sugestões de melhoria o objetivo é sempre aprimorar o Seeb juntos!

---

##  Dicas Finais para Contribuição Eficaz

* **Teste Suas Mudanças:** Sempre valide suas alterações localmente antes de abrir um PR.
* **Mantenha o Foco:** Limite cada contribuição a uma única tarefa ou funcionalidade para facilitar a revisão.
* **Comunicação Clara:** Utilize os templates de Issues e PRs para descrever seu trabalho de forma objetiva.
* **Seja Respeitoso:** Mantenha um tom profissional e seja aberto(a) a feedbacks construtivos durante todo o processo de revisão.

---

Agradecemos sinceramente por sua dedicação ao Seeb! Juntos, vamos construir uma internet mais acessível para todos. 💜