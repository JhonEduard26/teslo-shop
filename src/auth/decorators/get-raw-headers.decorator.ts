import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetRawHeaders = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const rawHeaders = request.rawHeaders;
    return request.rawHeaders;
  },
);
