import UserTabla from "../database/models/UserTabla.js";

export const createUserTabla = async (req, res) => {
  const { userId, tablaId } = req.body;

  try {
    const newUserTabla = await UserTabla.create({
      userId: userId,
      tablaId: tablaId,
      puntos: 0,
      resultados: 0,
      ganador: 0,
    });

    res.json(newUserTabla);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserTablaByTablaId = async (req, res) => {
  const { tablaId } = req.params;

  try {
    const tablaById = await UserTabla.findAll({
      where: {
        tablaId: tablaId,
      },
    });

    res.json(tablaById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
