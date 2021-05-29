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
