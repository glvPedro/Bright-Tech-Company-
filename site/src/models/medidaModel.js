var database = require("../database/config");

function buscarUltimasMedidas(idEmpresa, setor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select count(captura.chave) as media, captura.momento as momento from setor join sensor on setor.idsetor = sensor.fkSetor
														left join captura on sensor.idsensor = captura.fkSensor
                                                        where fkEmpresa = ${idEmpresa} and setor.nome = '${setor}'
                                                        group by day(captura.momento) order by captura.momento desc limit 5;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoSetor(idEmpresa, setor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,   
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select count(captura.chave) as media, captura.momento as momento from setor join sensor on setor.idsetor = sensor.fkSetor
														left join captura on sensor.idsensor = captura.fkSensor
                                                        where fkEmpresa = ${idEmpresa} and setor.nome = '${setor}'
                                                        group by day(captura.momento) order by captura.momento desc limit 5;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    graficoSetor
}