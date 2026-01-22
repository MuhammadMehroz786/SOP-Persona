import OpenAI from 'openai';
import { industryTemplates } from './prompts/industry-templates';
import { toneTemplates } from './prompts/tone-templates';
import { languageConfigs } from './prompts/language-prompts';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export interface GenerateSOPRequest {
    title: string;
    description: string;
    industry?: string;
    tone?: string;
    language?: string;
    regulatoryFramework?: string[];
}

export interface SOPContent {
    purpose: string;
    scope: string;
    responsibilities: string[];
    procedures: {
        step: number;
        action: string;
        details?: string;
        warning?: string;
    }[];
    safetyNotes: string[];
    references: string[];
    acceptanceCriteria: string[];
}

export async function generateSOP(
    title: string,
    description: string,
    options: {
        industry?: string;
        tone?: string;
        language?: string;
        regulatoryFramework?: string[];
    } = {}
): Promise<SOPContent> {
    const {
        industry = 'general',
        tone = 'formal',
        language = 'en',
        regulatoryFramework = []
    } = options;

    // Get industry-specific context
    const industryTemplate = industryTemplates[industry] || industryTemplates.general;
    const toneTemplate = toneTemplates[tone] || toneTemplates.formal;
    const languageConfig = languageConfigs[language] || languageConfigs.en;

    // Build regulatory framework context
    const frameworkContext = regulatoryFramework.length > 0
        ? `\nRegulatory Compliance: This SOP must comply with the following frameworks: ${regulatoryFramework.join(', ')}`
        : '';

    const systemPrompt = `You are an expert in creating Standard Operating Procedures (SOPs) following ISO 9001 standards and industry best practices.

INDUSTRY CONTEXT: ${industryTemplate.name}
${industryTemplate.context}

REGULATORY FRAMEWORKS: ${industryTemplate.frameworks.join(', ')}${frameworkContext}

INDUSTRY-SPECIFIC GUIDELINES:
${industryTemplate.specificGuidelines}

TONE AND STYLE:
${toneTemplate.instructions}

LANGUAGE:
${languageConfig.instructions}

Your task is to generate a comprehensive, professional SOP based on the title and description provided.

Return ONLY a valid JSON object with the following structure:
{
  "purpose": "Clear statement of why this SOP exists and what it accomplishes",
  "scope": "Who this applies to and in what situations",
  "responsibilities": ["Role: What they are responsible for", "Another role: Their responsibility"],
  "procedures": [
    {
      "step": 1,
      "action": "Clear action verb starting the step (e.g., 'Open', 'Verify', 'Complete')",
      "details": "Detailed explanation of how to perform this step",
      "warning": "Optional: Any safety or important notes for this step"
    }
  ],
  "safetyNotes": ["Important safety consideration 1", "Important safety consideration 2"],
  "references": ["Related documents, policies, or resources"],
  "acceptanceCriteria": ["How to verify this procedure was completed correctly"]
}

Guidelines:
- Follow the tone and style guidelines above
- Start each procedure step with an action verb
- Be specific and detailed for the ${industryTemplate.name} industry
- Include 5-10 procedure steps typically
- Include warnings for critical steps
- Make it practical and actionable
- Include industry-specific safety and compliance requirements
- Reference relevant standards and regulations`;

    const userPrompt = `Create a professional SOP for the ${industryTemplate.name} industry:

Title: ${title}
Description: ${description}

Generate a complete, detailed SOP following the JSON structure provided. ${languageConfig.code !== 'en' ? `Generate all content in ${languageConfig.nativeName}.` : ''}`;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 3500, // Increased for multi-language support
        });

        const responseContent = completion.choices[0]?.message?.content;

        if (!responseContent) {
            throw new Error('No response from OpenAI');
        }

        // Parse the JSON response
        const sopContent: SOPContent = JSON.parse(responseContent);

        return sopContent;
    } catch (error) {
        console.error('Error generating SOP:', error);
        throw new Error('Failed to generate SOP. Please try again.');
    }
}
