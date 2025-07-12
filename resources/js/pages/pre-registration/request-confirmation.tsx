import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '../../components/pre-registration/Header'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import { Link } from '@inertiajs/react'



export default function RequestConfirmation({ response }: { response: { message: string, type: 'success' | 'rejected' } }) {


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto py-8">
          <Card className="border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm">
                <CheckCircle2 className="h-12 w-12 text-[rgb(46_131_242_/_1)]" />
              </div>
              <CardTitle className="text-2xl font-bold text-funval-blue">
                Confirmación de Solicitud
              </CardTitle>
              <p className="text-base leading-relaxed">
                Gracias por tu solicitud. Hemos recibido tu información correctamente.
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="prose prose-sm max-w-none dark:prose-invert bg-blue-50 p-2 rounded-md dark:bg-blue-950">
                <p className="text-lg leading-relaxed">
                  {response?.message}
                </p>
              </div>

              <div className="flex justify-center pt-4">
                <Link
                  href="/pre-inscription/create"
                  className="inline-flex items-center px-6 py-3 bg-[rgb(46_131_242_/_1)] text-white rounded-lg hover:bg-[rgb(46_131_242_/_1)]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(46_131_242_/_1)]"
                >
                  Volver al Inicio
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border/40 bg-gray-900 dark:bg-black">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-200">
            <p className="font-semibold">&copy; 2025 FUNVAL Internacional. Todos los derechos reservados.</p>
            <p className="mt-1 text-gray-400">
              Organización dedicada al desarrollo técnico profesional en Latinoamérica
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}