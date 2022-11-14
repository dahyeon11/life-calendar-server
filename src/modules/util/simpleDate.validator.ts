import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsSimpleDate(validationOptions?: ValidationOptions) {
  return function(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsOnlyDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `${this.propertyName} must be a valid YYYY-MM-DD`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const regex = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/;
          return typeof value === 'string' && regex.test(value)
        },
      },
    });
  };
}