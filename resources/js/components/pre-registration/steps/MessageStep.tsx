import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle, Info, Users } from "lucide-react"

interface MessageStepProps {
  message: string;
  type: 'success' | 'warning' | 'info';
  title?: string;
  onRestart?: () => void;
  showRestartButton?: boolean;
}

export function MessageStep({ 
  message, 
  type, 
  title, 
  onRestart, 
  showRestartButton = true 
}: MessageStepProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-12 w-12 text-green-600" />
      case 'warning':
        return <AlertCircle className="h-12 w-12 hidden" />
      case 'info':
        return <Info className="h-12 w-12 hidden" />
      default:
        return <Users className="h-12 w-12 text-[rgb(46_131_242_/_1)]" />
    }
  }

  const getCardStyle = () => {
    switch (type) {
      case 'success':
        return 'border-blue-100 bg-blue-50 dark:border-gray-900 dark:bg-gray-900'
      case 'warning':
        return 'border-blue-100 bg-blue-50 dark:border-gray-900 dark:bg-gray-900'
      case 'info':
        return 'border-blue-100 bg-blue-50 dark:border-gray-900 dark:bg-gray-900'
      default:
        return 'border-2'
    }
  }

  const getTitle = () => {
    if (title) return title
    switch (type) {
      case 'success':
        return '¡Proceso Completado!'
      case 'warning':
        return 'Información'
      case 'info':
        return 'Información'
      default:
        return 'Mensaje'
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className={`border-2 ${getCardStyle()}`}>
        <CardHeader className="text-center pb-4">
         {/*  <div className="mx-auto w-20 h-20 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm">
            {getIcon()}
          </div> */}
          <CardTitle className="text-2xl font-bold text-funval-blue">
            {getTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed">
              {message}
            </p>
          </div>

          {type === 'success' && (
            <div className="bg-background border border-border/40 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>¿Qué sigue?</strong><br />
                Nuestro equipo revisará tu información y se pondrá en contacto contigo 
                en un plazo de 24 a 72 horas hábiles. Mantente atento a tu teléfono y correo electrónico.
              </p>
            </div>
          )}

          {showRestartButton && onRestart && (
            <div className="flex justify-center pt-4">
              <Button
                onClick={onRestart}
                variant="outline"
                size="lg"
                className="min-w-[200px]"
              >
                Volver al Inicio
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}