# Claude Code Haha

> A locally runnable, production-grade replica of Claude Code, reverse-engineered from leaked source. Supports any Anthropic-compatible API (MiniMax, OpenRouter, Alibaba Bailian) and features a full Ink TUI, multi-agent orchestration, MCP protocol integration, and a comprehensive skill-based content creation pipeline.

<p align="right"><strong>中文</strong> | <a href="./README.en.md">English</a></p>

<p align="center">
  <img src="docs/00runtime.png" alt="运行截图" width="800">
</p>

---

## Overview

| | |
|---|---|
| **Project** | Claude Code Haha |
| **Version** | 999.0.0-local |
| **Runtime** | Bun + TypeScript |
| **UI Framework** | React + Ink (Terminal) |
| **Architecture** | Multi-agent, Skill-based, MCP protocol |

---

## Architecture Overview

<table>
  <tr>
    <td align="center" width="25%"><img src="docs/01-overall-architecture.png" alt="整体架构"><br><b>整体架构</b></td>
    <td align="center" width="25%"><img src="docs/02-request-lifecycle.png" alt="请求生命周期"><br><b>请求生命周期</b></td>
    <td align="center" width="25%"><img src="docs/03-tool-system.png" alt="工具系统"><br><b>工具系统</b></td>
    <td align="center" width="25%"><img src="docs/04-multi-agent.png" alt="多 Agent 架构"><br><b>多 Agent 架构</b></td>
  </tr>
  <tr>
    <td align="center" width="25%"><img src="docs/05-terminal-ui.png" alt="终端 UI"><br><b>终端 UI</b></td>
    <td align="center" width="25%"><img src="docs/06-permission-security.png" alt="权限与安全"><br><b>权限与安全</b></td>
    <td align="center" width="25%"><img src="docs/07-services-layer.png" alt="服务层"><br><b>服务层</b></td>
    <td align="center" width="25%"><img src="docs/08-state-data-flow.png" alt="状态与数据流"><br><b>状态与数据流</b></td>
  </tr>
</table>

---

## Features

- **Full Ink TUI** -- Complete terminal UI matching official Claude Code experience
- **Headless Mode** -- `--print` flag for scripts and CI pipelines
- **MCP Protocol** -- Model Context Protocol support for extensible tool integration
- **Playwright MCP** -- Browser automation via MCP server
- **Custom API** -- Any Anthropic-compatible endpoint (MiniMax, OpenRouter, Bailian)
- **Fallback Mode** -- Recovery CLI when full TUI encounters issues
- **Cross-platform** -- macOS, Linux, Windows (Git Bash)

---

## Technical Architecture

### Core Runtime

```
bin/claude-haha (entry script)
  -> preload.ts (Bun preload, MACRO globals)
  -> src/entrypoints/cli.tsx (CLI entry)
  -> src/main.tsx (Commander.js + React/Ink TUI)
    -> src/screens/REPL.tsx (interactive REPL)
    -> src/ink/ (terminal rendering engine)
    -> src/components/ (UI components)
```

### Agent Orchestration Layer

```
OpenClaw Gateway System
  ├── 大管家 (18789)     - Enterprise management & orchestration
  ├── 侦察兵 (18790)     - Reconnaissance & information gathering
  ├── 工程师 (18794)     - Technical engineering tasks
  ├── 企微大管家 (18795) - WeChat Work integration
  └── 文案小助手 (18798) - Content creation assistant
```

### Skill System

```
Content Creation Pipeline
  ├── /parallel-copywriting-agents    - Parallel copy & illustration
  ├── /intelligent-article-illustrator - Smart article illustration (9 styles)
  ├── /xiaohongshu-content-agent      - Xiaohongshu content planning
  ├── /comic-script-agent             - Story-to-comic script conversion
  ├── /knowledge-to-comic-agent       - Knowledge-to-comic (deep narrative)
  ├── /cartoon-image-generator        - Cartoon style image generation
  └── /cyberpunk-image-generator      - Cyberpunk style image generation
```

### Service Layer

