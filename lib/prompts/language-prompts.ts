export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  instructions: string;
  flag: string;
}

export const languageConfigs: Record<string, LanguageConfig> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    instructions: "Generate the entire SOP in English.",
    flag: "🇺🇸"
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    instructions: `Generate the entire SOP in Spanish (Español).
- Use formal Spanish appropriate for professional documentation
- Maintain technical accuracy in translations
- Use standard Spanish terminology for the industry
- Ensure proper grammar and regional neutrality (Latin American Spanish)`,
    flag: "🇪🇸"
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Français",
    instructions: `Generate the entire SOP in French (Français).
- Use formal French appropriate for professional documentation
- Maintain technical accuracy in translations
- Use standard French terminology for the industry
- Ensure proper grammar and formal register`,
    flag: "🇫🇷"
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    instructions: `Generate the entire SOP in German (Deutsch).
- Use formal German appropriate for professional documentation
- Maintain technical accuracy in translations
- Use standard German terminology for the industry
- Ensure proper grammar and formal register
- Use appropriate compound words for technical terms`,
    flag: "🇩🇪"
  },
  zh: {
    code: "zh",
    name: "Chinese",
    nativeName: "简体中文",
    instructions: `Generate the entire SOP in Simplified Chinese (简体中文).
- Use formal Chinese appropriate for professional documentation
- Maintain technical accuracy in translations
- Use standard Chinese terminology for the industry
- Ensure proper grammar and formal register
- Use simplified characters, not traditional`,
    flag: "🇨🇳"
  },
  ja: {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    instructions: `Generate the entire SOP in Japanese (日本語).
- Use formal Japanese appropriate for professional documentation (keigo)
- Maintain technical accuracy in translations
- Use standard Japanese terminology for the industry
- Ensure proper grammar and respectful language`,
    flag: "🇯🇵"
  },
  pt: {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    instructions: `Generate the entire SOP in Portuguese (Português).
- Use formal Portuguese appropriate for professional documentation
- Maintain technical accuracy in translations
- Use standard Portuguese terminology for the industry
- Ensure proper grammar (Brazilian Portuguese)`,
    flag: "🇧🇷"
  }
};

export const supportedLanguages = Object.keys(languageConfigs);
