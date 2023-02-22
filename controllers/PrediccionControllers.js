import Prediccion from "../database/models/Prediccion.js";
import User from "../database/models/User.js";

export const getPrediccion = async (req, res) => {
  try {
    const predicciones = await Prediccion.findAll();

    res.json(predicciones);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPrediccion = async (req, res) => {
  const { golLocal, golVisitante, partidoId, userId } = req.body;

  try {
    const newPrediccion = await Prediccion.create({
      golLocal: golLocal,
      golVisitante: golVisitante,
      partidoId: partidoId,
      userId: userId,
      estado: 0,
    });

    res.json(newPrediccion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePrediccion = async (req, res) => {
  const { id } = req.params;
  const { golLocal, golVisitante } = req.body;

  try {
    const updatedPrediccion = await Prediccion.findByPk(id);

    updatedPrediccion.golLocal = golLocal;
    updatedPrediccion.golVisitante = golVisitante;

    await updatedPrediccion.save();

    res.json(updatedPrediccion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPrediccionById = async (req, res) => {
  const { id } = req.params;

  try {
    const prediccionById = await Prediccion.findByPk(id);

    res.json(prediccionById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPrediccionByPartidoId = async (req, res) => {
  const { id } = req.params;

  try {
    const predicciones = await Prediccion.findAll({
      where: {
        partidoId: id,
      },
      order: [["userId", "ASC"]],
    });

    res.json(predicciones);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
