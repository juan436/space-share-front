import { Button } from "@/presentation/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/presentation/components/ui/dialog";

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export function TermsModal({ open, onOpenChange, onAccept }: TermsModalProps) {
  const handleAccept = () => {
    onAccept();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Términos y Condiciones</DialogTitle>
          <DialogDescription>
            Por favor, lee atentamente los siguientes términos y condiciones antes de usar SpaceShare.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground">
          <section>
            <h3 className="font-semibold text-foreground mb-2">1. Aceptación de los Términos</h3>
            <p>
              Al registrarte y utilizar SpaceShare, aceptas estos términos y condiciones en su totalidad. 
              Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestra plataforma.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-foreground mb-2">2. Descripción del Servicio</h3>
            <p>
              SpaceShare es una plataforma que conecta a personas que buscan espacios de almacenamiento 
              con anfitriones que ofrecen dichos espacios. Actuamos como intermediarios y no somos 
              responsables directos de las transacciones entre usuarios.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-foreground mb-2">3. Registro de Usuario</h3>
            <p>
              Para utilizar nuestros servicios, debes proporcionar información veraz y actualizada. 
              Eres responsable de mantener la confidencialidad de tu cuenta y contraseña.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-foreground mb-2">4. Responsabilidades del Usuario</h3>
            <p>
              Los usuarios se comprometen a utilizar la plataforma de manera responsable, 
              respetando las leyes aplicables y los derechos de otros usuarios. Está prohibido 
              publicar contenido falso, ofensivo o ilegal.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-foreground mb-2">5. Política de Privacidad</h3>
            <p>
              Tu privacidad es importante para nosotros. Consulta nuestra Política de Privacidad 
              para entender cómo recopilamos, usamos y protegemos tu información personal.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-foreground mb-2">6. Limitación de Responsabilidad</h3>
            <p>
              SpaceShare no se hace responsable de daños directos, indirectos, incidentales o 
              consecuentes que resulten del uso de la plataforma o de las transacciones entre usuarios.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-foreground mb-2">7. Modificaciones</h3>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. 
              Los cambios serán efectivos una vez publicados en la plataforma.
            </p>
          </section>
        </div>
        <DialogFooter>
          <Button onClick={handleAccept}>
            Aceptar y Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
