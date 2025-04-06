import { createSignal, createEffect } from "solid-js";
import { getFichaTecnicaById, updateFichaTecnica } from "../services/fichaTecnicaService";
import { useParams, useNavigate } from "@solidjs/router";
import { actualizarCliente } from "../services/clientesService";

const FichaTecnicaDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [ficha, setFicha] = createSignal(null);
    const [isEditing, setIsEditing] = createSignal(false);

    createEffect(async () => {
        const data = await getFichaTecnicaById(params.id);
        setFicha(data);
    });

    const handleSave = async () => {
        try {
            // Obtener los datos editados del cliente
            const clienteActualizado = {
                nombre: ficha().clienteId?.nombre,
                apellido: ficha().clienteId?.apellido,
                documento: ficha().clienteId?.documento,
                telefono: ficha().clienteId?.telefono,
                fechaNacimiento: ficha().clienteId?.fechaNacimiento,
                direccion: ficha().clienteId?.direccion,
                numeroAfiliacion: ficha().clienteId?.numeroAfiliacion
            };
    
            // Actualizar el cliente en la base de datos
            await actualizarCliente(ficha().clienteId?._id, clienteActualizado);
            
            // También actualizar la ficha técnica (si hay otros cambios)
            await updateFichaTecnica(params.id, ficha());
    
            alert("Ficha y cliente actualizados correctamente");
            setIsEditing(false);
        } catch (error) {
            console.error("Error al actualizar la ficha técnica o cliente:", error);
        }
    };

    return (
        <div class="container">
            <h2 class="text-center">Detalle de la Ficha Técnica</h2>
            {ficha() ? (
                <div class="card">
                    <div class="card-body">
                        <h4>{ficha().clienteId?.nombre} {ficha().clienteId?.apellido}</h4>
                        <p><strong>DPI:</strong> {ficha().clienteId?.documento}</p>
                        <p><strong>Teléfono:</strong> {ficha().clienteId?.telefono || "No disponible"}</p>
                        <p><strong>Fecha de Nacimiento:</strong> {ficha().clienteId?.fechaNacimiento ? new Date(ficha().clienteId?.fechaNacimiento).toLocaleDateString() : "No disponible"}</p>
                        <p><strong>Dirección:</strong> {ficha().clienteId?.direccion || "No disponible"}</p>
                        <p><strong>Afiliación de Seguro:</strong> {ficha().clienteId?.numeroAfiliacion}</p>
                        <p><strong>Código de Seguro:</strong> {ficha().seguroId?.codigo}</p>
                        <p><strong># Carnet de Seguro:</strong> {ficha().usuarioId?._id}</p>
                        <p><strong>Correo:</strong> {ficha().usuarioId?.correo}</p>
                        <p><strong>Fecha Creación:</strong> {new Date(ficha().fechaCreacion).toLocaleDateString()}</p>


                        <button class="btn btn-secondary" onClick={() => navigate("/operadoras")}>Regresar</button>
                    </div>
                </div>
            ) : (
                <p>Cargando ficha técnica...</p>
            )}



        </div>
    );
};

export default FichaTecnicaDetail;
