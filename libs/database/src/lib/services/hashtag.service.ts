import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashtagDocument } from './../schemas/hashtag.schema';

@Injectable()
export class HashtagService {
  constructor(
    @InjectModel('Hashtag') private _hashtagModel: Model<HashtagDocument>
  ) {}

  async getAll() {
    return this._hashtagModel.find().exec();
  }
}
