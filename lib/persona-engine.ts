import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface PersonaProfile {
  name: string;
  occupation?: string;
  age?: number;
  background?: string;
  voiceProfile?: string;
  beliefs?: string;
  toneProfile?: string;
  behaviors?: string;
}

interface GenerateOptions {
  persona: PersonaProfile;
  prompt: string;
  contentType?: string;
  scenario?: string;
  targetAudience?: string;
  conversationHistory?: Array<{ role: string; content: string }>;
}

export async function generatePersonaResponse({
  persona,
  prompt,
  contentType = 'dialogue',
  scenario,
  targetAudience,
  conversationHistory
}: GenerateOptions): Promise<string> {
  try {
    // Parse JSON fields
    const voiceProfile = persona.voiceProfile ? JSON.parse(persona.voiceProfile) : {};
    const beliefs = persona.beliefs ? JSON.parse(persona.beliefs) : {};
    const toneProfile = persona.toneProfile ? JSON.parse(persona.toneProfile) : {};
    const behaviors = persona.behaviors ? JSON.parse(persona.behaviors) : {};

    // Build comprehensive persona system prompt
    const systemPrompt = `You are ${persona.name}${persona.occupation ? `, ${persona.occupation}` : ''}${persona.age ? ` (age ${persona.age})` : ''}.

BACKGROUND:
${persona.background || 'No background provided'}

VOICE CHARACTERISTICS:
- Speaking Style: ${voiceProfile.speakingStyle || 'Natural conversational'}
- Vocabulary Level: ${voiceProfile.vocabularyLevel || 'Standard'}
- Sentence Structure: ${voiceProfile.sentenceStructure || 'Varied'}
- Common Phrases: ${voiceProfile.catchphrases ? voiceProfile.catchphrases.join(', ') : 'None specified'}
- Speech Rhythm: ${voiceProfile.speechRhythm || 'Natural pace'}

CORE BELIEFS & VALUES:
- Political Views: ${beliefs.political || 'Not specified'}
- Moral Framework: ${beliefs.moral || 'Not specified'}
- Philosophy: ${beliefs.philosophy || 'Not specified'}
- Core Principles: ${beliefs.principles ? beliefs.principles.join(', ') : 'Not specified'}

TONE & EMOTIONAL RANGE:
- Default Mood: ${toneProfile.defaultMood || 'Neutral'}
- Emotional Range: ${toneProfile.emotionalRange || 'Balanced'}
- Humor Style: ${toneProfile.humorStyle || 'Situational'}
- Formality Level: ${toneProfile.formalityLevel || 'Moderate'}

BEHAVIORAL PATTERNS:
- Decision Making: ${behaviors.decisionMaking || 'Thoughtful'}
- Conflict Response: ${behaviors.conflictResponse || 'Diplomatic'}
- Social Preferences: ${behaviors.socialPreferences || 'Balanced'}
- Work Ethic: ${behaviors.workEthic || 'Professional'}

CRITICAL INSTRUCTIONS:
1. Respond EXACTLY as ${persona.name} would, using their distinctive voice, vocabulary, and speaking patterns
2. Incorporate their catchphrases naturally when appropriate
3. Let their beliefs and values inform your perspective
4. Match their tone and emotional style
5. Exhibit their characteristic behavioral patterns
6. Stay completely in character - never break the persona
7. If generating dialogue, use their specific speech rhythm and sentence structure

Content Type: ${contentType}
${scenario ? `Scenario Context: ${scenario}` : ''}
${targetAudience ? `Target Audience: ${targetAudience}` : ''}

Remember: You ARE ${persona.name}. Think, speak, and respond exactly as they would.`;

    // Build messages array with conversation history
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemPrompt }
    ];

    // Add conversation history if provided
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach(msg => {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      });
    }

    // Add current prompt
    messages.push({ role: 'user', content: prompt });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.9, // Higher temperature for more personality variation
      max_tokens: 2000,
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating persona response:', error);
    throw new Error('Failed to generate persona response');
  }
}

export async function generatePersonaScenario({
  persona,
  scenarioType,
  context,
  emotionalState,
  stressLevel
}: {
  persona: PersonaProfile;
  scenarioType: string;
  context?: string;
  emotionalState?: string;
  stressLevel?: number;
}): Promise<string> {
  const stressContext = stressLevel ? `(Stress Level: ${stressLevel}/10)` : '';
  const emotionalContext = emotionalState ? `Current emotional state: ${emotionalState}` : '';

  const scenarioPrompt = `${context || `Respond to this ${scenarioType} scenario`}
${emotionalContext}
${stressContext}`;

  return generatePersonaResponse({
    persona,
    prompt: scenarioPrompt,
    contentType: scenarioType,
    scenario: context
  });
}
