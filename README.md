# Bebeste

## Funcionalidades

1) criacao de usuarios
2) score de bebida (marca se o usuario bebeu no dia específico)
3) saldo incremental de cada participante

## Fluxo

1) Inicia o fluxo com a criação de todos os usuarios em uma tabela de score para o dia atual. Esse script roda todo dia de manha;
2) Gera um valor randomico para a cotação do dia e salva nos registros de score para facilitar o select
3) Quando o usuario clica em 'Bebi', o front manda o id do usuario + a data atual. Isso gera uma consulta na tabela de score e atualiza ela
4) No fim do dia outro script roda para somar os pontos e gerar um saldo que será salvo na tabela de participantes