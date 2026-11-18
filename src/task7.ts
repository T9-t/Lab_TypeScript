function chunkArray<T>(items: readonly T[], chunkSize: number): T[][] {
  if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
    throw new RangeError("Размер блока должен быть положительным целым числом.");
  }
  const result: T[][] = [];

  for (let i = 0; i < items.length; i += chunkSize) {
    result.push(items.slice(i, i + chunkSize));
  }
  return result;
}


const numbers = [1];
console.log(chunkArray(numbers, 3));

const words = ["a", "b", "c", "d"];
console.log(chunkArray(words, 2));

console.log(chunkArray<number>([], 3));

const invalidSizes = [0, -2, 1.5, Number.NaN, Number.POSITIVE_INFINITY];
for (const size of invalidSizes) {
  try {
    console.log(chunkArray([1, 2, 3], size));
  } catch (error) {
    if (error instanceof RangeError) {
      console.error(`Ошибка для размера ${size}: ${error.message}`);
    }
  }
}