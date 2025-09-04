import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { Translation } from "@/types/global";
import { StepsHeader } from "../steps-header";

export function MessageStep() {
  const { flash, message_step } = usePage<{ flash: any, message_step: Translation['message_step'] }>().props;
  const [message, setMessage] = useState<string | null>(null);

  const flashMessage = useMemo(() => {
    return (flash as { success?: { type: string, message: string } })?.success;
  }, []);

  useEffect(() => {
    const storedMessage = sessionStorage.getItem('successMessage');

    if (flashMessage) {
      sessionStorage.setItem('successMessage', flashMessage.message);
      setMessage(flashMessage.message);
    } else if (storedMessage) {
      setMessage(storedMessage);
    } else {
      router.visit('/preinscription-reference');
    }
  }, [flash]);

  if (!message) {
    return <div className="text-center py-12">{message_step.redirecting}</div>;
  }

  return (
    <Card className="w-full max-w-4xl shadow-2xl border-0 overflow-hidden pt-0 mx-auto">
      <StepsHeader
        title={message_step.confirmation_title}
        subtitle={message_step.confirmation_subtitle}
      />

      <CardContent className="p-8 space-y-8">
        <div className={`max-w-none p-4 rounded-md ${flashMessage?.type === 'success'
          ? 'bg-blue-50 dark:bg-blue-950 border border-blue-100'
          : 'bg-red-50 dark:bg-red-950 border border-red-100'
          }`}>
          <p dangerouslySetInnerHTML={{ __html: message }} className="text-lg leading-normal text-justify text-gray-700" />
        </div>

        <div className="text-center pt-4">
          <a
            href="https://www.fundaciondevalores.org/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            onClick={() => sessionStorage.removeItem('successMessage')}
          >
            {message_step.back_to_home}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}