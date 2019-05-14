import { Config } from '.';

test('should throw an error if unrecognized logger provided', () => {
  expect(() =>
    Config.initialize({
      features: {
        my_feature: true,
      },
      logger: 'morgan' as any,
    }),
  ).toThrow('Unsupported log tool: morgan');
});

test('initializing Config for console', () => {
  Config.initialize({
    features: {
      my_feature: true,
    },
    logger: 'console',
  });

  expect(Config.winston).not.toBeDefined();
  expect(Config.initialized).toBe(true);

  Config.unmount();
  expect(Config.initialized).toBe(false);
});

test('should log to console as appropriate', () => {
  jest.spyOn(console, 'log');

  Config.initialize({
    features: {
      my_feature: true,
    },
    logger: 'console',
  });

  Config.log('my_feature', { id: 'fj8393hrsjf83flk' });
  expect(console.log).toBeCalledWith('my_feature: {"id":"fj8393hrsjf83flk"}');

  Config.log('checkpoint');
  expect(console.log).toBeCalledWith('checkpoint');

  Config.unmount();
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

  Config.unmount();
  expect(Config.winston).not.toBeDefined();
  expect(Config.initialized).toBe(false);
});

test('should throw an error if Winston is not provided', () => {
  expect(() =>
    Config.initialize({
      features: {
        my_feature: true,
      },
      logger: 'winston',
    }),
  ).toThrow('Expected a winston instance in the config.');
});

test('should log to winston as appropriate', () => {
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

  Config.log('my_feature', { id: 'fj8393hrsjf83flk' });

  expect(winstonInfo).toBeCalledWith('my_feature', { id: 'fj8393hrsjf83flk' });
  Config.unmount();
});
