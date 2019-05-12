import { initializeVerbosify } from '.';

import { Config } from '.';

jest.mock('./config');

test('Verbosify should execute function correctly', () => {
  initializeVerbosify({
    features: {},
    logger: 'console',
  });

  expect(Config.initialize).toHaveBeenCalledTimes(1);
});
