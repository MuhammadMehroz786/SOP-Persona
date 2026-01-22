'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatePersonaPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Basic Info
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [background, setBackground] = useState('');
  const [category, setCategory] = useState('custom');
  const [tags, setTags] = useState('');

  // Voice Profile
  const [speakingStyle, setSpeakingStyle] = useState('');
  const [vocabularyLevel, setVocabularyLevel] = useState('');
  const [sentenceStructure, setSentenceStructure] = useState('');
  const [catchphrases, setCatchphrases] = useState('');
  const [speechRhythm, setSpeechRhythm] = useState('');

  // Beliefs
  const [political, setPolitical] = useState('');
  const [moral, setMoral] = useState('');
  const [philosophy, setPhilosophy] = useState('');
  const [principles, setPrinciples] = useState('');

  // Tone Profile
  const [defaultMood, setDefaultMood] = useState('');
  const [emotionalRange, setEmotionalRange] = useState('');
  const [humorStyle, setHumorStyle] = useState('');
  const [formalityLevel, setFormalityLevel] = useState('');

  // Behaviors
  const [decisionMaking, setDecisionMaking] = useState('');
  const [conflictResponse, setConflictResponse] = useState('');
  const [socialPreferences, setSocialPreferences] = useState('');
  const [workEthic, setWorkEthic] = useState('');
  const [copingMechanisms, setCopingMechanisms] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setError('Name is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const voiceProfile = {
        speakingStyle,
        vocabularyLevel,
        sentenceStructure,
        catchphrases: catchphrases.split(',').map(s => s.trim()).filter(Boolean),
        speechRhythm
      };

      const beliefs = {
        political,
        moral,
        philosophy,
        principles: principles.split(',').map(s => s.trim()).filter(Boolean)
      };

      const toneProfile = {
        defaultMood,
        emotionalRange,
        humorStyle,
        formalityLevel
      };

      const behaviors = {
        decisionMaking,
        conflictResponse,
        socialPreferences,
        workEthic,
        copingMechanisms
      };

      const response = await fetch('/api/personas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          occupation: occupation || null,
          age: age ? parseInt(age) : null,
          description: description || null,
          background: background || null,
          category,
          tags: tags || null,
          voiceProfile: JSON.stringify(voiceProfile),
          beliefs: JSON.stringify(beliefs),
          toneProfile: JSON.stringify(toneProfile),
          behaviors: JSON.stringify(behaviors),
          isPrebuilt: false
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create persona');
      }

      const persona = await response.json();
      router.push(`/persona-gpt/${persona.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create persona');
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '👤' },
    { id: 'voice', label: 'Voice', icon: '🗣️' },
    { id: 'beliefs', label: 'Beliefs', icon: '💭' },
    { id: 'tone', label: 'Tone', icon: '🎭' },
    { id: 'behavior', label: 'Behavior', icon: '🧠' },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Link
            href="/persona-gpt"
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create Custom Persona</h1>
          <p className="mt-2 text-gray-600">
            Build a unique AI persona with distinct voice, beliefs, and behaviors
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Tab Navigation */}
          <div className="bg-white rounded-t-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-b-lg shadow p-6 mb-6">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Dr. Sarah Mitchell"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Occupation
                    </label>
                    <input
                      type="text"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      placeholder="e.g., Clinical Psychologist"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g., 42"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Brief Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A one-sentence description of this persona"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Background Story
                  </label>
                  <textarea
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    placeholder="Detailed background, education, career history, life experiences..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="custom">Custom</option>
                      <option value="novelist">Novelist</option>
                      <option value="educator">Educator</option>
                      <option value="marketer">Marketer</option>
                      <option value="editorial">Editorial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="e.g., psychology, empathy, research"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Voice Profile Tab */}
            {activeTab === 'voice' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Speaking Style
                  </label>
                  <input
                    type="text"
                    value={speakingStyle}
                    onChange={(e) => setSpeakingStyle(e.target.value)}
                    placeholder="e.g., Warm and empathetic, uses metaphors from nature"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Vocabulary Level
                  </label>
                  <input
                    type="text"
                    value={vocabularyLevel}
                    onChange={(e) => setVocabularyLevel(e.target.value)}
                    placeholder="e.g., Professional but accessible, avoids jargon"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Sentence Structure
                  </label>
                  <input
                    type="text"
                    value={sentenceStructure}
                    onChange={(e) => setSentenceStructure(e.target.value)}
                    placeholder="e.g., Balanced mix of short and flowing sentences"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Catchphrases (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={catchphrases}
                    onChange={(e) => setCatchphrases(e.target.value)}
                    placeholder="e.g., Let me share a story, Here's what I've observed, Think of it this way"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Speech Rhythm
                  </label>
                  <input
                    type="text"
                    value={speechRhythm}
                    onChange={(e) => setSpeechRhythm(e.target.value)}
                    placeholder="e.g., Measured pace with thoughtful pauses"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Beliefs Tab */}
            {activeTab === 'beliefs' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Political Views
                  </label>
                  <input
                    type="text"
                    value={political}
                    onChange={(e) => setPolitical(e.target.value)}
                    placeholder="e.g., Progressive on social issues, pragmatic on economics"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Moral Framework
                  </label>
                  <input
                    type="text"
                    value={moral}
                    onChange={(e) => setMoral(e.target.value)}
                    placeholder="e.g., Consequentialist with emphasis on reducing harm"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Core Philosophy
                  </label>
                  <textarea
                    value={philosophy}
                    onChange={(e) => setPhilosophy(e.target.value)}
                    placeholder="Their central worldview and life philosophy..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Core Principles (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={principles}
                    onChange={(e) => setPrinciples(e.target.value)}
                    placeholder="e.g., Empathy first, Evidence-based thinking, Growth mindset"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Tone Profile Tab */}
            {activeTab === 'tone' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Default Mood
                  </label>
                  <input
                    type="text"
                    value={defaultMood}
                    onChange={(e) => setDefaultMood(e.target.value)}
                    placeholder="e.g., Calm and optimistic"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Emotional Range
                  </label>
                  <input
                    type="text"
                    value={emotionalRange}
                    onChange={(e) => setEmotionalRange(e.target.value)}
                    placeholder="e.g., From gentle concern to passionate advocacy"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Humor Style
                  </label>
                  <input
                    type="text"
                    value={humorStyle}
                    onChange={(e) => setHumorStyle(e.target.value)}
                    placeholder="e.g., Gentle wit with self-deprecating moments"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Formality Level
                  </label>
                  <select
                    value={formalityLevel}
                    onChange={(e) => setFormalityLevel(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select formality level...</option>
                    <option value="very_formal">Very Formal</option>
                    <option value="professional">Professional</option>
                    <option value="casual_professional">Casual Professional</option>
                    <option value="casual">Casual</option>
                    <option value="very_casual">Very Casual</option>
                  </select>
                </div>
              </div>
            )}

            {/* Behavior Tab */}
            {activeTab === 'behavior' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Decision Making Style
                  </label>
                  <input
                    type="text"
                    value={decisionMaking}
                    onChange={(e) => setDecisionMaking(e.target.value)}
                    placeholder="e.g., Deliberate and research-based with emotional awareness"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Conflict Response
                  </label>
                  <input
                    type="text"
                    value={conflictResponse}
                    onChange={(e) => setConflictResponse(e.target.value)}
                    placeholder="e.g., Seeks understanding first, then collaborative solutions"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Social Preferences
                  </label>
                  <input
                    type="text"
                    value={socialPreferences}
                    onChange={(e) => setSocialPreferences(e.target.value)}
                    placeholder="e.g., Small meaningful gatherings over large events"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Work Ethic
                  </label>
                  <input
                    type="text"
                    value={workEthic}
                    onChange={(e) => setWorkEthic(e.target.value)}
                    placeholder="e.g., Dedicated but values work-life balance"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Coping Mechanisms
                  </label>
                  <input
                    type="text"
                    value={copingMechanisms}
                    onChange={(e) => setCopingMechanisms(e.target.value)}
                    placeholder="e.g., Meditation, journaling, time in nature"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Link
              href="/persona-gpt"
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || !name}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Persona'
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
