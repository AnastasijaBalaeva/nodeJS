import { BinaryTree } from "./binarytree";

const tree: BinaryTree<number> = new BinaryTree<number>();

function nodeInititator(type: string, selector: HTMLElement): void {
    const binaryUl = document.getElementById("binaryTreeStructure");
    const output = document.getElementById("find-output");
    const el = <HTMLInputElement>selector.closest(".field-group").querySelector("[name=\"binary-input\"]");
    const key = <HTMLInputElement>selector.closest(".field-group").querySelector("[name=\"binary-key\"]");
    switch (type) {
        case "add":
            tree.insert(parseFloat(el.value), parseFloat(key.value));
            tree.consoleIt();
            break;
        case "del":
            tree.delete(parseFloat(key.value));
            tree.consoleIt();
            break;
        case "find":
            output.innerHTML = tree.find(parseFloat(key.value)).value + "";
            break;
    }
    binaryUl.innerHTML = tree.draw();
}

const initiator = document.querySelectorAll(".binary-mod");
if (initiator) {
    initiator.forEach(function (elem: Element): void {
        elem.addEventListener("click", function (e: Event): void {
            const element = (e.target as HTMLElement);
            const param = element.getAttribute("id");
            nodeInititator(param, element);
        });
    });
}
