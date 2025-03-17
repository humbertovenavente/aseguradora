import emailjs from "emailjs-com";

const SERVICE_ID = "service_dgz538d"; 
const TEMPLATE_ID_PENDING = "template_rkc85qj"; 
const TEMPLATE_ID_ACTIVATED = "template_5ah4o5m"; 
const PUBLIC_KEY = "vGiA54nbWcueOGTPb";

export const sendEmail = async (email: string, status: "pending" | "activated") => {
  // Escoge la plantilla según el estado (pendiente o activada)
  const templateId = status === "pending" ? TEMPLATE_ID_PENDING : TEMPLATE_ID_ACTIVATED;

  try {
    const response = await emailjs.send(
      SERVICE_ID, 
      templateId, 
      {
        // Ajusta estos campos para que coincidan con lo que pusiste en EmailJS
        name: email,            // Usado en la plantilla como {{name}}
        email: email,           // Usado como {{email}} (si lo configuras así en la plantilla)
        reply_to: "soporte@aseguradora.com", // Usado como {{reply_to}} si lo incluyes
      }, 
      PUBLIC_KEY
    );

    console.log(`✅ Correo de ${status} enviado con éxito:`, response);
    return { success: true };
  } catch (error) {
    console.error(`❌ Error al enviar correo de ${status}:`, error);
    return { success: false, error };
  }
};
