---
name: review-and-commit
description: >-
  先对未提交改动做内联缺陷优先 code review，无 P0/P1 后再按仓库约定提交。
  Use when the user asks to 提交、commit、review 并提交、提交前 review、
  检查后提交，或明确要求先 review 再 commit。
---

# Review and Commit

对**当前工作区未提交改动**执行：先内联缺陷优先 review → 通过后再 commit。不 push，除非用户另说。

## 流程清单

```text
Progress:
- [ ] 1. 收集 diff
- [ ] 2. 内联缺陷优先 review
- [ ] 3. 门禁判定
- [ ] 4. 通过则提交；否则阻止并汇报
```

---

## 1. 收集 diff

并行执行（仅 git，不额外读业务代码以外的探索）：

```bash
git status
git diff
git diff --staged
git log -5 --oneline
```

- 审查范围：全部 **unstaged + staged + untracked**（即将纳入本次提交的内容）。
- 无改动：一句话告知，结束，不创建空提交。
- 勿提交疑似密钥（`.env`、`credentials.json` 等）；若用户点名要提交，先警告并停下。

---

## 2. 内联缺陷优先 review

**亲自审查**，不要委托 Bugbot / Security Review / 其他 subagent。

步骤：

1. 读完整 diff；对触及文件读够上下文（调用方、类型、相关测试）。
2. 若改动落在 `React/`，再对照 `.cursor/rules/react-code-review.mdc` checklist。
3. 只报**本次改动引入**、可演示、作者多半会修的问题；不报臆测、既有债、纯风格。

### 严重度

| 级别 | 含义 | 门禁 |
|------|------|------|
| P0 | 发布阻断 / 严重正确性或安全问题 | **阻止提交** |
| P1 | 紧急缺陷，应立刻修 | **阻止提交** |
| P2 | 普通缺陷，值得修 | 不阻止（汇报即可） |
| P3 | 低影响仍值得修 | 不阻止 |

React checklist 映射：`必须改` → P0/P1；`建议改` → P2；`可选/风格` → P3。

### 输出格式

先给结论行，再列 findings（按严重度降序）：

```text
## Review 结论：可提交 | 需修改后再提交

[P1] 祈使句标题 — path/to/file.ts:42
简短说明触发场景与错误行为。

[P2] ...
```

无合格 finding 时写：`No findings.` + 一句整体评估。

---

## 3. 门禁判定

- 存在任意 **P0 或 P1** → **禁止 commit**。汇报 findings，等待用户决定是否先修；不要擅自大改后强行提交。
- 仅有 P2/P3 或无 finding → 进入提交。
- 用户明确说「忽略 review / 强制提交」时，可跳过门禁，但须在回复里注明已跳过及未修的 P0/P1。

---

## 4. 提交

严格遵循用户的 git 提交协议：

1. 再次并行：`git status`、`git diff`（staged+unstaged）、`git log`（对齐 message 风格）。
2. 暂存相关文件；排除密钥与明确无关文件。
3. HEREDOC 提交（1–2 句，说清 why）：

```bash
git commit -m "$(cat <<'EOF'
Commit message here.

EOF
)"
```

4. `git status` 验证成功。
5. hook 失败：修好后 **新建** commit，不 amend（除非满足用户规则里的 amend 全部条件）。
6. **不 push**，除非用户明确要求。

提交成功后简短回复：review 结论（可提交 / 仅有 P2–P3）+ commit hash + subject。
