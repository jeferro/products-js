import { UsernameRestMapper } from "src/infrastructure/shared/adapters/rest/mappers/UsernameRestMapper"
import { AnonymousAuth, Auth, UserAuth, MapperException } from "jf-architecture"
import { AuthRestDTO } from "jf-nestjs-rest"

export class AuthRestMapper {

    private readonly usernameRestMapper = new UsernameRestMapper()

    toDTO(entity: UserAuth): AuthRestDTO {
        try {
            return new AuthRestDTO(
                this.usernameRestMapper.toDTO(entity.username),
                entity.roles
            )
        }
        catch (cause) {
            throw new MapperException(cause)
        }
    }

    toEntity(dto: AuthRestDTO | undefined): Auth {
        try {
            if (dto) {
                return UserAuth.of(
                    this.usernameRestMapper.toEntity(dto.username),
                    dto.roles
                )
            }

            return AnonymousAuth.of()
        }
        catch (cause) {
            throw new MapperException(cause)
        }
    }

}