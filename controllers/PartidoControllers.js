import Partido from "../database/models/Partido.js";
import Prediccion from "../database/models/Prediccion.js";
import UserTabla from "../database/models/UserTabla.js";
import Tabla from "../database/models/Tabla.js";
import { Op } from "sequelize";

export const getPartido = async (req, res) => {
  const { fechaId } = req.params;

  try {
    const partidos = await Partido.findAll({
      where: {
        fechaId: fechaId,
      },
      order: [["id", "ASC"]],
    });

    res.json(partidos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPartido = async (req, res) => {
  const { local, visitante, fechaHora, competicionId, fechaId } = req.body;

  try {
    const newPartido = await Partido.create({
      local: local,
      visitante: visitante,
      fechaHora: fechaHora,
      competicionId: competicionId,
      enCurso: 0,
      fechaId: fechaId,
    });

    res.json(newPartido);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePartido = async (req, res) => {
  const { id } = req.params;
  const { golLocal, golVisitante } = req.body;

  try {
    const updatedPartido = await Partido.findByPk(id);

    updatedPartido.golLocal = golLocal;
    updatedPartido.golVisitante = golVisitante;

    if (updatedPartido.estado === 0) {
      updatedPartido.estado = 1;
    }

    await updatedPartido.save();

    //Iterar sobre las predicciones del partido
    //Solo necesito el id del partido, golesLocal y golesVisitante
    //******************************************************************************************************************
    const predicciones = await Prediccion.findAll({
      where: {
        partidoId: id,
      },
    });

    for (let i = 0; i < predicciones.length; i++) {
      let prediccionByPartido = predicciones[i].dataValues;

      let golLocal1 = prediccionByPartido.golLocal;
      let golVisitante1 = prediccionByPartido.golVisitante;

      let diferenciaDeGol = golLocal - golVisitante;
      let diferenciaDeGol1 = golLocal1 - golVisitante1;

      //Busco userTabla
      //Paso1 busco la tablaDePuntuaciones
      const tablaPuntuacionByCompId = await Tabla.findOne({
        where: {
          competicionId: updatedPartido.competicionId,
        },
      });
      //Paso2 busco la userTabla
      const userTablaByUserAndTablaId = await UserTabla.findOne({
        where: {
          userId: prediccionByPartido.userId,
          tablaId: tablaPuntuacionByCompId.id,
        },
      });

      //Busco prediccion
      const prediccionById = await Prediccion.findOne({
        where: {
          id: prediccionByPartido.id,
        },
      });

      if (prediccionByPartido.estado === 1) {
        userTablaByUserAndTablaId.puntos -= 3;
        userTablaByUserAndTablaId.ganador -= 1;
        await userTablaByUserAndTablaId.save();
      } else if (prediccionByPartido.estado === 2) {
        userTablaByUserAndTablaId.puntos -= 5;
        userTablaByUserAndTablaId.resultados -= 1;
        userTablaByUserAndTablaId.ganador -= 1;
        await userTablaByUserAndTablaId.save();
      }

      let aciertoLocal = diferenciaDeGol > 0 && diferenciaDeGol1 > 0;
      let aciertoVisitante = diferenciaDeGol < 0 && diferenciaDeGol1 < 0;
      let aciertoEmpate = diferenciaDeGol === 0 && diferenciaDeGol1 === 0;
      let resultado = golLocal1 === golLocal && golVisitante1 === golVisitante;

      if (aciertoLocal || aciertoVisitante || aciertoEmpate) {
        //Le acierta a los goles +5pts y +1 resultado y +1 ganador
        if (resultado) {
          userTablaByUserAndTablaId.puntos += 5;
          userTablaByUserAndTablaId.resultados += 1;
          userTablaByUserAndTablaId.ganador += 1;
          await userTablaByUserAndTablaId.save();

          prediccionById.estado = 2;
          await prediccionById.save();

          //Le acierta el ganador +3pts y +1 ganador
        } else {
          userTablaByUserAndTablaId.puntos += 3;
          userTablaByUserAndTablaId.ganador += 1;
          await userTablaByUserAndTablaId.save();

          prediccionById.estado = 1;
          await prediccionById.save();
        }

        //No acierta
      } else {
        prediccionById.estado = 3;
        await prediccionById.save();
      }
    }
    //******************************************************************************************************************

    res.json(updatedPartido);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePartidoEnCurso = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPartido = await Partido.findByPk(id);

    updatedPartido.enCurso = 1;
    updatedPartido.golLocal = 0;
    updatedPartido.golVisitante = 0;

    await updatedPartido.save();

    let golesLocal = updatedPartido.golLocal;
    let golesVisitante = updatedPartido.golVisitante;

    //Iterar sobre las predicciones del partido
    //Solo necesito el id del partido, golesLocal y golesVisitante
    //******************************************************************************************************************
    const predicciones = await Prediccion.findAll({
      where: {
        partidoId: id,
      },
    });

    for (let i = 0; i < predicciones.length; i++) {
      let prediccionByPartido = predicciones[i].dataValues;

      let golesLocal1 = prediccionByPartido.golLocal;
      let golesVisitante1 = prediccionByPartido.golVisitante;

      let diferenciaDeGol = golesLocal - golesVisitante;
      let diferenciaDeGol1 = golesLocal1 - golesVisitante1;

      //Busco userTabla
      //Paso1 busco la tablaDePuntuaciones
      const tablaPuntuacionByCompId = await Tabla.findOne({
        where: {
          competicionId: updatedPartido.competicionId,
        },
      });

      //Paso2 busco la userTabla
      const userTablaByUserAndTablaId = await UserTabla.findOne({
        where: {
          userId: prediccionByPartido.userId,
          tablaId: tablaPuntuacionByCompId.id,
        },
      });

      //Busco prediccion
      const prediccionById = await Prediccion.findOne({
        where: {
          id: prediccionByPartido.id,
        },
      });

      if (diferenciaDeGol === diferenciaDeGol1) {
        //Le acierta a los goles +5pts y +1 resultado y +1 ganador
        if (golesLocal1 === golesLocal && golesVisitante1 === golesVisitante) {
          userTablaByUserAndTablaId.puntos += 5;
          userTablaByUserAndTablaId.resultados += 1;
          userTablaByUserAndTablaId.ganador += 1;
          await userTablaByUserAndTablaId.save();

          prediccionById.estado = 2;
          await prediccionById.save();

          //Le acierta el ganador +3pts y +1 ganador
        } else {
          userTablaByUserAndTablaId.puntos += 3;
          userTablaByUserAndTablaId.ganador += 1;
          await userTablaByUserAndTablaId.save();

          prediccionById.estado = 1;
          await prediccionById.save();
        }

        //No acierta
      } else {
        prediccionById.estado = 3;
        await prediccionById.save();
      }
    }
    //******************************************************************************************************************

    res.json(updatedPartido);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePartidoFinal = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPartido = await Partido.findByPk(id);

    updatedPartido.enCurso = 2;

    await updatedPartido.save();

    res.json(updatedPartido);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPartidoById = async (req, res) => {
  const { id } = req.params;

  try {
    const partidoById = await Partido.findByPk(id);

    res.json(partidoById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPartidoByFecha = async (req, res) => {
  const { fecha } = req.body;
  let dateFrom = fecha + "T00:00:00.000Z";
  let dateTo = fecha + "T23:59:59.000Z";
  try {
    const partidoByFecha = await Partido.findAll({
      where: {
        fechaHora: {
          [Op.between]: [dateFrom, dateTo],
        },
      },
    });
    res.json(partidoByFecha);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
