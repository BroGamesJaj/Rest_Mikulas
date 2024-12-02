import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
    let materials = ["wood","metal","plastic","other"];
    for (let i = 0; i < 15; i++) {
      await prisma.child.create({
        data: {
          name: faker.person.fullName(),
          address: faker.location.streetAddress({useFullAddress: true}) + ", " + faker.location.city() + ", " + faker.location.country(),
          good: faker.datatype.boolean()
        }
      })
    }
  
    for (let i = 0; i < 15; i++) {
      await prisma.toy.create({
        data: {
          name: faker.animal.type(),
          material: materials[i % 4],
          weight: faker.number.float({min: 0.2, max: 5}).toFixed(1),
          children: {
            connect: {
              id: i+1,
            }
          }
        }
      })
    }
    
    await prisma.child.update({
      where: { id: 2 },
      data: {
        toys: {
          connect: [
            { id: 2 },
            { id: 4 },
            { id: 5 },
            { id: 10 },
            { id: 11 },
          ]
        }
      }
    })
    
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })