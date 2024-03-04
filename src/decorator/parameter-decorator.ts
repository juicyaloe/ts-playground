function Validate() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      Object.keys(target.validators).forEach((key) => {
        if (!target.validators[key](args)) {
          throw new Error('Error');
        }
      });
      method.apply(this, args);
    };
  };
}

function MinLength(min: number) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    target.validators = {
      minLength: function (args: string[]) {
        return args[parameterIndex].length >= min;
      },
      ...target.validators,
    };
  };
}

function MaxLength(max: number) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    target.validators = {
      maxLength: function (args: string[]) {
        return args[parameterIndex].length <= max;
      },
      ...target.validators,
    };
  };
}

export class TestClass {
  private testProperty: string;

  @Validate()
  setTestProperty(
    @MinLength(3)
    @MaxLength(5)
    testProperty: string
  ) {
    this.testProperty = testProperty;
  }
}
