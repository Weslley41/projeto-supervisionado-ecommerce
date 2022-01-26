# Ecommerce

## Sumário
1. [Sobre o projeto](#sobre-o-projeto)
2. [Configuração](#configuração)
3. [Links de acesso](#links-de-acesso)
4. [Permissão de administrador](#administrador)

## Sobre o projeto
Este projeto é o trabalho de conclusão do curso Técnico em Informática feito no IFPI - Campus Parnaíba. Seus requisitos eram de possibilitar ao administrador publicar, editar e controlar seus produtos, e permitindo aos usuários pesquisar, ver, favoritar e fazer pedido dos mesmos.

Você pode conferir todos os requisitos com mais detalhes [clicando aqui](https://github.com/Weslley41/projeto-supervisionado-ecommerce/blob/master/doc/Documento%20de%20Requisitos.pdf).

## Configuração
Para utilizar o serviço de login da Google será necessário instalar o [league/oauth2-google](https://packagist.org/packages/league/oauth2-google), para instalar ele você pode usar o [composer](https://getcomposer.org/) e rodar o seguinte comando:
```
composer require league/oauth2-google
```

Existem dois arquivos de configuração no projeto.

O [primeiro](php/db/config.php) é o de conexão com a base de dados, altere caso necessário.

E o [segundo](php/login/config_oauth.php) é o de conexão com o oauth2.

Nele será necessário inserir duas chaves, a `clientId` e a `clientSecret`, para pegá-las entre na plataforma da [google](https://console.cloud.google.com/), acesse `APIs e serviços > Credenciais`
e crie uma nova credencial como `ID do cliente OAuth`, caso não possua uma `Tela de permissão OAuth` será necessário criá-la acessando `APIs e serviços > Tela de permissão OAuth`.

Para página inicial usei o link local 'http://localhost/ecommerce/php/view/user/home.php' e para a `redirectUri` 'http://localhost/ecommerce/php/login/'.


## Links de acesso
Com o servidor iniciado você poderá acessar:

[Página de login](http://localhost/ecommerce/php/login/)

[Página do usuário](http://localhost/ecommerce/php/view/user/home.php)

[Página do administrador](http://localhost/ecommerce/php/view/admin/home.php)

## Administrador
Para ter acesso às funções de administrador você precisará dar permissão ao seu usuário, por meio de um shell SQL:
```
USE ecommerce;
UPDATE usuarios SET adm = true WHERE id = 'idUsuario';
```
Substituindo o valor `idUsuario` pela id do seu usuário, para consultá-la basta executar o comando a a seguir e identificá-lo.
```
SELECT * FROM usuarios;
```
Para remover a permissão de um usuário basta alterar o valor `true` do primeiro comando para `false`.
