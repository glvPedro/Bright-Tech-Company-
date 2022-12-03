var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    var idEmpresa = req.params.id;
    var setor = req.body.dia;
 
    medidaModel.buscarUltimasMedidas(idEmpresa, setor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function graficoSetor(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var setor = req.params.setor;

    medidaModel.graficoSetor(idEmpresa, setor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    graficoSetor
}