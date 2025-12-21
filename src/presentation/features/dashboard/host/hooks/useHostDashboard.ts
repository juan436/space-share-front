import { useState } from "react";
import { useSpaces } from "@/presentation/hooks/useSpaces";
import { 
  SpaceViewModel, 
  NewSpaceFormData, 
  SpaceTypeValue,
  calculateRecommendedPriceForUI 
} from "@/presentation/types/spaces";

const initialFormState: NewSpaceFormData = {
  title: "",
  description: "",
  type: "garage",
  squareMeters: 0,
  pricePerMonth: 0,
  climateControlled: false,
  securityCamera: false,
  privateEntrance: false,
  address: "",
  city: "",
  state: "",
  country: "",
};

export function useHostDashboard() {
  const { spaces: rawSpaces, isLoading, create, isCreating, delete: deleteSpace, isDeleting } = useSpaces();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSpace, setNewSpace] = useState<NewSpaceFormData>(initialFormState);

  // Transform domain spaces to view models
  const spaces: SpaceViewModel[] = rawSpaces.map((space) => ({
    id: space.id,
    title: space.title,
    description: space.description,
    type: space.type as SpaceTypeValue,
    squareMeters: space.squareMeters,
    pricePerMonth: space.pricePerMonth,
    status: space.status,
    climateControlled: space.amenities.climateControlled,
    securityCamera: space.amenities.securityCamera,
    privateEntrance: space.amenities.privateEntrance,
    address: space.location.address,
    city: space.location.city,
    state: space.location.state,
    country: space.location.country,
  }));

  const activeSpacesCount = spaces.filter(s => s.status === "active").length;

  const updateNewSpace = (updates: Partial<NewSpaceFormData>) => {
    setNewSpace((prev) => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setNewSpace(initialFormState);
  };

  const recommendedPrice = calculateRecommendedPriceForUI(newSpace.squareMeters);

  const handleAddSpace = async () => {
    try {
      await create({
        title: newSpace.title,
        description: newSpace.description,
        type: newSpace.type,
        squareMeters: newSpace.squareMeters,
        pricePerMonth: newSpace.pricePerMonth,
        amenities: {
          climateControlled: newSpace.climateControlled,
          securityCamera: newSpace.securityCamera,
          privateEntrance: newSpace.privateEntrance,
        },
        location: {
          address: newSpace.address,
          city: newSpace.city,
          state: newSpace.state,
          country: newSpace.country,
        },
        images: [],
      });
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating space:", error);
    }
  };

  const handleDeleteSpace = async (id: string) => {
    try {
      await deleteSpace(id);
    } catch (error) {
      console.error("Error deleting space:", error);
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
    isDialogOpen,
    setIsDialogOpen,
    newSpace,
    updateNewSpace,
    handleAddSpace,
    handleDeleteSpace,
    isFormValid,
    recommendedPrice,
  };
}
