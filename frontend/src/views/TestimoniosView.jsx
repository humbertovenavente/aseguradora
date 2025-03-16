import { For } from 'solid-js';
import { Star } from "lucide-solid";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

const testimonials = [
  {
    name: "Carlos Rodríguez",
    image: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Después de tener un accidente automovilístico, el proceso de reclamación fue rápido y sin complicaciones. El equipo de atención al cliente fue muy profesional y me ayudó en todo momento.",
    insuranceType: "Seguro de Auto",
    date: "Mayo 2023",
  },
  {
    name: "María González",
    image: "/placeholder.svg?height=40&width=40",
    rating: 4,
    text: "Contraté un seguro de vida para proteger a mi familia y el asesor me explicó todas las opciones disponibles. El proceso fue sencillo y ahora tengo tranquilidad sabiendo que están protegidos.",
    insuranceType: "Seguro de Vida",
    date: "Junio 2023",
  },
  // Añadir más testimonios aquí...
];

export default function TestimonialsPage() {
  return (
    <div class="container mx-auto py-12 px-4 md:px-6">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold tracking-tight mb-4">Testimonios de Nuestros Clientes</h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubre lo que nuestros clientes dicen sobre su experiencia con nuestros servicios de seguros.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <For each={testimonials}>{(testimonial) => (
          <Card class="h-full flex flex-col">
            <CardHeader>
              <div class="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle class="text-lg">{testimonial.name}</CardTitle>
                  <div class="flex items-center mt-1">
                    <For each={[...Array(5)]}>{(_, i) => (
                      <Star
                        class={`w-4 h-4 ${i() < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                      />
                    )}</For>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent class="flex-1 flex flex-col">
              <p class="text-muted-foreground mb-4 flex-1">"{testimonial.text}"</p>
              <div class="flex justify-between items-center mt-auto">
                <Badge variant="outline">{testimonial.insuranceType}</Badge>
                <CardDescription>{testimonial.date}</CardDescription>
              </div>
            </CardContent>
          </Card>
        )}</For>
      </div>

      <div class="mt-16 text-center">
        <h2 class="text-2xl font-bold mb-6">¿Por qué elegir nuestros seguros?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="flex flex-col items-center">
            <div class="bg-primary/10 p-4 rounded-full mb-4">
              {/* SVG de Protección Garantizada aquí */}
            </div>
            <h3 class="text-lg font-medium mb-2">Protección Garantizada</h3>
            <p class="text-center text-muted-foreground">
              Cobertura completa para tu tranquilidad y la de tu familia.
            </p>
          </div>
          <div class="flex flex-col items-center">
            <div class="bg-primary/10 p-4 rounded-full mb-4">
              {/* SVG de Precios Competitivos aquí */}
            </div>
            <h3 class="text-lg font-medium mb-2">Precios Competitivos</h3>
            <p class="text-center text-muted-foreground">
              Planes adaptados a tu presupuesto sin comprometer la calidad.
            </p>
          </div>
          <div class="flex flex-col items-center">
            <div class="bg-primary/10 p-4 rounded-full mb-4">
              {/* SVG de Atención Personalizada aquí */}
            </div>
            <h3 class="text-lg font-medium mb-2">Atención Personalizada</h3>
            <p class="text-center text-muted-foreground">
              Asesores expertos disponibles para ayudarte en todo momento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
