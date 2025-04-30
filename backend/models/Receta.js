
import mongoose from "mongoose";
/**
 * @module models/Receta
 * @description Esquema de Mongoose para almacenar recetas en la Aseguradora,
 *              alineado al esquema utilizado por la Farmacia.
 *
 * @typedef {Object} Medicamento
 * @property {string} idMedicamento   - Identificador único del medicamento.
 * @property {string} nombre          - Nombre del medicamento.
 * @property {string} presentacion    - Presentación del medicamento (p. ej., tabletas, jarabe).
 * @property {number} cantidad        - Cantidad prescrita al paciente.
 * @property {number} precio_unitario - Precio unitario del medicamento.
 * @property {boolean} disponible     - Indica si el medicamento está disponible en stock.
 *
 * @typedef {Object} Receta
 * @property {string} codigo         - Código único de la receta.
 * @property {string} cliente        - ID o nombre del cliente/paciente.
 * @property {string} farmacia       - Nombre de la farmacia que procesa la receta.
 * @property {Medicamento[]} medicamentos - Lista de medicamentos incluidos en la receta.
 * @property {number} total          - Monto total de la receta antes de aplicar descuento.
 * @property {number} descuento      - Monto del descuento aplicado por el seguro.
 * @property {number} totalFinal     - Monto final a pagar tras aplicar el descuento.
 * @property {string} estadoSeguro   - Estado de la validación del seguro:
 *                                      'aprobada', 'rechazada' o 'sin_póliza'.
 * @property {Date}   fechaEmision   - Fecha y hora de emisión de la receta.
 */



const recetaSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true
  },

  cliente: {
    type: String,
    required: true
  },

  farmacia: {
    type: String,
    required: true
  },

  medicamentos: [
    {
      idMedicamento: {
        type: String,
        required: true
      },
      nombre: {
        type: String,
        required: true
      },
      presentacion: {
        type: String,
        default: ""
      },
      cantidad: {
        type: Number,
        required: true
      },
      precio_unitario: {
        type: Number,
        required: true
      },
      disponible: {
        type: Boolean,
        default: true
      }
    }
  ],

  total: {
    type: Number,
    required: true,
    default: 0
  },
  descuento: {
    type: Number,
    required: true,
    default: 0
  },
  totalFinal: {
    type: Number,
    required: true,
    default: 0
  },

  estadoSeguro: {
    type: String,
    enum: ["aprobada", "rechazada", "sin_póliza"],
    default: "sin_póliza"
  },

  fechaEmision: {
    type: Date,
    default: () => new Date()
  }
});

export default mongoose.model("Receta", recetaSchema);
