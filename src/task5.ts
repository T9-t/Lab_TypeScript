function applyPipeline<T1, T2>(
  initialValue: T1,
  fn1: (arg: T1) => T2
): T2;

function applyPipeline<T1, T2, T3>(
  initialValue: T1,
  fn1: (arg: T1) => T2,
  fn2: (arg: T2) => T3
): T3;

function applyPipeline<T1, T2, T3, T4>(
  initialValue: T1,
  fn1: (arg: T1) => T2,
  fn2: (arg: T2) => T3,
  fn3: (arg: T3) => T4
): T4;

function applyPipeline(
  initialValue: unknown,
  ...fns: Array<(arg: never) => unknown>
): unknown {
  return fns.reduce((acc, fn) => fn(acc as never), initialValue);
}


const double = (n: number): number => n * 2;
const formatRubles = (n: number): string => `число - - - ${n}`;
const toUpper = (s: string): string => s.toUpperCase();

// number -> number
const step1 = applyPipeline(10, double);
console.log(step1);

// number -> number -> string
const step2 = applyPipeline(10, double, formatRubles);
console.log(step2);

// number -> number -> string -> string
const step3 = applyPipeline(10, double, formatRubles, toUpper);
console.log(step3);

/*
// number -> string -> ошибка: double должен получать number, а получает string
const invalid = applyPipeline(10, formatRubles, double);
*/