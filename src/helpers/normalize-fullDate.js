export function normalizeFullDate(value) {
    return value?.split('.').reverse().join('-');
}