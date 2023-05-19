import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}
    
  @Get() 
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get('/document/:document')
  @UseGuards(AuthGuard('jwt'))
  findOneByDocument(@Param('document') document: string) {
    return this.usersService.findByDocument(document);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto){
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
