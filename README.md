# Tela de login — Angular

Atividade de Desenvolvimento Web com um componente Angular de login, baseado no modelo fornecido: opção **Criar conta** no topo, campos de **E-mail** e **Senha**, opção **Esqueci a senha** e botão **Entrar**.

## Executar

Pré-requisitos: Node.js compatível com Angular 22 (22.22.3+, 24.15+ ou 26+) e npm. O projeto foi preparado com Node.js 24.

Abra um terminal **dentro da pasta `Tela_login`** e execute:

```bash
npm install
npm start
```

Abra <http://localhost:4200>. Se as dependências já estiverem instaladas, basta executar `npm start`.

## Conferir o requisito principal

1. Abra as ferramentas de desenvolvedor do navegador com **F12** ou **Ctrl + Shift + J** e selecione **Console**.
2. Preencha o e-mail e a senha com dados fictícios. Exemplo: `aluno@exemplo.com` e `senha-ficticia-123`.
3. Clique em **Entrar**, ou pressione Enter dentro do formulário.
4. Veja o registro no console:

```text
Dados do login: { email: 'aluno@exemplo.com', senha: 'senha-ficticia-123' }
```

O log aparece **no navegador**, não no terminal do `npm start`.

## Como funciona

- `src/app/app.ts`: componente principal, que exibe `<app-login />`.
- `src/app/login/login.ts`: propriedades que recebem os dados e métodos `entrar`, `recuperarSenha`, `criarConta` e `mudarTela`.
- `src/app/login/login.html`: estrutura dos formulários. `[(ngModel)]` conecta os campos às propriedades do TypeScript; `(ngSubmit)` chama o método ao enviar.
- `src/app/login/login.css`: aparência do componente e adaptação para celular.
- `src/styles.css`: estilos globais.
- `src/app/login/login.spec.ts`: testes das interações dos formulários, das validações e do registro no console.

O componente importa `FormsModule` para utilizar `ngModel` e `ngForm`. Referência: [formulários orientados a template na documentação do Angular](https://angular.dev/guide/forms/template-driven-forms).

### Recursos

- Validação de e-mail e campos obrigatórios, com mensagens junto aos campos.
- Botão para mostrar ou ocultar a senha do login.
- **Esqueci a senha** abre um formulário de recuperação com validação de e-mail.
- **Criar conta** abre um formulário com nome, e-mail, senha de pelo menos 6 caracteres e confirmação de senha.
- Os formulários secundários permitem voltar ao login.
- Labels associados aos campos, foco de teclado e mensagens anunciadas por leitores de tela.

### Escopo da atividade

A aplicação demonstra o envio de dados do HTML ao TypeScript. O login não autentica usuários. Cadastro e recuperação são demonstrações locais: não há banco de dados, armazenamento de contas nem envio de e-mail. As mensagens da tela deixam isso explícito.

A senha do login é impressa somente para cumprir o enunciado. Use dados fictícios; em um sistema real, senhas não devem ser registradas em logs.

## Verificar

```bash
npm run build
npm test
```

A versão de produção é gerada em `dist/tela-login/browser`.
