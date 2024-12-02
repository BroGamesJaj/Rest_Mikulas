import { Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';
import { disconnect } from 'process';

@Injectable()
export class ChildrenService {
  constructor(private readonly db : PrismaService){}

  async create(createChildrenDto: CreateChildDto) {
    try {
      return await this.db.child.create({
        data: createChildrenDto
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findAll() {
    try {
      return await this.db.child.findMany();
    } catch (e) {
      throw new Error(e.message);
    }
  }



  async findOne(id: number) {
    try {
      let a = await this.db.child.findUnique({where: {id}});
      if( a.name == ""){
        return await "There is no child with id " + id
      } else {
        return await a;
      }
      
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async addToy(childId: number, toyId: number) {
    return await this.db.child.update({
      where: {id: childId},
      data: {
        toys: {
          connect: {id: toyId}
        }
      }
    })
  }

  async update(id: number, updateChildrenDto: UpdateChildDto) {
    return await this.db.child.update({where: {id}, data: updateChildrenDto});
  }

  async removeToy(childId: number, toyId: number) {
    return await this.db.child.update({
      where: {id: childId},
      data: {
        toys: {
          disconnect: {id: toyId}
        }
      }
    })
  }
  async remove(id: number) {
    return await this.db.child.delete({where: {id}});
  }

  
}