```
src/services/
  ├── API     - Anthropic SDK with custom endpoint support
  ├── MCP     - Model Context Protocol server/client
  ├── OAuth   - Authentication flow
  ├── LSP     - Language Server Protocol integration
  └── Telemetry - Opt-out telemetry
```

### Tool System

```
src/tools/
  ├── BashTool      - Command execution
  ├── FileEditTool  - File editing
  ├── FileReadTool  - File reading
  ├── GlobTool      - Pattern matching
  ├── GrepTool      - Text search
  ├── WebSearchTool - Web search
  ├── WebFetchTool  - URL content fetch
  ├── AgentTool     - Parallel agent orchestration
  └── SkillTool     - Skill invocation
```

---

## Technical Highlights

### 1. Reverse Engineering & Source Repair

The leaked Claude Code source from the Anthropic npm registry (2026-03-31) had multiple critical blocking issues. Key repairs included:

| Issue | Root Cause | Fix |
|---|---|---|
| TUI never launches | Entry script routed no-arg startup to recovery CLI | Restored full `cli.tsx` entry path |
| Startup hang | `verify` skill imports missing `.md`, Bun text loader hangs indefinitely | Added stub resource files |
| `--print` hangs | `filePersistence/types.ts` missing | Added type stub files |
| `--print` hangs | `ultraplan/prompt.txt` missing | Added resource stub files |
| **Enter key dead** | `modifiers-napi` native package missing, `isModifierPressed()` throws, `handleEnter` interrupted, `onSubmit` never fires | Added try/catch fault tolerance |
| Setup skipped | `preload.ts` auto-set `LOCAL_RECOVERY=1`, bypassing all initialization | Removed default override |

### 2. Multi-Agent Orchestration Architecture

Implemented a parallel agent system with fixed port mapping, eliminating the random port/name mismatch issue. Each agent runs on a dedicated port with a fixed workspace, enabling reliable inter-agent communication through the OpenClaw gateway system.

**Design pattern**: Agents can call each other in a mesh topology -- the Manager (大管家) orchestrates work by delegating to Scouts, Engineers, and Writers, forming a collaborative network rather than a rigid hierarchy.

### 3. Skill-Based Content Creation Pipeline

Built a modular, composable skill system that replaces traditional workflow engines. Each skill is a text file that can be independently maintained, shared, and combined. The system supports:

- **Parallel execution** -- Multiple agents working simultaneously on different aspects (copywriting, illustration, design)
- **Style matching** -- 9 preset illustration styles (tech, warm, minimal, playful, notion, elegant, vibrant, retro, nature)
- **Platform optimization** -- Specialized pipelines for Xiaohongshu, comics, and knowledge visualization
- **Self-evolution** -- Skills improve through usage data and feedback loops

### 4. Cross-Platform Compatibility

Achieved full TUI functionality across macOS, Linux, and Windows (via Git Bash). The architecture gracefully degrades on Windows where native features (voice input, Computer Use, sandbox) are unavailable, preserving the core interactive experience.

### 5. MCP Protocol Integration

Integrated the Model Context Protocol for extensible tool capabilities, including a Playwright MCP server that provides browser automation -- page navigation, element interaction, JavaScript execution, and session management -- all through the standard MCP interface.

---

## Tech Stack

| Category | Technology |
|---|---|
| Runtime | Bun |
| Language | TypeScript |
| Terminal UI | React + Ink |
| CLI Parser | Commander.js |
| API | Anthropic SDK |
| Protocols | MCP, LSP |
| Browser Automation | Playwright |
| Package Manager | Bun |
| State Management | React hooks + context |
| Validation | Zod |
| HTTP Client | Undici, Axios |

---

## Project Structure

```
bin/claude-haha           # Entry script
config/
  └── agent-ports.json    # Fixed agent port mapping
src/
  ├── entrypoints/cli.tsx # Main CLI entry
  ├── main.tsx            # TUI logic (Commander + React/Ink)
  ├── QueryEngine.ts      # Query processing engine
  ├── Tool.ts             # Tool system core
  ├── Task.ts             # Task management & scheduling
  ├── context.ts          # Application context
  ├── ink/                # Terminal rendering engine
  ├── components/         # UI components
  ├── tools/              # Agent tools (10+ tools)
  ├── commands/           # Slash commands
  ├── skills/             # Skill system
  ├── services/           # API, MCP, OAuth, LSP
  └── playwright-mcp-server.ts  # Playwright MCP server
scripts/                  # Agent management scripts
skills/                   # Content creation skills
docs/                     # Architecture diagrams & documentation
sites/                    # Subdomain site templates
```

