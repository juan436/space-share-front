"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Reservation } from "@/core/domain/entities/Reservation";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/presentation/hooks/use-toast";

export interface CheckoutForm {
  numeroTarjeta: string;
  nombreTarjeta: string;
  expiry: string;
  cvv: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  idRegion: string;
  codigoPostal: string;
}

const EMPTY_FORM: CheckoutForm = {
  numeroTarjeta: "", nombreTarjeta: "", expiry: "", cvv: "",
  nombre: "", apellido: "", email: "", telefono: "",
  direccion: "", ciudad: "", idRegion: "", codigoPostal: "",
};

const RESERVATIONS_QUERY_KEY = ["reservations", "user"] as const;

function formatCardNumber(value: string): string {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export function useWompiCheckout(reservation: Reservation | null, onPopupOpened?: () => void) {
  const { initiateDirectPaymentUseCase, verifyCheckoutUseCase } = useUseCases();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const verifyAndFinish = useCallback(async (transactionId: string) => {
    try {
      const { paymentStatus, declineReason } = await verifyCheckoutUseCase.execute(transactionId);
      toast(
        paymentStatus === "APPROVED"
          ? { title: "Pago aprobado", description: "Tu reservación fue confirmada." }
          : { title: "Pago declinado", description: declineReason || "Intenta con otro método de pago." }
      );
    } catch {
      toast({ title: "Pago procesado", description: "Verifica el estado de tu reservación." });
    } finally {
      queryClient.invalidateQueries({ queryKey: RESERVATIONS_QUERY_KEY });
    }
  }, [verifyCheckoutUseCase, queryClient, toast]);

  const setField = useCallback(
    (field: keyof CheckoutForm) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
        setError(null);
      },
    []
  );

  const handleCardNumber = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, numeroTarjeta: formatCardNumber(e.target.value) }));
    setError(null);
  }, []);

  const handleExpiry = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }));
    setError(null);
  }, []);

  const handleCvv = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }));
    setError(null);
  }, []);

  const goToStep = useCallback((n: number) => {
    setStep(n);
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setForm(EMPTY_FORM);
    setStep(0);
    setError(null);
    setIsSubmitting(false);
  }, []);

  const submit = async (): Promise<void> => {
    if (!reservation) return;

    const [mmStr, yyStr] = form.expiry.split("/");
    if (!mmStr || !yyStr || form.numeroTarjeta.replace(/\s/g, "").length < 13) {
      setError("Verifica los datos de tu tarjeta");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const popup = window.open("", "wompi_checkout", "width=430,height=720,menubar=no,toolbar=no,location=no,status=no");

    try {
      const { redirectUrl, transactionId } = await initiateDirectPaymentUseCase.execute({
        reservationId: reservation.id,
        card: {
          numeroTarjeta: form.numeroTarjeta.replace(/\s/g, ""),
          cvv: form.cvv,
          mesVencimiento: parseInt(mmStr, 10),
          anioVencimiento: 2000 + parseInt(yyStr, 10),
        },
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        telefono: form.telefono,
        direccion: form.direccion,
        ciudad: form.ciudad,
        idRegion: form.idRegion,
        codigoPostal: form.codigoPostal,
        redirectUrl: popup && !popup.closed
          ? `${window.location.origin}/payment-result`
          : `${window.location.origin}/dashboard/user/reservations?payment=result`,
      });

      if (popup && !popup.closed) {
        popup.location.href = redirectUrl;
        reset();
        onPopupOpened?.();

        pollRef.current = setInterval(() => {
          if (popup.closed) {
            if (pollRef.current) clearInterval(pollRef.current);
            pollRef.current = null;
            verifyAndFinish(transactionId);
          }
        }, 700);
      } else {
        sessionStorage.setItem("pendingWompiTransactionId", transactionId);
        window.location.href = redirectUrl;
      }
    } catch (err: unknown) {
      popup?.close();
      setError(err instanceof Error ? err.message : "Error al procesar el pago");
      setIsSubmitting(false);
    }
  };

  return { step, form, isSubmitting, error, setField, handleCardNumber, handleExpiry, handleCvv, goToStep, reset, submit };
}
