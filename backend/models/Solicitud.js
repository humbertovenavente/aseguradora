const solicitudSchema = new mongoose.Schema({
  // Opcional para farmacia
  nombre: String,
  direccion: String,
  telefono: String,
  aseguradora: String,
  aseguradoraNombre: String,
  origen: String,
  codigoSolicitud: String,

  // Opcional para hospital
  afiliado: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" },
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: "Servicio" },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  monto: Number,
  fechaServicio: Date,
  comentarios: String,
  resultados: String,

  estado: { type: String, default: 'pendiente' }
}, { timestamps: true });
