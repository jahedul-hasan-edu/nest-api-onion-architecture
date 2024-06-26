import { Controller, Get,Post,Put,Delete, Param, Body, UsePipes, Query } from '@nestjs/common';
import { ProductService } from '../../core/feature/product/product.service';
import { Product } from '@prisma/client';
import { ResourceParameters } from '../../core/feature/product/dto/resource-parameters';
import { PostProductCommand } from '../../core/feature/product/dto/post-product-command.model';
import { PutProductCommand } from '../../core/feature/product/dto/put-product-command.model';
import { DeleteProductCommand } from '../../core/feature/product/dto/delete-product-command.model';

@Controller('/api/product')
export class ProductController {
  constructor(private readonly service:ProductService) {}

  @Get()
  async get(@Query() query:ResourceParameters): Promise<Product[]> {
    return await this.service.getProducts(query);
  }

  @Post()
  async post(@Body() command:PostProductCommand):Promise<Product> {
    return await this.service.createProduct(command);
  }

  @Put()
  async put(@Body() command:PutProductCommand):Promise<Product>{
    return await this.service.updateProduct(command);
  }

  @Delete()
  async delete(@Body() command:DeleteProductCommand):Promise<Product>{
    return await this.service.deleteProduct(command); 
  }
}
