// 把帮助文档里的 Obsidian callout（> [!tip]- 小提示 …）转成带样式的 <aside>。
// 支持 tip / info / warning / example；折叠标记（- / +）不参与渲染，统一展开。
const TYPES = {
  tip: { icon: '💡', title: '小提示' },
  info: { icon: 'ℹ️', title: '说明' },
  warning: { icon: '⚠️', title: '注意' },
  example: { icon: '🧩', title: '示例' },
};

const MARKER = /^\[!(tip|info|warning|example)\]([+-]?)\s*([^\n]*)(?:\n|$)/i;

function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  visit(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child, visit);
  }
}

export default function remarkCallouts() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'blockquote' || !Array.isArray(node.children)) return;
      const first = node.children[0];
      if (first?.type !== 'paragraph' || !Array.isArray(first.children)) return;
      const textNode = first.children[0];
      if (textNode?.type !== 'text') return;

      const match = textNode.value.match(MARKER);
      if (!match) return;

      const type = match[1].toLowerCase();
      const customTitle = match[3].trim();
      const meta = TYPES[type] ?? TYPES.info;
      const title = customTitle || meta.title;

      textNode.value = textNode.value.slice(match[0].length);
      if (!textNode.value.trim()) first.children.shift();
      if (first.children.length === 0) node.children.shift();

      const content = node.children;
      node.data = {
        hName: 'aside',
        hProperties: { className: `callout callout-${type}` },
      };
      node.children = [
        {
          type: 'paragraph',
          data: {
            hName: 'div',
            hProperties: { className: 'callout-title' },
          },
          children: [{ type: 'text', value: `${meta.icon} ${title}` }],
        },
        {
          type: 'blockquote',
          data: {
            hName: 'div',
            hProperties: { className: 'callout-body' },
          },
          children: content,
        },
      ];
    });
  };
}
