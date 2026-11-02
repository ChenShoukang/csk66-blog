// 由 scripts/sync-kok-help.mjs 生成，请勿手改。
export interface KokDocLink {
  label: string;
  href: string;
}

export interface KokDocSection {
  title: string;
  pages: KokDocLink[];
}

export const KOK_DOCS: KokDocSection[] = [
  {
    "title": "开始使用",
    "pages": [
      {
        "label": "安装 kok",
        "href": "/docs/kok/getting-started/install/"
      },
      {
        "label": "选择使用模式",
        "href": "/docs/kok/getting-started/modes/"
      },
      {
        "label": "导入第一份资料",
        "href": "/docs/kok/getting-started/import/"
      },
      {
        "label": "认识界面",
        "href": "/docs/kok/getting-started/interface/"
      }
    ]
  },
  {
    "title": "Agent",
    "pages": [
      {
        "label": "Agent 概览",
        "href": "/docs/kok/agent/"
      },
      {
        "label": "发起一个 Agent 任务",
        "href": "/docs/kok/agent/start-task/"
      },
      {
        "label": "审查与撤销修改",
        "href": "/docs/kok/agent/review-changes/"
      },
      {
        "label": "成果、任务记录与会话",
        "href": "/docs/kok/agent/results-history/"
      },
      {
        "label": "长期记忆与计划任务",
        "href": "/docs/kok/agent/memory-schedules/"
      },
      {
        "label": "外部工具 MCP",
        "href": "/docs/kok/agent/mcp/"
      },
      {
        "label": "技能、用量与费用",
        "href": "/docs/kok/agent/skills-budget/"
      }
    ]
  },
  {
    "title": "我的作品",
    "pages": [
      {
        "label": "我的作品概览",
        "href": "/docs/kok/works/"
      },
      {
        "label": "新建与编辑文档",
        "href": "/docs/kok/works/create-documents/"
      },
      {
        "label": "制作演示文稿",
        "href": "/docs/kok/works/presentations/"
      },
      {
        "label": "继续创作与草稿",
        "href": "/docs/kok/works/continue-editing/"
      },
      {
        "label": "项目空间、素材摘录与配方",
        "href": "/docs/kok/works/projects-clips-recipes/"
      },
      {
        "label": "剪辑已有音视频与整理 PDF",
        "href": "/docs/kok/works/edit-media/"
      }
    ]
  },
  {
    "title": "资料库",
    "pages": [
      {
        "label": "资料库概览",
        "href": "/docs/kok/library/"
      },
      {
        "label": "观看视频",
        "href": "/docs/kok/library/watch-video/"
      },
      {
        "label": "收听音乐与音频",
        "href": "/docs/kok/library/listen-music/"
      },
      {
        "label": "阅读文档与电子书",
        "href": "/docs/kok/library/read-documents-books/"
      },
      {
        "label": "浏览与编辑照片",
        "href": "/docs/kok/library/view-photos/"
      },
      {
        "label": "继续、收藏、最近与分类",
        "href": "/docs/kok/library/continue-favorites/"
      },
      {
        "label": "搜索与检索",
        "href": "/docs/kok/library/search/"
      },
      {
        "label": "保存摘录",
        "href": "/docs/kok/library/clips/"
      },
      {
        "label": "使用智能集合",
        "href": "/docs/kok/library/smart-collections/"
      },
      {
        "label": "回顾使用记录",
        "href": "/docs/kok/library/review/"
      },
      {
        "label": "查看知识图谱",
        "href": "/docs/kok/library/knowledge-graph/"
      },
      {
        "label": "智能整理",
        "href": "/docs/kok/library/organize/"
      },
      {
        "label": "下载网络视频",
        "href": "/docs/kok/library/video-downloads/"
      },
      {
        "label": "资料库工具、历史与备份",
        "href": "/docs/kok/library/library-tools-backup/"
      }
    ]
  },
  {
    "title": "设置",
    "pages": [
      {
        "label": "设置概览",
        "href": "/docs/kok/settings/"
      },
      {
        "label": "外观与字体",
        "href": "/docs/kok/settings/appearance/"
      },
      {
        "label": "阅读与播放偏好",
        "href": "/docs/kok/settings/reading-playback/"
      },
      {
        "label": "配置 AI 服务",
        "href": "/docs/kok/settings/ai-service/"
      },
      {
        "label": "模块管理",
        "href": "/docs/kok/settings/modules/"
      },
      {
        "label": "私密文件夹",
        "href": "/docs/kok/settings/private-folder/"
      },
      {
        "label": "数据、备份与更新",
        "href": "/docs/kok/settings/data-backup/"
      }
    ]
  },
  {
    "title": "参考资料",
    "pages": [
      {
        "label": "支持的格式",
        "href": "/docs/kok/reference/formats/"
      },
      {
        "label": "键盘快捷键",
        "href": "/docs/kok/reference/shortcuts/"
      },
      {
        "label": "术语表",
        "href": "/docs/kok/reference/glossary/"
      },
      {
        "label": "能力边界与未实现",
        "href": "/docs/kok/reference/boundaries/"
      },
      {
        "label": "常见问题",
        "href": "/docs/kok/reference/faq/"
      },
      {
        "label": "版本与更新",
        "href": "/docs/kok/reference/versions/"
      }
    ]
  },
  {
    "title": "关于 kok",
    "pages": [
      {
        "label": "认识 kok",
        "href": "/docs/kok/about-kok/"
      },
      {
        "label": "帮助与支持",
        "href": "/docs/kok/help-and-support/"
      }
    ]
  }
];

