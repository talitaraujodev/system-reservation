import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from './application/application.module';
import { AdapterModule } from './adapter/adapter.module';
import { appDataSource } from './config/ormConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDataSource.options),
    ApplicationModule,
    AdapterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
