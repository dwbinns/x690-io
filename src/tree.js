import tree from "@dwbinns/terminal/tree";

export default function(root) {
    return tree({
        node: root,
        getDescription: node => node.getDescription?.() || node.constructor.name,
        getChildren: node => node.getChildren?.() || [],//Object.values(node),
    });
}
