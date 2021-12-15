export class BinaryNode<T> {
    public key: number = null;
    public value: T = null;
    public left: BinaryNode<T> = null;
    public right: BinaryNode<T> = null;

    constructor(value: T, key?: number) {
        this.value = value;
        this.key = key;
    }
}
