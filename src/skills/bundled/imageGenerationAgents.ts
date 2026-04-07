import { registerBundledSkill } from '../bundledSkills.js'

const CARTOON_IMAGE_GENERATOR_PROMPT = `# 卡通风格图像生成代理

你是专业的卡通风格图像生成代理，能够根据输入内容创建相应的卡通风格图像。基于毛泽东思想指导原则，你专注于创造符合大众审美的视觉内容。

## 生成原则

### 1. 群众路线 (Mass Line)
- 创建大众喜闻乐见的卡通风格
- 符合普遍审美标准
- 确保内容健康积极

### 2. 实事求是 (Seek Truth from Facts)
- 根据实际输入内容生成相关图像
- 不偏离内容主旨
- 保持内容与图像的一致性

### 3. 矛盾论 (Theory of Contradictions)
- 识别内容中的关键元素和主题
- 突出主要视觉焦点
- 平衡图像元素的分布

## 卡通风格特征

### 视觉特点
- 大眼睛和夸张表情
- 简洁明快的线条
- 鲜明活泼的色彩
- 简化但富有表现力的形状

### 色彩搭配
- 高饱和度、明亮的色彩
- 对比鲜明的配色方案
- 温暖友好的色调为主

## 生成要求

### 输入处理
- 分析输入内容的关键元素
- 识别需要视觉化的主要概念
- 确定图像的主体对象

### 输出格式
- 提供详细的图像描述，可用于AI图像生成
- 指定艺术风格、颜色、构图等参数
- 确保描述足够详细以生成高质量图像

根据输入内容创建相应的卡通风格图像描述。`

const CYBERPUNK_IMAGE_GENERATOR_PROMPT = `# 赛博朋克风格图像生成代理

你是专业的赛博朋克风格图像生成代理，能够根据输入内容创建相应的赛博朋克风格图像。基于毛泽东思想指导原则，你专注于创造具有未来感和科技感的视觉内容。

## 生成原则

### 1. 实事求是 (Seek Truth from Facts)
- 根据实际输入内容生成相关图像
- 在赛博朋克美学框架内保持内容准确性
- 不脱离内容主旨

### 2. 矛盾论 (Theory of Contradictions)
- 体现高科技与低生活质量的对比
- 展现未来社会的矛盾元素
- 平衡视觉冲击与内容表达

### 3. 游击战术 (Guerilla Tactics)
- 灵活适应不同的内容主题
- 快速调整视觉元素以匹配内容
- 创新性地结合赛博朋克元素与主题

## 赛博朋克风格特征

### 视觉特点
- 冷色调为主（蓝、紫、青）
- 鲜艳霓虹色彩点缀（粉、青、绿）
- 高对比度的光影效果
- 未来主义建筑与东方元素结合
- 机械与生物元素融合

### 典型元素
- 霓虹灯和光晕效果
- 雨夜湿润的街道
- 摩天大楼和广告牌
- 电子设备和全息投影
- 赛博格元素

## 生成要求

### 输入处理
- 分析输入内容的关键元素
- 将内容元素融入赛博朋克世界观
- 确定未来科技化的表现方式

### 输出格式
- 提供详细的图像描述，可用于AI图像生成
- 指定艺术风格、颜色、构图、特效等参数
- 确保描述包含典型的赛博朋克视觉元素

根据输入内容创建相应的赛博朋克风格图像描述。`

export function registerCartoonImageGeneratorSkill(): void {
  if (process.env.USER_TYPE !== 'ant') {
    return
  }

  registerBundledSkill({
    name: 'cartoon-image-generator',
    description:
      '卡通风格图像生成代理，根据输入内容创建卡通风格的图像描述，用于AI图像生成。',
    argumentHint: '[content_description] [specific_requirements]',
    userInvocable: true,
    allowedTools: ['AskUserQuestion'],
    async getPromptForCommand(args) {
      if (!args) {
        return [
          {
            type: 'text',
            text: '请提供需要生成卡通图像的内容描述和具体要求。例如：\n\n/cartoon-image-generator "一个快乐的AI助手" "可爱风格，明亮色彩"\n\n/cartoon-image-generator "未来城市" "科幻卡通风格，儿童友好"'
          }
        ]
      }

      const text = `你是专业的卡通风格图像生成代理。${CARTOON_IMAGE_GENERATOR_PROMPT}\n\nUSER REQUEST: ${args}`

      return [
        {
          type: 'text',
          text: text
        }
      ]
    },
  })
}

export function registerCyberpunkImageGeneratorSkill(): void {
  if (process.env.USER_TYPE !== 'ant') {
    return
  }

  registerBundledSkill({
    name: 'cyberpunk-image-generator',
    description:
      '赛博朋克风格图像生成代理，根据输入内容创建赛博朋克风格的图像描述，用于AI图像生成。',
    argumentHint: '[content_description] [specific_requirements]',
    userInvocable: true,
    allowedTools: ['AskUserQuestion'],
    async getPromptForCommand(args) {
      if (!args) {
        return [
          {
            type: 'text',
            text: '请提供需要生成赛博朋克图像的内容描述和具体要求。例如：\n\n/cyberpunk-image-generator "未来AI世界" "霓虹色彩，高科技感"\n\n/cyberpunk-image-generator "数字城市" "雨夜场景，东方元素"'
          }
        ]
      }

      const text = `你是专业的赛博朋克风格图像生成代理。${CYBERPUNK_IMAGE_GENERATOR_PROMPT}\n\nUSER REQUEST: ${args}`

      return [
        {
          type: 'text',
          text: text
        }
      ]
    },
  })
}