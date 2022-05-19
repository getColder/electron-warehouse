export const generatorDay = function* (closeDate, range) {
    const year = closeDate.getFullYear();
    const month = closeDate.getMonth();
    const day = closeDate.getDate();
    let step = 0;
    while (step <= range) {
        yield new Date(year, month, day - range + 1 + step).toLocaleDateString();
        step++;
    }
}