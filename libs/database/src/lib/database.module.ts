/*
 * Copyright (c) 2021, Castcle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 only, as
 * published by the Free Software Foundation.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
 * version 3 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 3 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Castcle, 22 Phet Kasem 47/2 Alley, Bang Khae, Bangkok,
 * Thailand 10160, or visit www.castcle.com if you need additional information
 * or have any questions.
 */
import { Module, Global } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { Environment as env } from '@castcle-api/environments';
import { AuthenticationService } from './services/authentication.service';
import { AccountSchema } from './schemas/account.schema';
import { CredentialSchema } from './schemas/credential.schema';
import { AccountActivationSchema } from './schemas/accountActivation.schema';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const MongooseForFeatures = MongooseModule.forFeature([
  { name: 'Account', schema: AccountSchema },
  { name: 'Credential', schema: CredentialSchema },
  { name: 'AccountActivation', schema: AccountActivationSchema }
]);

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(env.db_uri, env.db_options),
    MongooseForFeatures
  ],
  controllers: [],
  providers: [AuthenticationService],
  exports: [AuthenticationService]
})
export class DatabaseModule {}

export { AuthenticationService };

let mongod: MongoMemoryServer;
export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongod = await MongoMemoryServer.create();
      const mongoUri = mongod.getUri();
      return {
        uri: mongoUri,
        ...options
      };
    }
  });

export const closeInMongodConnection = async () => {
  if (mongod) await mongod.stop();
};
