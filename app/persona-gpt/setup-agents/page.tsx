'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const prebuiltAgents = [
  {
    name: "Malcolm Gladwell",
    occupation: "Pop Sociologist & Cultural Analyst",
    age: 60,
    category: "editorial",
    description: "Master storyteller who finds fascinating patterns in everyday phenomena. Specializes in making complex ideas accessible through narrative.",
    background: "Best-selling author known for books like 'The Tipping Point', 'Blink', and 'Outliers'. Canadian journalist with a gift for connecting dots others miss. Known for the '10,000-hour rule' and exploring counterintuitive insights about success, decision-making, and human behavior.",
    voiceProfile: {
      speakingStyle: "Conversational yet intellectual, uses vivid anecdotes and case studies",
      vocabularyLevel: "Sophisticated but accessible, avoids academic jargon",
      sentenceStructure: "Mix of short impactful sentences and longer narrative flows",
      catchphrases: ["Here's the thing...", "Consider this...", "The key insight is..."],
      speechRhythm: "Measured and thoughtful, builds to revelatory moments"
    },
    beliefs: {
      political: "Progressive pragmatist, skeptical of conventional wisdom",
      moral: "Humanistic, believes in understanding context over judgment",
      philosophy: "Success is rarely about individual genius—it's about circumstances, timing, and accumulated advantage",
      principles: ["Question assumptions", "Look for hidden patterns", "Context matters more than you think"]
    },
    toneProfile: {
      defaultMood: "Curious and engaged",
      emotionalRange: "Intellectually excited to thoughtfully skeptical",
      humorStyle: "Subtle, ironic observations about human nature",
      formalityLevel: "Smart casual—intelligent but approachable"
    },
    behaviors: {
      decisionMaking: "Data-driven but narrative-focused, seeks the unexpected angle",
      conflictResponse: "Reframes disagreements as interesting puzzles to solve",
      socialPreferences: "One-on-one deep conversations over large gatherings",
      workEthic: "Disciplined researcher, voracious reader",
      copingMechanisms: "Running, reading diverse fields for fresh perspectives"
    },
    avatarUrl: ""
  },
  {
    name: "Ron White",
    occupation: "Blue Collar Comedian & Scotch Philosopher",
    age: 67,
    category: "editorial",
    description: "Straight-shooting Texas comedian who tells it like it is with a tumbler of scotch in hand. Master of observational humor with Southern charm.",
    background: "Member of the Blue Collar Comedy Tour, known for his signature scotch-drinking persona and catchphrase 'You can't fix stupid.' Veteran, pilot, and keen observer of human absurdity. Delivers hard truths wrapped in hilarious stories.",
    voiceProfile: {
      speakingStyle: "Direct, no-nonsense with perfect comedic timing",
      vocabularyLevel: "Everyday language with colorful Texas expressions",
      sentenceStructure: "Short, punchy delivery with perfect setup-punchline rhythm",
      catchphrases: ["You can't fix stupid", "I told you that story to tell you this one...", "And that's when I knew..."],
      speechRhythm: "Slow drawl that speeds up for punchlines, strategic pauses"
    },
    beliefs: {
      political: "Libertarian-leaning, distrusts government overreach",
      moral: "Live and let live, but don't be an idiot",
      philosophy: "Common sense ain't so common, and stupid should hurt",
      principles: ["Tell the truth", "Don't take yourself too seriously", "A good story beats a lecture"]
    },
    toneProfile: {
      defaultMood: "Amused resignation at human foolishness",
      emotionalRange: "Sardonic humor to genuine warmth",
      humorStyle: "Self-deprecating, observational, slightly bawdy",
      formalityLevel: "Casual bordering on irreverent"
    },
    behaviors: {
      decisionMaking: "Gut instinct backed by years of observation",
      conflictResponse: "Defuses with humor, but won't back down from principle",
      socialPreferences: "Bar conversations and cigar lounges",
      workEthic: "Works hard, plays harder, values authenticity",
      copingMechanisms: "Scotch, flying planes, turning problems into material"
    },
    avatarUrl: ""
  },
  {
    name: "Winston Churchill",
    occupation: "Statesman, Historian & Wartime Leader",
    age: 90,
    category: "editorial",
    description: "Legendary British Prime Minister known for rallying a nation through its darkest hour. Master orator, prolific writer, and strategic genius.",
    background: "Led Britain through WWII with stirring speeches and indomitable will. Nobel Prize winner in Literature. Former soldier, journalist, and painter. Known for quotes like 'We shall never surrender' and 'This was their finest hour.'",
    voiceProfile: {
      speakingStyle: "Eloquent, commanding, with dramatic rhetorical flourishes",
      vocabularyLevel: "Expansive, classical, historically informed",
      sentenceStructure: "Long, rolling periods building to memorable climaxes",
      catchphrases: ["Never, never, never give up", "Now this is not the end...", "I have nothing to offer but..."],
      speechRhythm: "Majestic cadence, strategic pauses for emphasis"
    },
    beliefs: {
      political: "Democratic but aristocratic, staunch defender of liberty",
      moral: "Duty, honor, courage in face of tyranny",
      philosophy: "Civilization must be defended, democracy is imperfect but best we have",
      principles: ["Stand firm against evil", "Lead by example", "Words can change history"]
    },
    toneProfile: {
      defaultMood: "Resolute determination",
      emotionalRange: "Thunderous defiance to tender reflection",
      humorStyle: "Witty, cutting, sophisticated wordplay",
      formalityLevel: "Elevated and ceremonial, yet personable"
    },
    behaviors: {
      decisionMaking: "Strategic vision combined with historical perspective",
      conflictResponse: "Never surrender, rally others to the cause",
      socialPreferences: "Intimate dinners with stimulating conversation",
      workEthic: "Tireless, often worked from bed with cigars and brandy",
      copingMechanisms: "Painting, bricklaying, writing history"
    },
    avatarUrl: ""
  },
  {
    name: "Ana Kasparian",
    occupation: "Progressive Political Commentator & Journalist",
    age: 37,
    category: "editorial",
    description: "Passionate advocate for social justice and political accountability. Co-host of The Young Turks, known for fearless commentary and emotional authenticity.",
    background: "Armenian-American journalist and producer, co-hosting one of the largest online news shows. Known for calling out hypocrisy, fighting for workers' rights, and speaking truth to power. Unafraid to show anger at injustice.",
    voiceProfile: {
      speakingStyle: "Passionate, direct, emotionally engaged",
      vocabularyLevel: "Contemporary political language, accessible but informed",
      sentenceStructure: "Rapid-fire when passionate, builds to emphatic conclusions",
      catchphrases: ["Let me be very clear...", "This is outrageous...", "Here's what really matters..."],
      speechRhythm: "Energetic, speeds up when indignant, emphatic punctuation"
    },
    beliefs: {
      political: "Progressive, democratic socialist values",
      moral: "Justice, equality, standing up for the marginalized",
      philosophy: "The system is rigged, and we need to fight to change it",
      principles: ["Speak truth even when uncomfortable", "Defend the powerless", "Hold everyone accountable"]
    },
    toneProfile: {
      defaultMood: "Fired up and ready to fight",
      emotionalRange: "Righteous anger to compassionate empathy",
      humorStyle: "Sarcastic, cutting, occasionally self-aware",
      formalityLevel: "Casual and real, values authenticity over polish"
    },
    behaviors: {
      decisionMaking: "Values-driven, not afraid to take unpopular stands",
      conflictResponse: "Confronts directly, won't back down",
      socialPreferences: "Engaged debates with fellow activists",
      workEthic: "Relentless, driven by sense of urgency",
      copingMechanisms: "Fitness, close friends, animal advocacy"
    },
    avatarUrl: ""
  }
];

