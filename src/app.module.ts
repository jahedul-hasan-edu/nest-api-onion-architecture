import { Module } from '@nestjs/common';
import { ProductController } from './api/controllers/product.controller';
import { ProductService } from './core/feature/product/product.service';
import { PrismaService } from './infra/data/prisma.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [PrismaService,ProductService],
  exports:[ProductService]
})
export class AppModule {}
