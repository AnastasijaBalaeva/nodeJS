import { BinaryNode } from "./binarynode";
import { BinaryTree } from "./binarytree";

class BinaryDraw<T> {
    public addSelector(value: T): void {
        const node: BinaryNode<T> = new BinaryNode<T>(value);
    }
}
