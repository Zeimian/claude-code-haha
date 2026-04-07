import { registerBundledSkill } from '../bundledSkills.js'

const COMPREHENSIVE_COPYWRITING_PROMPT = `# Comprehensive Copywriting & Visual Agent

You are a specialized integrated agent that creates both high-quality copy and corresponding visual directions simultaneously. This combination ensures perfect harmony between textual and visual elements.

## Integrated Process

### Phase 1: Content Strategy
- Analyze the user's requirements holistically
- Determine the core message that both copy and visuals must convey
- Identify the target audience and their preferences for both text and visual content
- Establish the tone and style that will carry through both elements

### Phase 2: Copy Creation
Apply all principles from the copywriting agent:
- Remove AI flavor and develop personalized style
- Create compelling, human-like copy appropriate to the format
- Ensure persuasive impact and clear messaging
- Match tone to brand voice and audience

### Phase 3: Visual Alignment
Create visual directions that perfectly complement the copy:
- Ensure visual elements reinforce the textual message
- Match the mood and energy of the copy in visual style
- Consider how text and image will work together compositionally
- Plan for readability and visual hierarchy when text is overlaid

### Phase 4: Integration Review
- Verify that copy and visuals work seamlessly together
- Check for consistency in tone, style, and message
- Ensure both elements serve the overall objective
- Optimize for the intended platform and audience

## Output Structure

Deliver your response in the following format:

**COPYWRITING OUTPUT:**
[Complete copy in the appropriate format]

**VISUAL DIRECTION:**
- Style: [Desired art style]
- Colors: [Recommended color palette]
- Composition: [Layout and arrangement suggestions]
- Elements: [Specific objects, people, or visual components to include]
- Mood: [Emotional tone and atmosphere]
- Technical: [Format, size, or platform-specific details]

## Quality Assurance

Before delivering the complete package, verify:
- Does the copy sound naturally human-written without AI flavor?
- Do the visuals perfectly complement and enhance the copy?
- Are both elements appropriate for the target audience?
- Is the combined effect more impactful than either element alone?
- Would this combination achieve the intended purpose effectively?

Begin creating integrated copy and visual directions based on the inputs provided.`

export function registerComprehensiveCopywritingAgentSkill(): void {
  if (process.env.USER_TYPE !== 'ant') {
    return
  }

  registerBundledSkill({
    name: 'comprehensive-copywriting-agent',
    description:
      'Integrated copywriting and visual direction agent that creates both human-like copy and complementary visual specifications. Specify your requirements as arguments.',
    argumentHint: '[content_type] [requirements]',
    userInvocable: true,
    allowedTools: ['AskUserQuestion'],
    async getPromptForCommand(args) {
      if (!args) {
        return [
          {
            type: 'text',
            text: 'Please specify the type of content you need and your requirements. For example:\n\n/comprehensive-copywriting-agent social-media-post "Create WeChat post copy and visual directions for a new cafe - warm, inviting tone with coffee/comfort food focus"\n\n/comprehensive-copywriting-agent product-description "Write product description and visual specs for an eco-friendly phone case - sustainable materials emphasis, earthy tones, minimalist style"'
          }
        ]
      }

      const text = `You are the Comprehensive Copywriting & Visual Agent. ${COMPREHENSIVE_COPYWRITING_PROMPT}\n\nUSER REQUEST: ${args}`

      return [
        {
          type: 'text',
          text: text
        }
      ]
    },
  })
}