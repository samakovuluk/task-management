import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';


console.log(__dirname)
async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if(process.env.NODE_ENV === 'development'){
    app.enableCors();
  }


  const serverConfig = config.get('server')
  
  await app.listen(serverConfig.port);
  logger.log(`Application  listening on port ${serverConfig.port}`)
  
}
bootstrap();
