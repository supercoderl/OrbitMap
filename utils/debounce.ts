export const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: any) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
            timeout = null;
        }, delay);
    };
}