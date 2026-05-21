/**
 * useHostDashboard
 *
 * Qué hace: Hook central del módulo host. Centraliza estado del formulario, edición y operaciones CRUD de espacios.
 * Recibe:   nada
 * Genera:   spaces (SpaceViewModel[]), handlers CRUD, estado de dialogs, validación del formulario, recommendedPrice
 * Procesa:  transforma entidades de dominio a SpaceViewModel; usa ref para evitar stale closure en handleAddSpace
 */
import { useState, useRef, useCallback } from "react";
import { useSpaces } from "@/presentation/hooks/useSpaces";
import { toErrorMessage } from "@/presentation/utils/error";
import {
  SpaceViewModel,
  NewSpaceFormData,
  SpaceStatusValue,
  calculateRecommendedPriceForUI
} from "@/presentation/types/spaces";
import { spaceToViewModel } from "@/presentation/features/dashboard/host/mappers/spaceToViewModel";

const initialFormState: NewSpaceFormData = {
  title: "",
  description: "",
  type: "garage",
  squareMeters: 0,
  pricePerMonth: 0,
  capacity: 1,
  climateControlled: false,
  securityCamera: false,
  privateEntrance: false,
  address: "",
  city: "",
  state: "",
  country: "",
  images: [],
};

export function useHostDashboard() {
  const { spaces: rawSpaces, isLoading, create, isCreating, update, isUpdating, delete: deleteSpace, isDeleting } = useSpaces();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSpace, setNewSpace] = useState<NewSpaceFormData>(initialFormState);
  const [actionError, setActionError] = useState<string | null>(null);
  const newSpaceRef = useRef(newSpace);

  // Edit state
  const [editingSpace, setEditingSpace] = useState<SpaceViewModel | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const spaces: SpaceViewModel[] = rawSpaces.map(spaceToViewModel);

  const activeSpacesCount = spaces.filter(s => s.status === "active").length;

  const updateNewSpace = useCallback((updates: Partial<NewSpaceFormData>) => {
    setNewSpace((prev) => {
      const next = { ...prev, ...updates };
      newSpaceRef.current = next;
      return next;
    });
  }, []);

  const resetForm = () => {
    setNewSpace(initialFormState);
    newSpaceRef.current = initialFormState;
  };

  const recommendedPrice = calculateRecommendedPriceForUI(newSpace.squareMeters);

  const handleAddSpace = useCallback(async () => {
    const current = newSpaceRef.current;
    try {
      await create({
        title: current.title,
        description: current.description,
        type: current.type,
        squareMeters: current.squareMeters,
        pricePerMonth: current.pricePerMonth,
        capacity: current.capacity,
        amenities: {
          climateControlled: current.climateControlled,
          securityCamera: current.securityCamera,
          privateEntrance: current.privateEntrance,
        },
        location: {
          address: current.address,
          city: current.city,
          state: current.state,
          country: current.country,
        },
        images: current.images || [],
        category: "normal",
      });
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      setActionError(toErrorMessage(error));
    }
  }, [create]);

  const handleEditSpace = (space: SpaceViewModel) => {
    setEditingSpace(space);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (id: string, data: NewSpaceFormData) => {
    try {
      await update({
        id,
        input: {
          title: data.title,
          description: data.description,
          type: data.type,
          squareMeters: data.squareMeters,
          pricePerMonth: data.pricePerMonth,
          capacity: data.capacity,
          amenities: {
            climateControlled: data.climateControlled,
            securityCamera: data.securityCamera,
            privateEntrance: data.privateEntrance,
          },
          location: {
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
          },
          images: data.images || [],
        },
      });
      setIsEditDialogOpen(false);
      setEditingSpace(null);
    } catch (error) {
      setActionError(toErrorMessage(error));
    }
  };

  const handleUpdateStatus = async (id: string, status: SpaceStatusValue) => {
    try {
      await update({ id, input: { status } });
    } catch (error) {
      setActionError(toErrorMessage(error));
    }
  };

  const handleDeleteSpace = async (id: string) => {
    try {
      await deleteSpace(id);
    } catch (error) {
      setActionError(toErrorMessage(error));
    }
  };

  const isFormValid = Boolean(
    newSpace.title &&
    newSpace.squareMeters > 0 &&
    newSpace.pricePerMonth > 0 &&
    newSpace.address &&
    newSpace.city &&
    newSpace.country
  );

  return {
    spaces,
    activeSpacesCount,
    isLoading,
    isCreating,
    isDeleting,
    isUpdating,
    isDialogOpen,
    setIsDialogOpen,
    newSpace,
    updateNewSpace,
    handleAddSpace,
    handleDeleteSpace,
    handleUpdateStatus,
    handleEditSpace,
    handleSaveEdit,
    editingSpace,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isFormValid,
    recommendedPrice,
    actionError,
    clearActionError: () => setActionError(null),
  };
}
