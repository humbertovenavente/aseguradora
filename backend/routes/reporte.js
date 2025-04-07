import express from 'express';
import Cliente from '../models/Clientes.js';
import Reporte from '../models/Reporte.js';
import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getPeriodoDateRange(mes) {
  const inicioMes = new Date(`${mes}-01T00:00:00Z`);
  const finMes = new Date(new Date(inicioMes).setMonth(inicioMes.getMonth() + 1));
  return { inicioMes, finMes };
}

// Generar y guardar reporte hospital (con archivo en base64)
router.get('/hospital/:mes/generar', async (req, res) => {
  const { mes } = req.params;
  const { inicioMes, finMes } = getPeriodoDateRange(mes);

  try {
    const clientes = await Cliente.find({
      "historialServicios.fechaServicio": { $gte: inicioMes, $lt: finMes }
    })
      .populate("historialServicios.hospital")
      .populate("historialServicios.servicio");

    const agrupado = {};

    clientes.forEach(cliente => {
      cliente.historialServicios.forEach(h => {
        if (h.fechaServicio >= inicioMes && h.fechaServicio < finMes) {
          const id = h.hospital?._id?.toString();
          if (!agrupado[id]) {
            agrupado[id] = {
              nombre: h.hospital.nombre,
              entidadId: h.hospital._id,
              servicios: [],
              total: 0
            };
          }

          agrupado[id].servicios.push({
            fecha: h.fechaServicio,
            servicioNombre: `${h.servicio?.nombre} (${h.servicio?.descripcion})`,
            clienteNombre: `${cliente.nombre} ${cliente.apellido}`,
            copago: h.copago,
            costoTotal: h.costo
          });

          agrupado[id].total += h.costo;
        }
      });
    });

    const reportesGuardados = [];

    for (const id in agrupado) {
      const data = agrupado[id];

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Reporte");

      sheet.columns = [
        { header: 'Fecha', key: 'fecha', width: 15 },
        { header: 'Paciente', key: 'clienteNombre', width: 25 },
        { header: 'Servicio', key: 'servicioNombre', width: 25 },
        { header: 'Costo Total', key: 'costoTotal', width: 15 },
        { header: 'Copago', key: 'copago', width: 15 }
      ];

      data.servicios.forEach(s => sheet.addRow(s));
      sheet.addRow([]);
      sheet.addRow(['', '', 'Total del mes', data.total]);

      //  Crear carpeta reportes si no existe
      const reportesDir = path.join(__dirname, '../reportes');
      if (!fs.existsSync(reportesDir)) {
        fs.mkdirSync(reportesDir, { recursive: true });
      }

      const fileName = `reporte_hospital_${mes}_${data.nombre.replace(/\s+/g, '_')}.xlsx`;
      const filePath = path.join(reportesDir, fileName);
      const fileUrl = path.posix.join('reportes', fileName);

      await workbook.xlsx.writeFile(filePath);
      const buffer = await workbook.xlsx.writeBuffer();
      const archivoExcelBase64 = buffer.toString('base64');

      const nuevoReporte = new Reporte({
        tipo: 'hospital',
        entidadId: data.entidadId,
        nombreEntidad: data.nombre,
        correoDestino: "",
        periodo: mes,
        servicios: data.servicios,
        totalMes: data.total,
        archivoExcelUrl: fileUrl,
        archivoExcelBase64,
        fechaGeneracion: new Date()
      });

      const guardado = await nuevoReporte.save();
      reportesGuardados.push(guardado);
    }

    res.status(200).json({ message: "Reportes generados", reportes: reportesGuardados });
  } catch (error) {
    console.error("Error generando reporte:", error);
    res.status(500).json({ message: "Error al generar reportes", error: error.message });
  }
});

//  Consultar reportes ya generados
router.get('/:tipo/:mes', async (req, res) => {
  try {
    const { tipo, mes } = req.params;
    const reportes = await Reporte.find({ tipo, periodo: mes });
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un reporte por ID
router.delete('/:id', async (req, res) => {
  try {
    await Reporte.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Reporte eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el reporte', error: error.message });
  }
});

export default router;
