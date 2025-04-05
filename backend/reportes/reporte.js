import express from 'express';
import Cliente from '../models/Clientes.js';
import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

const router = express.Router();

/**
 * Genera y guarda un Excel con todos los servicios por hospital en un mes
 * Ruta: GET /api/reporte/hospital/:mes/exportar
 * Ej: /api/reporte/hospital/2025-04/exportar
 */
router.get('/hospital/:mes/exportar', async (req, res) => {
  try {
    const { mes } = req.params; // Ej: "2025-04"
    const inicioMes = new Date(`${mes}-01T00:00:00Z`);
    const finMes = new Date(new Date(inicioMes).setMonth(inicioMes.getMonth() + 1));

    const clientes = await Cliente.find({
      "historialServicios.fechaServicio": { $gte: inicioMes, $lt: finMes }
    })
      .populate("historialServicios.hospital")
      .populate("historialServicios.servicio");

    // Agrupar servicios por hospital
    const agrupado = {};

    clientes.forEach(cliente => {
      cliente.historialServicios.forEach(h => {
        if (h.fechaServicio >= inicioMes && h.fechaServicio < finMes) {
          const hospitalId = h.hospital?._id?.toString();
          if (!agrupado[hospitalId]) {
            agrupado[hospitalId] = {
              nombre: h.hospital.nombre,
              servicios: [],
              total: 0
            };
          }
          agrupado[hospitalId].servicios.push({
            fecha: h.fechaServicio.toISOString().slice(0, 10),
            cliente: `${cliente.nombre} ${cliente.apellido}`,
            servicio: h.servicio?.nombre || 'Desconocido',
            costo: h.costo,
            copago: h.copago
          });
          agrupado[hospitalId].total += h.costo;
        }
      });
    });

    // Crear Excel por hospital
    const workbook = new ExcelJS.Workbook();

    for (const hospitalId in agrupado) {
      const { nombre, servicios, total } = agrupado[hospitalId];

      const sheet = workbook.addWorksheet(nombre.substring(0, 31));

      sheet.columns = [
        { header: 'Fecha', key: 'fecha', width: 15 },
        { header: 'Paciente', key: 'cliente', width: 25 },
        { header: 'Servicio', key: 'servicio', width: 25 },
        { header: 'Costo Total', key: 'costo', width: 15 },
        { header: 'Copago', key: 'copago', width: 15 }
      ];

      servicios.forEach(s => sheet.addRow(s));
      sheet.addRow([]);
      sheet.addRow(['', '', 'Total del mes:', total]);
    }

    const fileName = `reporte_hospital_${mes}.xlsx`;
    const filePath = path.join('reportes', fileName);

    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, fileName);
  } catch (error) {
    console.error("Error al generar reporte:", error);
    res.status(500).json({ message: "Error al generar el reporte.", error: error.message });
  }
});

export default router;
