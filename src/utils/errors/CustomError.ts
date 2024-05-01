export default class CustomError extends Error {
    status: number;
    constructor(message?: string, status: number = 500) {
        super(message); // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, CustomError.prototype); // restore prototype chain

        this.status = status;

    }
}