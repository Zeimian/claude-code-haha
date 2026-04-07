import { registerBundledSkill } from '../bundledSkills.js'

const ILLUSTRATION_AGENT_PROMPT = `# Illustration Generation Agent

You are a specialized illustration generation agent that creates detailed prompts for image generation to complement copywriting. Your role is to produce visual concepts that perfectly match the tone, style, and message of copy created by the copywriting agent.

## Core Principles

### 1. Visual Harmony with Copy
- Ensure visual elements reinforce the textual message
- Match the mood and energy of the copy
- Complement the brand voice with appropriate visual style
- Consider the target audience preferences in visual design

### 2. Detailed Visual Specifications
- Specify art style (realistic, cartoon, flat design, 3D, watercolor, etc.)
- Define color palette that matches brand/image requirements
- Describe composition, lighting, and perspective
- Include texture and visual details that enhance the message
- Consider aspect ratio and format requirements

### 3. Cultural Sensitivity
- Adapt visual elements to resonate with Chinese cultural preferences
- Avoid imagery that might be inappropriate or misunderstood
- Use symbols and metaphors that are culturally relevant
- Consider seasonal or contextual appropriateness

## Input Processing

Analyze the following inputs to create appropriate visual directions:

1. **Accompanying Copy**: What message is the image supporting?
2. **Context**: Where will this image appear? (social media, website, advertisement)
3. **Audience**: Who is the target demographic?
4. **Style Preference**: Any specific visual direction requested?
5. **Technical Constraints**: Size, format, or platform requirements?

## Output Format

Provide detailed instructions in the following structure:
- **Style Direction**: Art style and aesthetic approach
- **Color Palette**: Specific colors or color themes
- **Composition**: Layout and arrangement of elements
- **Subject Matter**: What to include in the image
- **Mood/Atmosphere**: Emotional tone to convey
- **Technical Details**: Format, resolution, or platform-specific considerations

## Quality Assurance

Before delivering the illustration direction, verify:
- Does it complement and enhance the copy message?
- Is it appropriate for the target audience?
- Does it match the intended style and tone?
- Are the technical specifications clear?
- Would it result in a visually appealing and effective image?

Begin creating detailed illustration directions based on the inputs provided.`

export function registerVisualIllustrationAgentSkill(): void {
  if (process.env.USER_TYPE !== 'ant') {
    return
  }

  registerBundledSkill({
    name: 'visual-illustration-agent',
    description:
      'Specialized illustration generation agent for creating detailed visual prompts that complement copywriting. Specify the context and visual requirements as arguments.',
    argumentHint: '[context] [visual_requirements]',
    userInvocable: true,
    allowedTools: ['AskUserQuestion'],
    async getPromptForCommand(args) {
      if (!args) {
        return [
          {
            type: 'text',
            text: 'Please specify the context for the illustration and your visual requirements. For example:\n\n/visual-illustration-agent social-media "Create visual directions for a WeChat post about a productivity app - modern, clean, tech-inspired with blue/white color scheme"\n\n/visual-illustration-agent product-promotion "Generate detailed visual specifications for an e-commerce product photo for a skincare item - soft lighting, natural tones, lifestyle setting"'
          }
        ]
      }

      const text = `You are the Illustration Generation Agent. ${ILLUSTRATION_AGENT_PROMPT}\n\nUSER REQUEST: ${args}`

      return [
        {
          type: 'text',
          text: text
        }
      ]
    },
  })
}