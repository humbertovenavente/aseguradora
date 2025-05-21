import mongoose from "mongoose";

const ServicioFarmaciaSchema = new mongoose.Schema({
  nombre:    { type: String, required: true, unique: true },
  baseUrl:   { type: String, required: true },
  activo:    { type: Boolean, default: true },
  creado:    { type: Date, default: () => new Date() },
});

export default mongoose.model('ServicioFarmacia', ServicioFarmaciaSchema);
