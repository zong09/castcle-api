import { ApiProperty } from '@nestjs/swagger';

export class HashtagPayloadDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  key: string;
  @ApiProperty()
  created: string;
  @ApiProperty()
  updated: string;
}

export class HashtagResponse {
  @ApiProperty({ type: HashtagPayloadDto, isArray: true })
  payload: HashtagPayloadDto[];
}
