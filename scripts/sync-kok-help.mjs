// 把 kok 仓库的 docs/help 帮助中心同步为博客的文档区（/docs/kok/）。
// 用法（在博客仓库根目录）：node scripts/sync-kok-help.mjs ../kok/docs/help
// 也可以不传参数；默认读取 ../kok/docs/help。
//
// 同一份 Markdown 会：抽出标题做 frontmatter、去掉一级标题、把帮助页内部链接改成
// /docs/kok/<路径>/、把 kok 仓库里的现有文档改成 GitHub 链接、把截图复制到
// public/docs/kok/，并把目录顺序写入 src/data/kok-docs.ts。

import fs from 'node:fs';
import path from 'node:path';

const blogRoot = process.cwd();
const sourceArg = process.argv[2] ?? '../kok/docs/help';
const helpRoot = path.resolve(blogRoot, sourceArg);
const kokRoot = path.resolve(helpRoot, '..', '..');
const outRoot = path.join(blogRoot, 'src', 'content', 'docs', 'kok');
const publicRoot = path.join(blogRoot, 'public', 'docs', 'kok');
const dataFile = path.join(blogRoot, 'src', 'data', 'kok-docs.ts');
const KOK_REPO = 'https://github.com/ChenShoukang/kok';
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif']);

if (!fs.existsSync(path.join(helpRoot, 'index.md'))) {
  console.error(`找不到帮助中心入口：${path.join(helpRoot, 'index.md')}`);
  process.exit(1);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

function plainText(markdown) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*_>#|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function pickDescription(body) {
  const blocks = body.split(/\n\s*\n/);
  for (const block of blocks) {
    const text = block.trim();
    if (!text) continue;
    if (/^(#|!\[|>|\||<|```)/.test(text)) continue;
    const plain = plainText(text);
    if (plain.length > 20) return plain.length > 140 ? `${plain.slice(0, 140)}…` : plain;
  }
  return 'kok 帮助中心。';
}

// 读取 index.md 的“完整目录”，得到分组与顺序。
function readNavigation() {
  const indexText = fs.readFileSync(path.join(helpRoot, 'index.md'), 'utf8');
  const start = indexText.indexOf('## 完整目录');
  if (start < 0) return [];
  const sections = [];
  let current = null;
  for (const line of indexText.slice(start).split(/\r?\n/)) {
    if (/^---\s*$/.test(line.trim())) break;
    const heading = line.match(/^###\s+(.+?)\s*$/);
    if (heading) {
      current = { title: heading[1], pages: [] };
      sections.push(current);
      continue;
    }
    const link = line.match(/^-\s+\[([^\]]+)\]\(([^)]+\.md)\)\s*$/);
    if (link && current) {
      const rel = link[2].replace(/^\.\//, '').split('#')[0];
      current.pages.push({ label: link[1], href: docHref(rel) });
    }
  }
  return sections.filter((section) => section.pages.length > 0);
}

function docHref(rel) {
  const clean = rel.replace(/\\/g, '/');
  if (clean === 'index.md') return '/docs/kok/';
  if (clean.endsWith('/index.md')) return `/docs/kok/${clean.slice(0, -'index.md'.length)}`;
  return `/docs/kok/${clean.replace(/\.md$/, '')}/`;
}

// 记录需要复制的图片，避免重复复制。
const copiedImages = new Set();

function copyImage(absPath) {
  const name = path.basename(absPath);
  const target = path.join(publicRoot, name);
  if (!copiedImages.has(target)) {
    ensureDir(publicRoot);
    fs.copyFileSync(absPath, target);
    copiedImages.add(target);
  }
  return `/docs/kok/${name}`;
}

function rewriteLinks(body, sourceFile) {
  return body.replace(/(!?\[[^\]]*\]\()([^)\n]+)(\))/g, (whole, open, rawTarget, close) => {
    const target = rawTarget.trim();
    if (!target || /^(https?:|mailto:|tel:|#|\/)/i.test(target)) return whole;

    const hashAt = target.indexOf('#');
    const pathPart = hashAt >= 0 ? target.slice(0, hashAt) : target;
    const anchor = hashAt >= 0 ? target.slice(hashAt) : '';
    if (!pathPart) return whole;

    let absPath;
    try {
      absPath = path.resolve(path.dirname(sourceFile), decodeURIComponent(pathPart));
    } catch {
      return whole;
    }
    if (!fs.existsSync(absPath)) return whole;

    const ext = path.extname(absPath).toLowerCase();
    if (IMAGE_EXT.has(ext)) {
      if (!absPath.startsWith(kokRoot + path.sep)) return whole;
      return `${open}${copyImage(absPath)}${anchor}${close}`;
    }

    if (absPath.startsWith(helpRoot + path.sep) && ext === '.md') {
      const rel = path.relative(helpRoot, absPath).split(path.sep).join('/');
      return `${open}${docHref(rel)}${anchor}${close}`;
    }

    if (absPath.startsWith(kokRoot + path.sep)) {
      const repoRel = path.relative(kokRoot, absPath).split(path.sep).join('/');
      const encoded = repoRel.split('/').map((part) => encodeURIComponent(part)).join('/');
      return `${open}${KOK_REPO}/blob/main/${encoded}${anchor}${close}`;
    }
    return whole;
  });
}

function escapeYaml(value) {
  return JSON.stringify(value);
}

const files = walk(helpRoot).filter((file) => file.toLowerCase().endsWith('.md'));
const navigation = readNavigation();
const known = new Set(navigation.flatMap((section) => section.pages.map((page) => page.href)));

if (fs.existsSync(outRoot)) fs.rmSync(outRoot, { recursive: true, force: true });
ensureDir(outRoot);

let converted = 0;
const missingFromNav = [];

for (const file of files) {
  const rel = path.relative(helpRoot, file).split(path.sep).join('/');
  const href = docHref(rel);
  if (rel !== 'index.md' && !known.has(href)) missingFromNav.push(rel);

  const raw = fs.readFileSync(file, 'utf8');
  const heading = raw.match(/^#\s+(.+?)\s*$/m);
  const title = heading ? heading[1].trim() : path.basename(rel, '.md');
  const body = heading ? raw.slice(0, heading.index) + raw.slice(heading.index + heading[0].length) : raw;
  const cleaned = body.replace(/^\s*\n+/, '');
  const description = pickDescription(cleaned);
  const linkRewritten = rewriteLinks(cleaned, file);

  const targetFile = path.join(outRoot, rel);
  ensureDir(path.dirname(targetFile));
  const frontmatter = [
    '---',
    `title: ${escapeYaml(title)}`,
    `description: ${escapeYaml(description)}`,
    '---',
    '',
  ].join('\n');
  fs.writeFileSync(targetFile, `${frontmatter}${linkRewritten}`, 'utf8');
  converted += 1;
}

const flat = [
  { label: '帮助中心首页', href: '/docs/kok/' },
  ...navigation.flatMap((section) => section.pages),
];
const data = `// 由 scripts/sync-kok-help.mjs 生成，请勿手改。
export interface KokDocLink {
  label: string;
  href: string;
}

export interface KokDocSection {
  title: string;
  pages: KokDocLink[];
}

export const KOK_DOCS: KokDocSection[] = ${JSON.stringify(navigation, null, 2)};

export const KOK_DOC_FLAT: KokDocLink[] = ${JSON.stringify(flat, null, 2)};
`;
ensureDir(path.dirname(dataFile));
fs.writeFileSync(dataFile, data, 'utf8');

console.log(`同步完成：${converted} 个页面，${navigation.length} 个分组，${copiedImages.size} 张图片。`);
if (missingFromNav.length) {
  console.log('以下页面不在 index.md 的完整目录中（不会出现在侧栏）：');
  for (const rel of missingFromNav) console.log('  - ' + rel);
}
