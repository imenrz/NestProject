import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserFilterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const role = request.query.role; 

    return next.handle().pipe(
      map((data) => {
        const transformUser = (user: any) => {
          if (!user) return user;

          if (role === 'admin') {
            return {
              id: user.id,
              email: user.email,
              role: user.role,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            };
          } else if (role === 'client') {
            return {
              id: user.id,
              email: user.email,
            };
          }
          return user;
        };

        if (Array.isArray(data)) {
          return data.map(transformUser);
        }
        return transformUser(data);
      }),
    );
  }
}