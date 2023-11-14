import { NestFactory } from '@nestjs/core'
import { AppModule } from './infrastructure/app.module'
import { AppConfiguration } from './infrastructure/AppConfiguration'
import { ValidationPipe } from '@nestjs/common'
import { DateTimeService } from 'jf-architecture'

async function bootstrap() {
  // Domain services
  DateTimeService.configure()

  // Get configuration 
  const appConfig = new AppConfiguration()

  // Run application
  const app = await NestFactory.create(
    AppModule.forRoot(appConfig)
  )

  const validationPipe = new ValidationPipe()
  app.useGlobalPipes(validationPipe)

  await app.listen(appConfig.modules.infrastructure.port)
}

bootstrap()
