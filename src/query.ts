export function query(size: number) {
    return fetch(`https://api.npms.io/v2/search?q=@nativescript-community&size=${size}`);
}
