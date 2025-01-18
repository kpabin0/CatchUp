
export function getArray(count : any)
{
    return Array(count).fill(0).map((_, index) => index + 1)
}