export const KOK_DOC_FLAT: KokDocLink[] = [
  {
    "label": "帮助中心首页",
    "href": "/docs/kok/"
  },
  {
    "label": "安装 kok",
    "href": "/docs/kok/getting-started/install/"
  },
  {
    "label": "选择使用模式",
    "href": "/docs/kok/getting-started/modes/"
  },
  {
    "label": "导入第一份资料",
    "href": "/docs/kok/getting-started/import/"
  },
  {
    "label": "认识界面",
    "href": "/docs/kok/getting-started/interface/"
  },
  {
    "label": "Agent 概览",
    "href": "/docs/kok/agent/"
  },
  {
    "label": "发起一个 Agent 任务",
    "href": "/docs/kok/agent/start-task/"
  },
  {
    "label": "审查与撤销修改",
    "href": "/docs/kok/agent/review-changes/"
  },
  {
    "label": "成果、任务记录与会话",
    "href": "/docs/kok/agent/results-history/"
  },
  {
    "label": "长期记忆与计划任务",
    "href": "/docs/kok/agent/memory-schedules/"
  },
  {
    "label": "外部工具 MCP",
    "href": "/docs/kok/agent/mcp/"
  },
  {
    "label": "技能、用量与费用",
    "href": "/docs/kok/agent/skills-budget/"
  },
  {
    "label": "我的作品概览",
    "href": "/docs/kok/works/"
  },
  {
    "label": "新建与编辑文档",
    "href": "/docs/kok/works/create-documents/"
  },
  {
    "label": "制作演示文稿",
    "href": "/docs/kok/works/presentations/"
  },
  {
    "label": "继续创作与草稿",
    "href": "/docs/kok/works/continue-editing/"
  },
  {
    "label": "项目空间、素材摘录与配方",
    "href": "/docs/kok/works/projects-clips-recipes/"
  },
  {
    "label": "剪辑已有音视频与整理 PDF",
    "href": "/docs/kok/works/edit-media/"
  },
  {
    "label": "资料库概览",
    "href": "/docs/kok/library/"
  },
  {
    "label": "观看视频",
    "href": "/docs/kok/library/watch-video/"
  },
  {
    "label": "收听音乐与音频",
    "href": "/docs/kok/library/listen-music/"
  },
  {
    "label": "阅读文档与电子书",
    "href": "/docs/kok/library/read-documents-books/"
  },
  {
    "label": "浏览与编辑照片",
    "href": "/docs/kok/library/view-photos/"
  },
  {
    "label": "继续、收藏、最近与分类",
    "href": "/docs/kok/library/continue-favorites/"
  },
  {
    "label": "搜索与检索",
    "href": "/docs/kok/library/search/"
  },
  {
    "label": "保存摘录",
    "href": "/docs/kok/library/clips/"
  },
  {
    "label": "使用智能集合",
    "href": "/docs/kok/library/smart-collections/"
  },
  {
    "label": "回顾使用记录",
    "href": "/docs/kok/library/review/"
  },
  {
    "label": "查看知识图谱",
    "href": "/docs/kok/library/knowledge-graph/"
  },
  {
    "label": "智能整理",
    "href": "/docs/kok/library/organize/"
  },
  {
    "label": "下载网络视频",
    "href": "/docs/kok/library/video-downloads/"
  },
  {
    "label": "资料库工具、历史与备份",
    "href": "/docs/kok/library/library-tools-backup/"
  },
  {
    "label": "设置概览",
    "href": "/docs/kok/settings/"
  },
  {
    "label": "外观与字体",
    "href": "/docs/kok/settings/appearance/"
  },
  {
    "label": "阅读与播放偏好",
    "href": "/docs/kok/settings/reading-playback/"
  },
  {
    "label": "配置 AI 服务",
    "href": "/docs/kok/settings/ai-service/"
  },
  {
    "label": "模块管理",
    "href": "/docs/kok/settings/modules/"
  },
  {
    "label": "私密文件夹",
    "href": "/docs/kok/settings/private-folder/"
  },
  {
    "label": "数据、备份与更新",
    "href": "/docs/kok/settings/data-backup/"
  },
  {
    "label": "支持的格式",
    "href": "/docs/kok/reference/formats/"
  },
  {
    "label": "键盘快捷键",
    "href": "/docs/kok/reference/shortcuts/"
  },
  {
    "label": "术语表",
    "href": "/docs/kok/reference/glossary/"
  },
  {
    "label": "能力边界与未实现",
    "href": "/docs/kok/reference/boundaries/"
  },
  {
    "label": "常见问题",
    "href": "/docs/kok/reference/faq/"
  },
  {
    "label": "版本与更新",
    "href": "/docs/kok/reference/versions/"
  },
  {
    "label": "认识 kok",
    "href": "/docs/kok/about-kok/"
  },
  {
    "label": "帮助与支持",
    "href": "/docs/kok/help-and-support/"
  }
];
