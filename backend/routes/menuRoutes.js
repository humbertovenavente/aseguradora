import express from 'express';
import Menu from '../models/Menu.js';

const router = express.Router();

// Obtener menú por tipo (principal o lateral)
router.get('/:tipo', async (req, res) => {
  const { tipo } = req.params;
  try {
    const menu = await Menu.findOne({ tipo });
    if (!menu) return res.status(404).json({ message: 'Menú no encontrado' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el menú' });
  }
});

// Crear menú
router.post('/', async (req, res) => {
  try {
    const nuevoMenu = new Menu(req.body);
    const guardado = await nuevoMenu.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear el menú', message: err.message });
  }
});

// Editar menú por tipo
router.put('/:tipo', async (req, res) => {
  const { tipo } = req.params;
  try {
    const actualizado = await Menu.findOneAndUpdate(
      { tipo },
      req.body,
      { new: true, upsert: true }
    );
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el menú', message: err.message });
  }
});

// Eliminar menú por tipo
router.delete('/:tipo', async (req, res) => {
  const { tipo } = req.params;
  try {
    const eliminado = await Menu.findOneAndDelete({ tipo });
    if (!eliminado) return res.status(404).json({ message: 'Menú no encontrado' });
    res.json({ message: 'Menú eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el menú', message: err.message });
  }
});

export default router;