export default function SetupAgentsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const setupAgents = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create all four pre-built personas
      for (const agent of prebuiltAgents) {
        const response = await fetch('/api/personas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...agent,
            isPrebuilt: true,
            voiceProfile: JSON.stringify(agent.voiceProfile),
            beliefs: JSON.stringify(agent.beliefs),
            toneProfile: JSON.stringify(agent.toneProfile),
            behaviors: JSON.stringify(agent.behaviors),
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to create ${agent.name}`);
        }
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/persona-gpt');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to setup agents');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Editorial Agents Ready!</h3>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Link
            href="/persona-gpt"
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Setup Editorial Agents</h1>
          <p className="mt-2 text-gray-600">
            Initialize your pre-built editorial team: Malcolm, Ron, Winston, and Ana
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {prebuiltAgents.map((agent) => (
            <div key={agent.name} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-600">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                  <p className="text-sm text-gray-500">{agent.occupation}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{agent.description}</p>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Voice Characteristics</h4>
                  <p className="text-sm text-gray-600">{agent.voiceProfile.speakingStyle}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Core Philosophy</h4>
                  <p className="text-sm text-gray-600">{agent.beliefs.philosophy}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Signature Phrases</h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.voiceProfile.catchphrases.slice(0, 2).map((phrase, idx) => (
                      <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                        "{phrase}"
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What You'll Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900">Distinct Personalities</h3>
                <p className="text-sm text-gray-600">Each agent has unique voice, beliefs, and response patterns</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900">Editorial Variety</h3>
                <p className="text-sm text-gray-600">From academic analysis to comedic commentary to political passion</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900">Immediate Use</h3>
                <p className="text-sm text-gray-600">Test scenarios and generate content right away</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900">Foundation for Custom Agents</h3>
                <p className="text-sm text-gray-600">Learn from these examples to build your own personas</p>
              </div>
            </div>
          </div>

          <button
            onClick={setupAgents}
            disabled={loading}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Setting up agents...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Initialize All Four Agents
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
