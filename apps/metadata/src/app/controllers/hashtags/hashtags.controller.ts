import { HashtagService } from '@castcle-api/database';
import { HashtagResponse } from '@castcle-api/database/dtos';
import { CastLogger, CastLoggerOptions } from '@castcle-api/logger';
import { CredentialInterceptor } from '@castcle-api/utils/interceptors';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
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

  @ApiHeader({
    name: 'Accept-Language',
    description: 'Device prefered Language',
    example: 'th',
    required: true
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    type: HashtagResponse
  })
  @UseInterceptors(CredentialInterceptor)
  @Get()
  async getAllHashTags() {
    this.logger.log('Start get all hashtag.');
    const hashTag = await this.hashtagService.getAll();
    this.logger.log('Complete get all hashtag.');
    return {
      message: 'success message',
      payload: hashTag.map((x) => x.toPagePayload())
    } as HashtagResponse;
  }
}
