import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { UserResponseDto } from './UserDto';

export class UsersPageDto {
  readonly data: UserResponseDto[];

  readonly pageMeta: PageMetaDto;

  constructor(data: UserResponseDto[], pageMeta: PageMetaDto) {
    this.data = data;
    this.pageMeta = pageMeta;
  }
}
