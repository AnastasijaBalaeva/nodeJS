import { BinaryNode } from "./binarynode";

export class BinaryTree<T> {
    protected _root: BinaryNode<T> = null;

    public counter: number = 1;

    public isEmpty(): boolean {
        return (this._root === null);
    }

    public insert(value: T, key?: number): void {
        if (key === undefined) {
            key = this.counter++;
        }
        const node: BinaryNode<T> = new BinaryNode<T>(value, key);

        this._root = this.isEmpty() ? node : this.insertNode(node, this._root);

    }

    protected insertNode(node: BinaryNode<T>, subtree: BinaryNode<T>): BinaryNode<T> {
        if (subtree === null) {

            subtree = node;
        } else {
            if (node.key < subtree.key) {
                subtree.left = this.insertNode(node, subtree.left);
            } else if (node.key > subtree.key) {
                subtree.right = this.insertNode(node, subtree.right);
            }
        }
        return subtree;
    }

    public find(key: number): BinaryNode<T> {
        return this.findNode(key, this._root);
    }

    protected findNode(key: number, subtree: BinaryNode<T>): BinaryNode<T> {
        if (subtree == null) {
            throw new Error("Node isn't found");
        }
        if (subtree.key > key) {
            subtree = this.findNode(key, subtree.left);
        } else if (subtree.key < key) {
            subtree = this.findNode(key, subtree.right);
        } else if (subtree.key === key) {
            subtree = subtree;
        }
        return subtree;
    }

    public delete(key: number): void {
        if (this.isEmpty()) {
            throw new Error("Three is empty");
        }
        const node: BinaryNode<T> = this.findNode(key, this._root);
        if (node) {
            this._root = this.deleteNode(node, this._root);
        }
    }

    protected deleteNode(node: BinaryNode<T>, subtree: BinaryNode<T>): BinaryNode<T> {
        if (subtree == null) {
            return null;
        }
        if (subtree.key > node.key) {
            subtree.left = this.deleteNode(node, subtree.left);
        } else if (subtree.key < node.key) {
            subtree.right = this.deleteNode(node, subtree.right);
        } else {
            if (subtree.left == null && subtree.right == null) {
                subtree = null;
            } else {
                if (subtree.left == null) {
                    subtree = subtree.right;
                }
                if (subtree.right == null) {
                    subtree = subtree.left;
                }
            }
        }
        return subtree;
    }

    public consoleIt(): void {
        console.log(this._root);
    }

    public draw(): string {
        if (this.isEmpty()) {
            throw new Error("Three is empty");
        }
        return this.drawNode(this._root).innerHTML;
    }

    public drawNode(subtree: BinaryNode<T>): HTMLElement {
        const nodeElement = document.createElement("li");
        const nodeChildElement = document.createElement("ul");
        const aElement = document.createElement("a");
        const value = subtree.value.toString();
        if (subtree.left == null && subtree.right == null) {
            nodeElement.innerHTML = `<a>${value}</a>`;
        } else if (subtree.right == null) {
            nodeElement.innerHTML = `<a>${value}</a>`;
            nodeElement.classList.add("has-child", "left");
            nodeChildElement.append(this.drawNode(subtree.left));
            nodeChildElement.classList.add("left");
            nodeElement.append(nodeChildElement);
        } else if (subtree.left == null) {
            nodeElement.innerHTML = `<a>${value}</a>`;
            nodeElement.classList.add("has-child", "right");
            nodeChildElement.append(this.drawNode(subtree.right));
            nodeChildElement.classList.add("right");
            nodeElement.append(nodeChildElement);
        } else {
            aElement.innerHTML = value;
            nodeElement.append(aElement);
            nodeElement.classList.add("has-child");
            nodeChildElement.append(this.drawNode(subtree.left));
            nodeChildElement.append(this.drawNode(subtree.right));
            nodeElement.append(nodeChildElement);
        }
        return nodeElement;
    }
}

