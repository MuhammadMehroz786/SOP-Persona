'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface Persona {
  id: string;
  name: string;
  occupation: string | null;
  age: number | null;
  description: string | null;
  background: string | null;
  category: string | null;
  isPrebuilt: boolean;
  usageCount: number;
  voiceProfile: string | null;
  beliefs: string | null;
  toneProfile: string | null;
  behaviors: string | null;
  responses: Array<{
    id: string;
    prompt: string;
    response: string;
    contentType: string;
    createdAt: string;
  }>;
  scenarios: Array<{
    id: string;
    title: string;
    scenarioType: string;
    createdAt: string;
  }>;
}

export default function PersonaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (params.id) {
      fetchPersona();
    }
  }, [params.id]);

  const fetchPersona = async () => {
    try {
      const res = await fetch(`/api/personas/${params.id}`);
      if (!res.ok) throw new Error('Persona not found');
      const data = await res.json();
      setPersona(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch persona:', err);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${persona?.name}?`)) {
      return;
    }

    try {
      await fetch(`/api/personas/${params.id}`, {
        method: 'DELETE',
      });
      router.push('/persona-gpt/library');
    } catch (err) {
      console.error('Failed to delete persona:', err);
    }
  };

  const handleExport = (format: 'json' | 'markdown') => {
    window.open(`/api/personas/${params.id}/export?format=${format}`, '_blank');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading persona...</p>
        </div>
      </main>
    );
  }

  if (!persona) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Persona Not Found</h2>
          <Link href="/persona-gpt/library" className="text-purple-600 hover:text-purple-700">
            Return to Library
          </Link>
        </div>
      </main>
    );
  }

  const voiceProfile = persona.voiceProfile ? JSON.parse(persona.voiceProfile) : {};
  const beliefs = persona.beliefs ? JSON.parse(persona.beliefs) : {};
  const toneProfile = persona.toneProfile ? JSON.parse(persona.toneProfile) : {};
  const behaviors = persona.behaviors ? JSON.parse(persona.behaviors) : {};

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/persona-gpt/library"
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
          >
            ← Back to Library
          </Link>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="md:flex md:items-start md:justify-between">
              <div className="flex items-start">
                <div className="h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-purple-600">
                    {persona.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="ml-6">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-900">{persona.name}</h1>
                    {persona.isPrebuilt && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        ⭐ Pre-built
                      </span>
                    )}
                  </div>
                  {persona.occupation && (
                    <p className="mt-1 text-lg text-gray-600">{persona.occupation}</p>
                  )}
                  {persona.description && (
                    <p className="mt-2 text-gray-700">{persona.description}</p>
                  )}
                  <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
                    {persona.age && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Age {persona.age}
                      </div>
                    )}
                    {persona.category && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                        {persona.category}
                      </div>
                    )}
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      </svg>
                      {persona.usageCount} uses
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
                <Link
                  href={`/persona-gpt/chat/${persona.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat with Persona
                </Link>
                <Link
                  href={`/persona-gpt/playground?persona=${persona.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Test in Playground
                </Link>
                <button
                  onClick={() => handleExport('json')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export JSON
                </button>
                <button
                  onClick={() => handleExport('markdown')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Style Guide
                </button>
                {!persona.isPrebuilt && (
                  <>
                    <Link
                      href={`/persona-gpt/edit/${persona.id}`}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-4">
            {['overview', 'voice', 'beliefs', 'tone', 'behavior', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Background</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{persona.background || 'No background provided'}</p>
            </div>
          </div>
        )}

        {activeTab === 'voice' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Voice Characteristics</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Speaking Style</h3>
                <p className="text-gray-600">{voiceProfile.speakingStyle || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Vocabulary Level</h3>
                <p className="text-gray-600">{voiceProfile.vocabularyLevel || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Sentence Structure</h3>
                <p className="text-gray-600">{voiceProfile.sentenceStructure || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Catchphrases</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {voiceProfile.catchphrases && voiceProfile.catchphrases.length > 0 ? (
                    voiceProfile.catchphrases.map((phrase: string, idx: number) => (
                      <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                        "{phrase}"
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No catchphrases defined</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Speech Rhythm</h3>
                <p className="text-gray-600">{voiceProfile.speechRhythm || 'Not specified'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'beliefs' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Beliefs & Values</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Political Views</h3>
                <p className="text-gray-600">{beliefs.political || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Moral Framework</h3>
                <p className="text-gray-600">{beliefs.moral || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Core Philosophy</h3>
                <p className="text-gray-600">{beliefs.philosophy || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Core Principles</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {beliefs.principles && beliefs.principles.length > 0 ? (
                    beliefs.principles.map((principle: string, idx: number) => (
                      <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                        {principle}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No principles defined</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tone' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Tone & Emotional Range</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Default Mood</h3>
                <p className="text-gray-600">{toneProfile.defaultMood || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Emotional Range</h3>
                <p className="text-gray-600">{toneProfile.emotionalRange || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Humor Style</h3>
                <p className="text-gray-600">{toneProfile.humorStyle || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Formality Level</h3>
                <p className="text-gray-600">{toneProfile.formalityLevel || 'Not specified'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'behavior' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Behavioral Patterns</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Decision Making</h3>
                <p className="text-gray-600">{behaviors.decisionMaking || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Conflict Response</h3>
                <p className="text-gray-600">{behaviors.conflictResponse || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Social Preferences</h3>
                <p className="text-gray-600">{behaviors.socialPreferences || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Work Ethic</h3>
                <p className="text-gray-600">{behaviors.workEthic || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Coping Mechanisms</h3>
                <p className="text-gray-600">{behaviors.copingMechanisms || 'Not specified'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-6">
            {/* Recent Responses */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Responses</h2>
              {persona.responses && persona.responses.length > 0 ? (
                <div className="space-y-4">
                  {persona.responses.map((response) => (
                    <div key={response.id} className="border-l-4 border-purple-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                          {response.contentType}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(response.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">{response.prompt}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{response.response}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No responses yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
