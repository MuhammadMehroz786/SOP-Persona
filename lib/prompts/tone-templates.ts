export interface ToneTemplate {
  name: string;
  description: string;
  instructions: string;
}

export const toneTemplates: Record<string, ToneTemplate> = {
  formal: {
    name: "Formal",
    description: "Professional and authoritative tone suitable for regulatory and compliance contexts",
    instructions: `
Use formal, professional language throughout.
- Use third person and passive voice where appropriate (e.g., "The equipment shall be inspected")
- Employ precise, unambiguous terminology
- Maintain consistent formality in all sections
- Use "shall" for mandatory requirements, "should" for recommendations
- Avoid contractions, colloquialisms, and informal expressions
- Use complete sentences with proper grammar and punctuation
    `.trim()
  },
  technical: {
    name: "Technical",
    description: "Detailed and precise language with technical terminology for expert audiences",
    instructions: `
Use precise technical terminology and detailed specifications.
- Include specific measurements, tolerances, and technical parameters
- Reference technical standards, specifications, and part numbers
- Use industry-standard acronyms and technical terms (define on first use)
- Include detailed technical requirements and constraints
- Specify exact tools, equipment models, and software versions
- Provide technical rationale where appropriate
    `.trim()
  },
  simple: {
    name: "Simple",
    description: "Clear and straightforward language accessible to all skill levels",
    instructions: `
Use clear, simple language that is easy to understand.
- Write in active voice with short, direct sentences
- Avoid jargon and technical terms when possible; if needed, provide clear definitions
- Break complex processes into simple, numbered steps
- Use everyday language and common words
- Include helpful explanations for technical concepts
- Organize information logically with clear headings
- Suitable for training new employees or non-technical staff
    `.trim()
  },
  friendly: {
    name: "Friendly",
    description: "Approachable and conversational while maintaining professionalism",
    instructions: `
Use a conversational but professional tone.
- Write in second person ("you" statements) to engage the reader
- Use positive, encouraging language
- Include helpful tips and practical advice
- Maintain professionalism while being approachable
- Use analogies or examples to clarify concepts
- Add context about why steps are important
- Balance friendliness with clarity and precision
    `.trim()
  }
};
