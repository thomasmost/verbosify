import { Config } from '.';

test('should throw an error if Winston is not provided', () => {
  const winstonInfo = jest.fn((message: string, obj: any) => null);

  expect(() => Config.initialize({
    features: {
      my_feature: true,
    },
    logger: 'winston'
  })).toThrow('Expected a winston instance in the config.');

});

test('initializing Config for winston', () => {
  const winstonInfo = jest.fn((message: string, obj: any) => null);

  Config.initialize({
    features: {
      my_feature: true,
    },
    logger: 'winston',
    winston: {
      info: winstonInfo,
    },
  });

  expect(Config.winston).toBeDefined();
  expect(Config.initialized).toBe(true);
});
