import regeneratorRuntime from "regenerator-runtime";  // allow generator function in older browsers

export function* infinite() {
    let index = 0;

    while (true) {
        yield index++;
    }
}
