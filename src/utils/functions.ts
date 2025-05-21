export function parseAmount (arg: number): string {
    return arg.toFixed(4)
}

export function parseAmountToTwo (arg: number): string {
    
    if (!arg)  return '';

    return arg.toFixed(2)
}