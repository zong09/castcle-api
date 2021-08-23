import { HashtagService } from '@castcle-api/database';
import { HashtagResponse } from '@castcle-api/database/dtos';
import { CastLogger, CastLoggerOptions } from '@castcle-api/logger';
import { CastcleException, CastcleStatus } from '@castcle-api/utils/exception';
import {
  CredentialInterceptor,
  CredentialRequest
} from '@castcle-api/utils/interceptors';
import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOkResponse } from '@nestjs/swagger';
import { AppService } from '../../app.service';
@Controller('hashtags')
export class HashtagsController {
  constructor(
    private readonly appService: AppService,
    private hashtagService: HashtagService
  ) {}

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
  async getData(@Req() req: CredentialRequest) {
    this.logger.log('Start get all hashtag.');
    if (
      req.$credential.account.isGuest ||
      !req.$credential.account.activateDate
    )
      throw new CastcleException(
        CastcleStatus.FORBIDDEN_REQUEST,
        req.$language
      );

    const content = await this.hashtagService.getAll();
    this.logger.log('Complete get all hashtag.');
    return {
      payload: content.map((x) => x.toPagePayload())
    } as HashtagResponse;
  }
}
