import { Config, verbosify, initializeVerbosify } from '.';


test('Verbosify should execute function correctly', () => {
  Config.unmount();
  const addTwo = (x: number) => x + 2;

  expect(() => verbosify(addTwo)).toThrow();
});

test('Verbosify should execute a function correctly with no args', () => {
  initializeVerbosify({
    features: {},
    logger: 'console',
  });

  const namePackage = () => ({ name: 'verbosify' });

  const wrappedNamePackage = verbosify(namePackage);
  const result = wrappedNamePackage();
  expect(result.name).toBe('verbosify');
});


test('Verbosify should execute function correctly', () => {
  initializeVerbosify({
    features: {},
    logger: 'console',
  });

  const addTwo = (x: number) => x + 2;

  const wrappedAddTwo = verbosify(addTwo);
  let input = 4;
  input = wrappedAddTwo(input);
  expect(input).toBe(6);
});
