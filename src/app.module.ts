import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphService } from './graph/graph.service';
import { GraphController } from './graph/graph.controller';
import { LoggerModule } from './logger.module';


@Module({
  imports: [
       ConfigModule.forRoot({
        isGlobal: true,
        envFilePath:['.env']
       }),
       LoggerModule
  ],
  controllers: [AppController, GraphController],
  providers: [AppService, GraphService],
})
export class AppModule {}
