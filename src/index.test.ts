import { verbosify } from ".";

test('Verbosify should execute function correctly', () => {
  const addTwo = (x: number) => x + 2; 

  const wrappedAddTwo = verbosify(addTwo);
  let input = 4;
  input = wrappedAddTwo(input);
  expect(input).toBe(6);
});
