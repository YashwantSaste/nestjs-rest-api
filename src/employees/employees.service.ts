import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService:DatabaseService){}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    const existingUser=this.databaseService.employee.findUnique({
      where:{
        name:createEmployeeDto.name,
        email:createEmployeeDto.email,
        role:createEmployeeDto.role
      }
    })

    console.log(existingUser);

    if(existingUser){
      return {
        message:"User is already register in the database"
      }
    }
    return this.databaseService.employee.create({
      data:createEmployeeDto
    })
  }

  async findAll(role?:'INTERN' | 'ADMIN' | 'ENGINEER') {
    if(role){
      return this.databaseService.employee.findMany({
        where:{
          role,
        }
      });
    }
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where:{
        id,
      }
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where:{
        id,
      },
      data:updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where:{
        id,
      }
    })
  }
}
