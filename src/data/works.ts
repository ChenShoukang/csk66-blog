// 作品分区：书 / 影 / 音。
// 每个分区下面再分「栏目」，栏目对应 src/content/works/<分区>/<栏目>/*.md。
// 想加/改栏目名字、顺序、计数单位，改这里即可。
export type WorkKind = { slug: string; name: string; desc: string; unit?: string };
export type WorkCategory = { slug: string; name: string; unit: string; kinds: WorkKind[] };

export const WORK_CATEGORIES: WorkCategory[] = [
  {
    slug: 'books',
    name: '书',
    unit: '篇',
    kinds: [
      { slug: 'translation', name: '译作', desc: '把别的语言里的东西搬过来。' },
      { slug: 'novel', name: '小说', desc: '编出来的故事和人物。' },
      { slug: 'essay', name: '杂文', desc: '想到什么写什么。' },
    ],
  },
  {
    slug: 'films',
    name: '影',
    unit: '部',
    kinds: [
      { slug: 'recommend', name: '推荐作品', desc: '看过并觉得值得一看的。' },
      { slug: 'mine', name: '我的作品', desc: '自己拍的东西。' },
    ],
  },
  {
    slug: 'music',
    name: '音',
    unit: '张',
    kinds: [
      { slug: 'album', name: '推荐专辑', desc: '反复听的专辑。' },
      { slug: 'creation', name: '我的创作', desc: '自己写、自己录的声音。', unit: '首' },
    ],
  },
];

export const findCategory = (slug: string) => WORK_CATEGORIES.find((c) => c.slug === slug);
