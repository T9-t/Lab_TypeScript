function formatInput(input: number): string;
function formatInput(input: string): string;
function formatInput(input: Date): string;

function formatInput(input: number | string | Date): string {
    if (input instanceof Date) {
        return input.toISOString();
    }
    switch (typeof input) {
        case "number":
            return input.toFixed(2);

        case "string":
            return input.trim();

        default:
            const _exhaustiveCheck: never = input;
            return _exhaustiveCheck;
    }
}

const num = formatInput(4.1);
const str = formatInput("   Привет   ");
const date = formatInput(new Date("2026-11-14T11:48:00.000Z"));

console.log(num);
console.log(str);
console.log(date);