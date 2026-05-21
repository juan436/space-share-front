import { NewSpaceFormData } from "@/presentation/types/spaces";

export function canProceed(step: number, formData: NewSpaceFormData): boolean {
  switch (step) {
    case 1:
      return Boolean(
        formData.title &&
        formData.description &&
        formData.type &&
        formData.squareMeters > 0 &&
        formData.pricePerMonth > 0
      );
    case 4:
      return Boolean(
        formData.country &&
        formData.state &&
        formData.city &&
        formData.address
      );
    default:
      // Steps 2 (images) and 3 (amenities) are optional by design — no validation required
      return true;
  }
}
