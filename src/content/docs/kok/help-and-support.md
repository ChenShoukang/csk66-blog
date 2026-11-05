---
title: "帮助与支持"
description: "遇到问题时，先按下面的顺序自查；如果仍然无法解决，再带着最小复现信息反馈。"
---
遇到问题时，先按下面的顺序自查；如果仍然无法解决，再带着最小复现信息反馈。

## 先做这几步

1. 确认当前是**纯净模式**还是**智能模式**，以及相关模块是否启用：**设置 → 功能**、**设置 → 资料库**。
2. 确认文件格式是否在支持范围内：见[支持的格式](/docs/kok/reference/formats/)。
3. 在**设置 → 资料库 → 关于 kok** 查看版本、WebView2 版本和资料库位置，并复制到反馈里。
4. 查看[常见问题](/docs/kok/reference/faq/)和[能力边界](/docs/kok/reference/boundaries/)，很多限制是设计边界而不是故障。
5. 查看[版本与更新](/docs/kok/reference/versions/)确认是否为已知问题。

## 反馈问题

- **功能问题与建议**：使用仓库的 Issues 页面。反馈时请说明 kok 版本、Windows 版本、操作步骤、
  预期结果和实际结果；如有截图，请打码私密内容。
- **安全漏洞**：请不要公开提交，按仓库安全说明中的渠道私下报告。
- **不要上传**：资料原文、私密笔记、AI 服务密钥、诊断日志中的敏感内容。kok 的诊断导出会省略提示词、
  正文、工具参数和密钥，但手动截图前仍建议确认。

> [!warning]+ 保护你的资料
> 反馈前先备份资料库目录。不要为了复现问题而删除原文件或移动 `data/` 文件夹。

## 文档在哪里

| 想了解 | 看这里 |
| --- | --- |
| 完整操作手册 | [帮助中心首页](/docs/kok/) |
| 当前用户指南（较完整的历史说明） | [使用指南](https://github.com/ChenShoukang/kok/blob/main/docs/GUIDE.md) |
| 三个区域的职责与分阶段能力 | [功能结构](https://github.com/ChenShoukang/kok/blob/main/docs/CREATION_PRODUCT_FLOW.md) |
| 格式、编码和导出支持 | [格式兼容性](https://github.com/ChenShoukang/kok/blob/main/docs/FORMATS.md) |
| 模式、私密文件夹与数据边界 | [模式与隐私](https://github.com/ChenShoukang/kok/blob/main/docs/MODES.md) |
| AI 服务配置与兼容性 | [AI 服务配置](https://github.com/ChenShoukang/kok/blob/main/docs/AI_PROVIDERS.md) |
| Agent 能力边界与审核 | [Agent 能力](https://github.com/ChenShoukang/kok/blob/main/docs/AGENT_0.9.3.md) · [审核交互](https://github.com/ChenShoukang/kok/blob/main/docs/AGENT_INTERACTIONS.md) |
| 本版验证记录 | [v0.11.2 验证](https://github.com/ChenShoukang/kok/blob/main/docs/VALIDATION_0.11.2.md) |
| 版本变化 | [更新记录](https://github.com/ChenShoukang/kok/blob/main/CHANGELOG.md) |

## 许可与致谢

kok 的原创代码与示例采用 MIT 许可；界面与运行时包含的第三方组件、字体和图标见
[第三方许可说明](https://github.com/ChenShoukang/kok/blob/main/THIRD_PARTY_NOTICES.md)。本项目是社区预览版，不是商业云服务。

---

**相关**

- [帮助中心首页](/docs/kok/)
- [常见问题](/docs/kok/reference/faq/)
- [版本与更新](/docs/kok/reference/versions/)
- [支持说明](https://github.com/ChenShoukang/kok/blob/main/SUPPORT.md) · [安全报告](https://github.com/ChenShoukang/kok/blob/main/SECURITY.md)

[返回帮助中心](/docs/kok/)
