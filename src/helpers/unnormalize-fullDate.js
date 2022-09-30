export function unnormalizeFullDate(value) {
    return value?.split('-').reverse().join('.');
}