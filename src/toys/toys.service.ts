import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from "@prisma/client"
@Injectable()
export class ToysService {
  constructor(private readonly db : PrismaService){}
  async create(createToyDto: CreateToyDto) {
    try {
      return await this.db.toy.create({
        data: createToyDto
      });
    } catch (e) {
      if (e.name === 'PrismaClientValidationError') {
        return await "Invalid";
      }else{
        return await e.name;
      }
    
    }  
  }

  async findAll() {
    return await this.db.toy.findMany();
  }

  async findOne(id: number) {
    try {
    return await this.db.toy.findFirstOrThrow({where: {id}});
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          return await "Wrong ID"
        }
      }
    }
    
  }
  async update(id: number, updateToyDto: UpdateToyDto) {
    try {
      return await this.db.toy.update({where: {id}, data: updateToyDto});
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          return await "Wrong ID"
        }
      }
      if (e.name === 'PrismaClientValidationError') {
        return await "Invalid";
      }
      return await e.name;
      
    }
  }

  async remove(id: number) {
    try {
    return await this.db.toy.delete({where: {id}});
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          return await "Wrong ID"
        }
      }
      if (e.name === 'PrismaClientValidationError') {
        return await "Invalid";
      }
      return await e.name;
      
    }
  } 
}
