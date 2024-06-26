import { Prisma, Product } from "@prisma/client";
import { PostProductCommand } from "./dto/post-product-command.model";
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { ResourceParameters } from "./dto/resource-parameters";
import { PagedList } from "src/common/domain/paged-list";
import { PutProductCommand } from "./dto/put-product-command.model";
import { DeleteProductCommand } from "./dto/delete-product-command.model";
import { PrismaService } from "src/infra/data/prisma.service";
const _ = require('lodash');

@Injectable()
export class ProductService{
    constructor(private prismaService: PrismaService){

    }
    async getProducts(query:ResourceParameters): Promise<Product[]> {
        const options:Prisma.ProductFindManyArgs = new PagedList<ResourceParameters>(query).getOptions();
            
        if(!_.isEmpty(query.searchQuery)){
            options.where = {
                name: {
                    contains: query.searchQuery
                }
            }
        }

        if(!_.isEmpty(query.orderBy)){
            options.orderBy = {
                [query.orderBy]: 'asc'
            }
        }

        return this.prismaService.product.findMany(options);
    }

    async createProduct(command: PostProductCommand): Promise<Product | null>{
        const data:Prisma.ProductCreateInput = {
            id:uuidv4(),
            name: command.name,
            createdBy:command.createdBy,
            createdOn: new Date(),
            updatedOn: new Date()
        }

        return  await this.prismaService.product.create({
            data
        });
    }

    async updateProduct(command:PutProductCommand): Promise<Product>{
        const data:Prisma.ProductUpdateInput = {
            id:command.id,
            name: command.name,
            modifiedBy:command.modifiedBy
        }

        const where:Prisma.ProductWhereUniqueInput = {
            id:command.id
        }

        const dataSource =  this.prismaService.product.update({
            data,
            where
        });

        return dataSource;
    }

    async deleteProduct(command:DeleteProductCommand): Promise<Product>{
        const where:Prisma.ProductWhereUniqueInput = {
            id:command.id
        }

       const data = this.prismaService.product.delete({where});

       return data;
    }
}