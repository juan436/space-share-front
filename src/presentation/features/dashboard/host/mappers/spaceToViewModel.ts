import { Space } from "@/core/domain/entities/Space";
import { SpaceViewModel, SpaceTypeValue, SpaceCategoryValue } from "@/presentation/types/spaces";

export function spaceToViewModel(space: Space): SpaceViewModel {
  return {
    id: space.id,
    title: space.title,
    description: space.description,
    type: space.type as SpaceTypeValue,
    squareMeters: space.squareMeters,
    pricePerMonth: space.pricePerMonth,
    capacity: space.capacity,
    status: space.status,
    climateControlled: space.amenities.climateControlled,
    securityCamera: space.amenities.securityCamera,
    privateEntrance: space.amenities.privateEntrance,
    address: space.location.address,
    city: space.location.city,
    state: space.location.state,
    country: space.location.country,
    images: space.images || [],
    category: (space.category ?? "normal") as SpaceCategoryValue,
    businessSpaceType: space.businessSpaceType,
    pricePerHour: space.pricePerHour,
    availableFrom: space.availableFrom,
    availableTo: space.availableTo,
    usageConditions: space.usageConditions,
    services: space.services,
  };
}
