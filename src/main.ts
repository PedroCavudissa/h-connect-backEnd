import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from '@nestjs/common';
import { JwtAuthGuard } from "./auth/guards/jw.guard";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'debug', 'verbose', 'log'] });
 

  // HABILITAR CORS
  app.enableCors({
    origin: "http://localhost:4200",
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
