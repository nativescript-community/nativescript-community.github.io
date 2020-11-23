export function query(size: number) {
    // return fetch(`https://api.npms.io/v2/search?q=@nativescript-community&size=${size}`);
    return fetch(`http://registry.npmjs.com/-/v1/search?text=@nativescript-community&size=${size}`);
}
