export function isPrime(value: number): boolean {
    if (value < 1) {
        return false;
    }
    if (value < 4) {
        return true;
    }
    if (value % 2 === 0) {
        return false;
    }

    const sqrt = Math.ceil(Math.sqrt(value));
    for (let i = 3; i <= sqrt; i += 2) {
        if (value % i === 0) {
            return false;
        }
    }

    return true;
}
