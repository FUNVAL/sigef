import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, CircleX } from "lucide-react"
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export function MessageStep() {
  const { flash } = usePage().props;
  const [message, setMessage] = useState<string | null>(null);
  const flashMessage = (flash as { success?: { type: string, message: string } })?.success;
  useEffect(() => {
    const storedMessage = sessionStorage.getItem('successMessage');
    console.log('Flash Message:', flashMessage);
    if (flashMessage) {
      sessionStorage.setItem('successMessage', flashMessage.message);
      setMessage(flashMessage.message);
    } else if (storedMessage) {
      setMessage(storedMessage);
    } else {
      router.visit('/preinscription-reference');
    }

    return () => {
      // sessionStorage.removeItem('successMessage');
    };
  }, [flash]);

  if (!message) {
    return <div className="text-center py-12">Redirigiendo...</div>;
  }

  return (
    <div className="max-w-2xl w-full mx-auto py-8">
      <Card className="border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm">
            {
              flashMessage?.type === 'success' ? (
                <CheckCircle2 className="h-12 w-12 text-[rgb(46_131_242_/_1)]" />
              ) : (
                <CircleX className="h-12 w-12 text-red-500" />
              )
            }
          </div>
          <CardTitle className="text-2xl font-bold text-funval-blue">
            Confirmación de Solicitud
          </CardTitle>
          <p className="text-base leading-relaxed">
            Gracias por tu solicitud. Hemos recibido tu información correctamente.
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className={`prose prose-sm max-w-none p-2 rounded-md ${flashMessage?.type === 'success'
            ? 'bg-blue-50 dark:bg-blue-950'
            : 'bg-red-50 dark:bg-red-950'
            }`}>
            <p className="text-lg leading-relaxed">
              {message}
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <Link
              href="/preinscription-reference"
              className="inline-flex items-center px-6 py-3 bg-[rgb(46_131_242_/_1)] text-white rounded-lg hover:bg-[rgb(46_131_242_/_1)]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(46_131_242_/_1)]"
              onClick={() => sessionStorage.removeItem('successMessage')}
            >
              Volver al Inicio
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}