---

## Quick Start

```bash
# Install dependencies
bun install

# Configure environment
cp .env.example .env
# Edit .env with your API key

# Launch TUI
./bin/claude-haha

# Headless mode
./bin/claude-haha -p "your prompt here"

# Recovery mode (fallback)
CLAUDE_CODE_FORCE_RECOVERY_CLI=1 ./bin/claude-haha
```

### Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | API key (x-api-key header) |
| `ANTHROPIC_AUTH_TOKEN` | Bearer token (Authorization header) |
| `ANTHROPIC_BASE_URL` | Custom API endpoint (default: Anthropic) |
| `ANTHROPIC_MODEL` | Default model |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Sonnet-tier model mapping |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Haiku-tier model mapping |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Opus-tier model mapping |
| `DISABLE_TELEMETRY=1` | Disable telemetry |

---

## Results & Progress

| Metric | Value |
|---|---|
| Source repairs | 6 critical blocking issues fixed |
| Agent system | 5 specialized agents with fixed port mapping |
| Skills | 10+ content creation skills |
| Subdomain sites | 13 professional sites built (bojoo.online) |
| Cross-platform | macOS, Linux, Windows support |
| Protocols | MCP, LSP, OAuth integration |
| Documentation | 50+ markdown documents |
| Architecture diagrams | 8 system architecture diagrams |

---

## Reflection & Growth

### What Went Well

- **Systematic debugging approach**: Traced each blocking issue to its root cause through careful investigation of the codebase, rather than applying surface-level patches. This methodology proved essential when dealing with obfuscated and incomplete source.

- **Modular architecture design**: The skill-based system replaced rigid workflow patterns with composable, text-based skills. This design proved highly effective -- skills can be independently tested, shared, and evolved without affecting the core system.

- **Cross-platform resilience**: The graceful degradation strategy on Windows (where native features are unavailable) preserved the core TUI experience, demonstrating the importance of designing for partial capability rather than all-or-nothing.

### Challenges & Lessons Learned

- **Native module dependencies**: The `modifiers-napi` issue taught me that missing native packages can create silent failures (Enter key appears dead but the UI seems functional). The lesson: always trace the execution path, not just the symptom.

- **Resource stub management**: The leaked source assumed certain resource files existed in the npm package but they were stripped during packaging. Creating minimal stub files that satisfy import requirements without affecting runtime behavior was a key technique.

- **Agent orchestration complexity**: Fixed port mapping solved the port/name mismatch problem, but revealed a deeper challenge: inter-agent communication overhead grows non-linearly. The solution was to implement dynamic load balancing (simple tasks use 1-2 agents, complex tasks scale to 5+).

### Personal Growth

This project represented a significant step forward in understanding large-scale TypeScript applications, terminal UI architecture, and multi-agent system design. The experience of reverse-engineering and repairing a production-grade codebase accelerated learning in:

- Debugging complex async execution paths
- Designing extensible plugin architectures
- Cross-platform compatibility patterns
- Systematic root cause analysis

---

## Project Status

**Current State**: Functional and locally runnable. The full Ink TUI launches successfully, all core tools work, multi-agent system is operational, and the skill-based content creation pipeline is active.

**Last Updated**: 2026-04-20

**Known Limitations**:
- Voice input, Computer Use, and Sandbox features unavailable on Windows
- Some enterprise features (OAuth flow, remote sync) require Anthropic-specific infrastructure
- Native modules (`modifiers-napi`) may require platform-specific compilation

---

## Disclaimer

This repository is based on the Claude Code source leaked from the Anthropic npm registry on 2026-03-31. All original source code copyrights belong to [Anthropic](https://www.anthropic.com). It is provided for learning and research purposes only.
