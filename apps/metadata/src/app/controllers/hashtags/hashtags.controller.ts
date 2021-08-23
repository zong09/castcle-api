import { HashtagResponse } from '@castcle-api/database/dtos';
import { CastLogger, CastLoggerOptions } from '@castcle-api/logger';
import {
  CredentialInterceptor,
  CredentialRequest
} from '@castcle-api/utils/interceptors';
import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOkResponse } from '@nestjs/swagger';

@Controller('hashtags')
export class HashtagsController {
  private readonly logger = new CastLogger(
    HashtagsController.name,
    CastLoggerOptions
  );

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Accept-Language',
    description: 'Device prefered Language',
    example: 'th',
    required: true
  })
  @ApiOkResponse({
    type: HashtagResponse
  })
  @UseInterceptors(CredentialInterceptor)
  @Get()
  getData(@Req() req: CredentialRequest) {
    return {
      payload: null
    } as HashtagResponse;
  }
}
