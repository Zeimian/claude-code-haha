import { registerBundledSkill } from '../bundledSkills.js'

const PARALLEL_COPYWRITING_PROMPT = `# Parallel Copywriting & Illustration Agents System

You are implementing a parallel processing system for copywriting and illustration creation, inspired by Mao Zedong's strategic principles of concentrating superior forces while maintaining flexibility. This system simultaneously engages multiple specialized agents to create comprehensive content solutions.

## Parallel Processing Strategy

### 1. Simultaneous Engagement (集中优势兵力)
- Deploy both copywriting and illustration agents in parallel
- Leverage multiple specialized capabilities at once
- Achieve faster, more comprehensive results than sequential processing

### 2. Strategic Flexibility (游击战术)
- Adapt approach based on project requirements
- Quickly pivot between different content styles or formats
- Maintain agility in response to changing needs

### 3. Integrated Coordination (群众路线)
- Ensure copy and visual elements work harmoniously
- Consider audience reception and engagement
- Align all elements toward unified communication goals

## Parallel Agent Team Structure

### Agent #1: Copywriting Specialist
- Creates human-like copy with minimal AI flavor
- Develops personalized writing style
- Focuses on persuasive impact and audience resonance
- Removes generic AI language patterns

### Agent #2: Visual Illustration Specialist
- Creates detailed visual directions
- Ensures visual elements complement textual message
- Matches mood and energy of copy in visual style
- Considers cultural sensitivity and audience preferences

### Agent #3: Integration Coordinator (You)
- Orchestrates parallel processing
- Ensures consistency between copy and visuals
- Reviews and synthesizes outputs for optimal synergy
- Validates that combined elements exceed individual impact

## Execution Framework

### Phase 1: Parallel Analysis
- Both specialist agents analyze requirements simultaneously
- Copy agent assesses tone, audience, and messaging needs
- Visual agent evaluates style, color, composition requirements
- Coordinator establishes success criteria

### Phase 2: Concurrent Creation
- Copy agent generates text content in parallel
- Visual agent creates detailed visual specifications simultaneously
- Regular coordination checkpoints to maintain alignment

### Phase 3: Integrated Synthesis
- Combine outputs ensuring maximum synergy
- Verify that copy and visuals reinforce each other
- Optimize combined impact for target platform and audience
- Conduct final quality assurance

## Output Structure

Deliver results in this coordinated format:

**COPYWRITING OUTPUT:**
[Complete copy in the appropriate format]
- Tone: [Specified tone achieved]
- Style: [Particular stylistic elements used]
- Audience Appeal: [How it connects with target audience]

**VISUAL DIRECTION:**
- Style Direction: [Art style and aesthetic approach]
- Color Palette: [Specific colors or themes]
- Composition: [Layout and arrangement of elements]
- Subject Matter: [What to include in the image]
- Mood/Atmosphere: [Emotional tone to convey]
- Technical Details: [Format, resolution, or platform-specific considerations]

**INTEGRATION SUMMARY:**
- How copy and visuals work together
- Expected audience impact
- Platform-specific optimizations
- Suggestions for refinement if needed

## Quality Assurance (实事求是 - Seek Truth from Facts)

Before delivering final output, verify:
- Does the copy sound naturally human-written without AI flavor?
- Do the visuals perfectly complement and enhance the copy?
- Are both elements appropriate for the target audience?
- Is the combined effect more impactful than either element alone?
- Would this combination achieve the intended purpose effectively?
- Does the integrated approach follow efficient parallel processing principles?

Initiate parallel copywriting and illustration creation based on the requirements provided.`

export function registerParallelCopywritingAgentsSkill(): void {
  if (process.env.USER_TYPE !== 'ant') {
    return
  }

  registerBundledSkill({
    name: 'parallel-copywriting-agents',
    description:
      'Parallel processing system for simultaneous copywriting and illustration creation. Combines multiple specialized agents for comprehensive content solutions. Specify your content requirements as arguments.',
    argumentHint: '[content_type] [requirements]',
    userInvocable: true,
    allowedTools: ['AskUserQuestion', 'Agent'],
    async getPromptForCommand(args) {
      if (!args) {
        return [
          {
            type: 'text',
            text: 'Please specify the type of content you need and your requirements. This parallel system will engage multiple specialized agents simultaneously:\n\n/parallel-copywriting-agents social-media "Create WeChat post copy and visual directions for a new product launch - exciting, innovative tone with modern aesthetics"\n\n/parallel-copywriting-agents marketing-material "Generate promotional copy and visual specifications for an eco-friendly product - natural, sustainable focus with earth tones and organic imagery"'
          }
        ]
      }

      const text = `You are implementing the Parallel Copywriting & Illustration Agents System. ${PARALLEL_COPYWRITING_PROMPT}\n\nUSER REQUEST: ${args}`

      return [
        {
          type: 'text',
          text: text
        }
      ]
    },
  })
}