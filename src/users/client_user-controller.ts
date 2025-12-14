import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';

import { UsersService} from './users.service';
import { UserFilterInterceptor } from 'src/interceptors/interceptor.interceptor'; 

@UseInterceptors(UserFilterInterceptor)
@Controller('client/users')
export class ClientUserController {
constructor(private userService: UsersService) {}
@Get()
findAll(@Query('role') role: string) {
return this.userService.findAll();
}
}