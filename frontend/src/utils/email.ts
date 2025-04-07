import emailjs from "emailjs-com";

const SERVICE_ID = "service_dgz538d"; 
const TEMPLATE_ID_PENDING = "template_rkc85qj"; 
const TEMPLATE_ID_ACTIVATED = "template_5ah4o5m"; 
const TEMPLATE_ID_RECHAZO = "template_yjla3cv"
const PUBLIC_KEY = "vGiA54nbWcueOGTPb";

export const sendEmail = async (email: string, status: "pending" | "activated" | "rejected",
  extraData?: { comentario?: string; link?: string; pagina?: string}
) => {


  // Escoge la plantilla según el estado (pendiente o activada)
  let templateId;

  switch (status) {
    case "pending":
      templateId = TEMPLATE_ID_PENDING;
      break;
    case "activated":
        templateId = TEMPLATE_ID_ACTIVATED;
        break;
    case "rejected":
      templateId = TEMPLATE_ID_RECHAZO;
      break;
    default:
      throw new Error("Tipo de estado inválido en sendEmail");
  }


  try {
    const response = await emailjs.send(
      SERVICE_ID, 
      templateId, 
      {
        // Ajusta estos campos para que coincidan con lo que pusiste en EmailJS
        name: email,            // Usado en la plantilla como {{name}}
        email: email,           // Usado como {{email}} (si lo configuras así en la plantilla)
        comentario: extraData?.comentario || "",
        link: extraData?.link || "",
        pagina: extraData?.pagina || "",
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
