import express from 'express';
import FichaTecnica from '../models/FichaTecnica.js';

const router = express.Router();

/**
 * Obtener todas las fichas técnicas
 */
router.get('/', async (req, res) => {
    try {
        const fichas = await FichaTecnica.find()
            .populate('clienteId', 'nombre apellido documento telefono fechaNacimiento direccion numeroAfiliacion')
            .populate('usuarioId', 'correo estado')
            .populate('seguroId', 'nombre codigo telefono correo');
        res.json(fichas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Obtener una ficha técnica por ID
 */
router.get('/:id', async (req, res) => {
    try {
        const ficha = await FichaTecnica.findById(req.params.id)
            .populate('clienteId', 'nombre apellido documento telefono fechaNacimiento direccion numeroAfiliacion')
            .populate('usuarioId', 'correo estado')
            .populate('seguroId', 'nombre codigo telefono correo');

        if (!ficha) return res.status(404).json({ message: "Ficha no encontrada" });

        res.json(ficha);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Actualizar una ficha técnica por ID
 */
router.put('/:id', async (req, res) => {
    try {
        const ficha = await FichaTecnica.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!ficha) return res.status(404).json({ message: "Ficha no encontrada" });

        res.json(ficha);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * Eliminar una ficha técnica por ID
 */
router.delete('/:id', async (req, res) => {
    try {
        const ficha = await FichaTecnica.findByIdAndDelete(req.params.id);

        if (!ficha) return res.status(404).json({ message: "Ficha no encontrada" });

        res.json({ message: "Ficha eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
  try {
      // Verificar si ya existe una ficha técnica para este cliente
      const fichaExistente = await FichaTecnica.findOne({ clienteId: req.body.clienteId });
      if (fichaExistente) {
          return res.status(400).json({ message: "El cliente ya tiene una ficha técnica registrada." });
      }

      // Crear una nueva ficha si no existe
      const nuevaFicha = new FichaTecnica(req.body);
      const fichaGuardada = await nuevaFicha.save();
      res.status(201).json(fichaGuardada);
  } catch (error) {
      console.error("Error al crear ficha técnica:", error);
      res.status(500).json({ message: "Error al crear ficha técnica", error });
  }
});


export default router;
