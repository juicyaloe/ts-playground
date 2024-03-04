function handleError() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function () {
      try {
        method();
      } catch (error) {}
    };
  };
}

export class TestClass {
  @handleError()
  testMethod() {
    throw new Error('Error');
  }
}
