import mongoose from 'mongoose'; 
const ClientePolizaSchema = new mongoose.Schema({
id_cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
},
id_poliza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poliza',
    required: true
},
estado_pago: {
    type: Boolean,
    default: false
},
fecha_pago: {
    type: Date,
    default: null
},
fecha_vencimiento: {
    type: Date,
    default: null
}
}, { timestamps: true });
export default mongoose.model('ClientePoliza', ClientePolizaSchema);