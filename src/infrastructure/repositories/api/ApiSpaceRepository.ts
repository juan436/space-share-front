import { SpaceRepository, SpaceFilters, PaginatedResult } from "@/core/domain/ports/SpaceRepository";
import { Space, CreateSpaceInput, UpdateSpaceInput } from "@/core/domain/entities/Space";
import { HttpClient } from "@/infrastructure/http/HttpClient";
import { SpaceDto, PaginatedSpacesResponseDto } from "@/infrastructure/api/dtos/space";
import { SpaceMapper } from "@/infrastructure/api/mappers/SpaceMapper";

export class ApiSpaceRepository implements SpaceRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async findAll(filters?: SpaceFilters, page: number = 1, limit: number = 10): Promise<PaginatedResult<Space>> {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    if (filters) {
      if (filters.type) params.append("type", filters.type);
      if (filters.minPrice) params.append("minPrice", filters.minPrice.toString());
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
      if (filters.climateControlled !== undefined) params.append("climateControlled", filters.climateControlled.toString());
      if (filters.securityCamera !== undefined) params.append("securityCamera", filters.securityCamera.toString());
      if (filters.privateEntrance !== undefined) params.append("privateEntrance", filters.privateEntrance.toString());
      if (filters.city) params.append("city", filters.city);
      if (filters.hostId) params.append("hostId", filters.hostId);
    }

    const response = await this.httpClient.get<PaginatedSpacesResponseDto>(`/spaces?${params.toString()}`);

    return {
      data: response.data.data.map(SpaceMapper.toDomain),
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
      totalPages: response.data.totalPages,
    };
  }

  async findById(id: string): Promise<Space | null> {
    try {
      const response = await this.httpClient.get<SpaceDto>(`/spaces/${id}`);
      return SpaceMapper.toDomain(response.data);
    } catch {
      return null;
    }
  }

  async findByHostId(hostId: string): Promise<Space[]> {
    const response = await this.httpClient.get<SpaceDto[]>(`/spaces/host/${hostId}`);
    return response.data.map(SpaceMapper.toDomain);
  }

  async create(input: CreateSpaceInput): Promise<Space> {
    const dto = SpaceMapper.toCreateDto(input);
    const response = await this.httpClient.post<SpaceDto>("/spaces", dto);
    return SpaceMapper.toDomain(response.data);
  }

  async update(id: string, input: UpdateSpaceInput): Promise<Space> {
    const dto = SpaceMapper.toUpdateDto(input);
    const response = await this.httpClient.patch<SpaceDto>(`/spaces/${id}`, dto);
    return SpaceMapper.toDomain(response.data);
  }

  async delete(id: string): Promise<void> {
    await this.httpClient.delete(`/spaces/${id}`);
  }

  async uploadImages(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach((f) => formData.append("images", f));
    const response = await this.httpClient.postFormData<{ urls: string[] }>("/spaces/upload-images", formData);
    return response.data.urls;
  }
}
