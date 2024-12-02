import { Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';
import { disconnect } from 'process';

@Injectable()
export class ChildrenService {
  constructor(private readonly db : PrismaService){}

  create(createChildrenDto: CreateChildDto) {
    return this.db.child.create({
      data: createChildrenDto
    });
  }

  findAll() {
    return this.db.child.findMany();
  }



  findOne(id: number) {
    return this.db.child.findUnique({where: {id}});
  }

  addToy(childId: number, toyId: number) {
    return this.db.child.update({
      where: {id: childId},
      data: {
        toys: {
          connect: {id: toyId}
        }
      }
    })
  }

  update(id: number, updateChildrenDto: UpdateChildDto) {
    return this.db.child.update({where: {id}, data: updateChildrenDto});
  }

  removeToy(childId: number, toyId: number) {
    return this.db.child.update({
      where: {id: childId},
      data: {
        toys: {
          disconnect: {id: toyId}
        }
      }
    })
  }
  remove(id: number) {
    return this.db.child.delete({where: {id}});
  }

  
}
