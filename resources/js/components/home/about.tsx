import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-12 lg:py-20 bg-white text-gray-900">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

        {/* Imágenes */}
        <div className="relative w-full h-auto max-w-md mx-auto">
          <img
            src="images/about-banner.jpg"
            alt="about banner"
            width={450}
            height={590}
            className="w-full rounded-xl shadow-lg"
          />
          <img
            src="images/about-abs-2.jpg"
            alt="photo student one"
            width={250}
            height={300}
            aria-hidden="true"
            className="absolute top-40 left-[-120px] w-32 rounded-lg shadow-md hidden lg:block"
          />
          <img
            src="images/about-abs-1.jpg"
            alt="Photo student two"
            width={150}
            height={350}
            aria-hidden="true"
            className="absolute bottom-60 right-[-90px] rounded-lg shadow-md hidden lg:block "
          />
        </div>

        {/* Contenido */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Quienes Somos</h2>

          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <img
                src="images/about-icon-1.png"
                alt=""
                width={30}
                height={30}
                className="mt-1"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-xl font-semibold">Capacitación en un área específica</h3>
                <p className="text-gray-700">
                  Ofrecemos programas de capacitación diseñados para potenciar las habilidades de los participantes en áreas fundamentales como el Desarrollo Web, el dominio del inglés y otras disciplinas técnicas clave.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <img
                src="images/about-icon-2.png"
                alt=""
                width={30}
                height={30}
                className="mt-1"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-xl font-semibold">Desarrollo personal</h3>
                <p className="text-gray-700">
                  Nuestro enfoque es proporcionar a los participantes las herramientas y el conocimiento necesarios para acceder a oportunidades laborales más gratificantes y prometedoras.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <img
                src="images/about-icon-3.png"
                alt=""
                width={30}
                height={30}
                className="mt-1"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-xl font-semibold">Fortalecimiento espiritual</h3>
                <p className="text-gray-700">
                  Incentivamos a nuestros participantes a buscar a Dios durante su proceso de aprendizaje, promoviendo la lectura de las sagradas escrituras, así como la visita a santos templos, la investigación de su historia familiar y el servicio desinteresado a la comunidad.
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-8">
            <Button asChild className="gap-2 bg-[#136bb6] text-white hover:bg-blue-700 transition-colors h-[3rem] px-6 rounded-lg">
              <a href="#" target="_blank" rel="noopener noreferrer">
                ¡Empieza a aprender hoy mismo!
                <ArrowRight size={18} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
