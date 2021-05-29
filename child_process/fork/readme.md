# Início

Comecei meu aprendizado profundo de nodejs pelas beradas. Vim ao site do nodejs e entrei na página que fala sobre o projeto.
De cada já vi alguma coisa sobre servidor HTTP, criado de uma maneira bem simples e logo no final da página temos uma breve fala sobre o módulo child_process. Então, vamos iniciar por esse modulo e criar um programa que nos possibilite brincar um pouco com processos filhos.

# A ideia

A minha ideia de programa será uma coisa até que bem útil. Para utilizar os dois exemplos dessa página, vou criar um programa que inicie um servidor HTTP num processo filho. O programa superior, estará esperando por comandos que dirá o que fazer com o servidor http. 

Como sempre precisamos atualizar o servidor para vermos as alterações depois de modficações nos arquivos HTML do frontend. O primeiro comando será para atualizar o servidor. Reiniciar a instância do server. Ainda não sei como fazer isso, mas não deve ser complicado.

Seguindo o nodemon, para atualizar nosso servidor escreveremos na linha de comando rs + enter e o servidor deve reiniciar.

Vamos ao código.

# Ao código

A primeira coisa que fiz foi configurar o ambiente que gosto de trabalhar. Vou escrever em typescript ao invés de JS direto. Uma por que gosto muito do TS e outra por que estou tentando também evoulir na linguagem.

Resumindo: 

```bash
yarn --init
yarn add -D tsc typescript
yarn tsc --init
```
Editei o arquivo tsconfig.json com as configurações que preciso e pronto.

Agora vou criar o script de compilação e execução no package. O script será o run e o build.

Já no ínicio do projeto estou tendo problemas com a configuração. O VSCode não estava reconhecendo o http lib do nodejs. Mesmo depois de eu instalar o @types/node que contém todas as definições necessárias. Mas esse problema se deu por conta do VSCode está rodando por WSL e a atualização ser porca.

Continuando...

Enfim consegui fazer o script funcionar. Vou publicar no git e mais tarde, eu falo sobre.

# O Monitor

Todo o código desenvolido é bem simples. Acredito que se fosse em outras linguagens, teriam um grau de complexidade muito maior. Até mesmo linguagens conhecidas por ser simples como python, ruby. Fica ai talvez um desafio.
Não vou falar sobre o código do servidor http por que ele foi só um auxiliar para meu experimento. Então indo ao que interessa.

A minha ideia é executar o monitor da seguinte maneira

```bash
yarn node dist/monitor.js dist/http.js
```

O que acontece aqui é que o node vai estar iniciando o monitor.js e o monitor.js estará executando o http.js. Então para iniciar tratei de resolver o caminho do arquivo que vou roldar com um processo filho. 

```node
const childFile = path.join(process.cwd(), process.argv[2]);
```

Na próxima linha já inicio o processo filho com a chamada para servidor http.

```node
let child = fork(childFile);
```

A partir dai, vamos deixar no app princpal um observador para a entrada de dados do processo, assim, não permitimos que o programa principal finalize e temos a oportunidade de recebermos entradas de comandos para executar no nosso servidor http.

```node
process.stdin.on('data', data => {
    const command = data.toString('utf-8');

    if (command.indexOf('rs') !== -1) {
        if (child.kill('SIGKILL')) {
            child = fork(childFile);
            console.log("restart server");
        }
    }

    if (command.indexOf('quit') !== -1) {
        if (child.kill('SIGKILL')) {
            process.exit(0);
        }
    }
});
```

Dentro da função passada para o observador verificamos a entrada do usuário e definimos dois comandos: quit e rs. Quit finaliza e rs restarta o http.

através do retorno do método fork. Obtemos uma instância que controla o processo filho. Assim, podemos por exemplo executar o comando kill com o sinal SIGKILL que finaliza o processo filho. A chamada kill, retorna um booleano, que eu checo e logo após já aproveitando a mesma variável, faço novamente o fork do script, fazendo-o rodar como filho.

no comando quit. Eu primeiro finalizo o processo filho e logo após o processo principal. Se eu não finalizar primeiro o processo filho, o processo principal, continuará executando até ser interrompido pelo sistema. 

Gostei muito de ter adquirido mais este conhecimento. Vou continuar a ler a documentação e tudo o que for possível eu vou jogar por aqui. 

Obrigado pela leitura.
