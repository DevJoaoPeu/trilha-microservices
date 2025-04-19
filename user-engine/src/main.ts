import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'user',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'user-consumer',
          allowAutoTopicCreation: true,
        },
      },
    },
  );
  await app.listen(() => Logger.log('user-engine is running'));
}
bootstrap();
