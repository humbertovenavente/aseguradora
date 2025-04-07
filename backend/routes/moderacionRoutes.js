import express from "express";
import Moderacion from "../models/Moderacion.js";
import Faq from "../models/PaginasEdt/Faq.js";
import Historia from "../models/PaginasEdt/Historia.js";
import Contacto from "../models/PaginasEdt/Contacto.js";
import RedProveedores from "../models/PaginasEdt/RedProveedores.js";
import Testimonios from "../models/PaginasEdt/Testimonios.js";
import Menu from "../models/Menu.js"; 
import Footer from "../models/Footer.js";

const router = express.Router();

// Crear nueva propuesta de edición
router.post("/", async (req, res) => {
  try {
    const nueva = new Moderacion(req.body);
    const guardada = await nueva.save();
    res.status(201).json(guardada);
  } catch (err) {
    res.status(400).json({
      error: "Error al guardar la propuesta",
      message: err.message,
    });
  }
});

// Obtener todas las propuestas pendientes con correo del editor
router.get("/pendientes", async (req, res) => {
  try {
    const propuestas = await Moderacion.find({ estado: "pendiente" })
      .populate("creadoPor", "correo");
    res.json(propuestas);
  } catch (err) {
    res.status(500).json({
      error: "Error al obtener propuestas",
      message: err.message,
    });
  }
});

// Aprobar una propuesta (aplica cambios reales según la página)
router.put("/aprobar/:id", async (req, res) => {
  try {
    const propuesta = await Moderacion.findById(req.params.id);
    if (!propuesta) {
      return res.status(404).json({ error: "Propuesta no encontrada" });
    }

    const { pagina, contenido } = propuesta;

    switch (pagina) {
      case "faq": {
        let faq = await Faq.findOne();
        if (!faq) {
          faq = new Faq(contenido);
        } else {
          faq.items = contenido.items;
        }
        await faq.save();
        break;
      }

      case "historia": {
        let historia = await Historia.findOne();
        if (!historia) {
          historia = new Historia(contenido);
        } else {
          historia.titulo = contenido.titulo;
          historia.imagenUrl = contenido.imagenUrl;
          historia.parrafos = contenido.parrafos;
        }
        await historia.save();
        break;
      }

      case "contacto": {
        let contacto = await Contacto.findOne();
        if (!contacto) {
          contacto = new Contacto(contenido);
        } else {
          contacto.titulo = contenido.titulo;
          contacto.introduccion = contenido.introduccion;
          contacto.telefono = contenido.telefono;
          contacto.direccion = contenido.direccion;
          contacto.correo = contenido.correo;
        }
        await contacto.save();
        break;
      }

      case "redProveedores": {
        let red = await RedProveedores.findOne();
        if (!red) {
          red = new RedProveedores({ proveedores: contenido });
        } else {
          red.proveedores = contenido;
        }
        await red.save();
        break;
      }

      case "testimonios": {
        let testimonios = await Testimonios.findOne();
        if (!testimonios) {
          testimonios = new Testimonios(contenido);
        } else {
          testimonios.servicio = contenido.servicio;
          testimonios.reviews = contenido.reviews;
          testimonios.newsletter = contenido.newsletter;
          testimonios.about = contenido.about;
        }
        await testimonios.save();
        break;
      }

      case "navbar": {
        const { tipo, items } = contenido;
        let menu = await Menu.findOne({ tipo });
        if (!menu) {
          menu = new Menu({ tipo, items });
        } else {
          menu.items = items;
        }
        await menu.save();
        break;
      }

      case "footer": {
        let footer = await Footer.findOne();
        if (!footer) footer = new Footer(contenido);
        else footer.contenido = contenido.contenido;
        await footer.save();
        break;
      }

      default:
        return res.status(400).json({
          error: `Tipo de página '${pagina}' no soportado para aprobación.`,
        });
    }

    propuesta.estado = "aprobado";
    await propuesta.save();

    res.json({ mensaje: "✅ Propuesta aprobada y aplicada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error al aprobar propuesta",
      message: err.message,
    });
  }
});


      // Link visible desde otros dispositivos (usá tu IP local)
      router.put("/rechazar/:id", async (req, res) => {
        const { comentarioRechazo } = req.body;
        try {
          const rechazada = await Moderacion.findByIdAndUpdate(
            req.params.id,
            { estado: "rechazado", comentarioRechazo },
            { new: true }
          );
          res.json(rechazada);
        } catch (err) {
          res.status(500).json({
            error: "Error al rechazar propuesta",
            message: err.message,
          });
        }
      });
      
  

// Obtener propuestas por estado
router.get("/estado/:estado", async (req, res) => {
  try {
    const { estado } = req.params;
    const propuestas = await Moderacion.find({ estado })
      .populate("creadoPor", "correo");
    res.json(propuestas);
  } catch (err) {
    res.status(500).json({
      error: "Error al obtener propuestas",
      message: err.message,
    });
  }
});

// Obtener propuesta individual
router.get("/:id", async (req, res) => {
    try {
      const propuesta = await Moderacion.findById(req.params.id);
      if (!propuesta) return res.status(404).json({ error: "Propuesta no encontrada" });
      res.json(propuesta);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener la propuesta", message: err.message });
    }
  });
  
  // Reenviar propuesta rechazada
  router.put("/reenviar/:id", async (req, res) => {
    try {
      const propuesta = await Moderacion.findById(req.params.id);
      if (!propuesta) return res.status(404).json({ error: "No encontrada" });
  
      if (propuesta.estado !== "rechazado") {
        return res.status(400).json({ error: "Solo se pueden reenviar propuestas rechazadas" });
      }
  
      propuesta.estado = "pendiente";
      propuesta.contenido = req.body.contenido;
      propuesta.comentarioRechazo = undefined;
      await propuesta.save();
  
      res.json({ mensaje: "✅ Propuesta reenviada correctamente" });
    } catch (err) {
      res.status(500).json({ error: "Error al reenviar propuesta", message: err.message });
    }
  });
  

export default router;
