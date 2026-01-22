'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Persona {
  id: string;
  name: string;
  occupation: string | null;
  description: string | null;
  category: string | null;
  isPrebuilt: boolean;
}

export default function PlaygroundPage() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('dialogue');
  const [scenario, setScenario] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{prompt: string, response: string, personaName: string}>>([]);

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      const res = await fetch('/api/personas');
      const data = await res.json();
      setPersonas(data);
      if (data.length > 0) {
        setSelectedPersonaId(data[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch personas:', err);
    }
  };

  const generateResponse = async () => {
    if (!selectedPersonaId || !prompt) {
      setError('Please select a persona and enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse('');

    try {
      const res = await fetch(`/api/personas/${selectedPersonaId}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          contentType,
          scenario: scenario || undefined,
          saveResponse: true
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await res.json();
      setResponse(data.response);

      const selectedPersona = personas.find(p => p.id === selectedPersonaId);
      setHistory(prev => [{
        prompt,
        response: data.response,
        personaName: selectedPersona?.name || 'Unknown'
      }, ...prev].slice(0, 5));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate response');
    } finally {
      setLoading(false);
    }
  };

  const selectedPersona = personas.find(p => p.id === selectedPersonaId);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/persona-gpt"
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Testing Playground</h1>
          <p className="mt-2 text-gray-600">
            Test your personas in real-time scenarios and see how they respond
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Persona Selector */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Select Persona
              </label>
              {personas.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No personas available yet</p>
                  <Link
                    href="/persona-gpt/setup-agents"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                  >
                    Set Up Editorial Agents
                  </Link>
                </div>
              ) : (
                <select
                  value={selectedPersonaId}
                  onChange={(e) => setSelectedPersonaId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {personas.map((persona) => (
                    <option key={persona.id} value={persona.id}>
                      {persona.name} {persona.occupation && `(${persona.occupation})`}
                      {persona.isPrebuilt && ' ⭐'}
                    </option>
                  ))}
                </select>
              )}

              {selectedPersona && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center">
                        <span className="text-purple-700 font-semibold">
                          {selectedPersona.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{selectedPersona.name}</h3>
                      {selectedPersona.occupation && (
                        <p className="text-sm text-gray-600">{selectedPersona.occupation}</p>
                      )}
                      {selectedPersona.description && (
                        <p className="text-sm text-gray-700 mt-2">{selectedPersona.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content Type */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Content Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['dialogue', 'email', 'social_post', 'blog', 'script', 'decision'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setContentType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      contentType === type
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Scenario Context (Optional) */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Scenario Context <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder="E.g., 'At a business meeting discussing quarterly results' or 'Responding to a Twitter controversy'"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* Prompt Input */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Your Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What should this persona respond to? E.g., 'How would you explain climate change to a skeptical audience?' or 'Write a tweet about the importance of critical thinking'"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={6}
              />

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                onClick={generateResponse}
                disabled={loading || !selectedPersonaId || !prompt}
                className="mt-4 w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Response
                  </>
                )}
              </button>
            </div>

            {/* Response Display */}
            {response && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Response from {selectedPersona?.name}
                  </h3>
                  <button
                    onClick={() => navigator.clipboard.writeText(response)}
                    className="text-sm text-purple-600 hover:text-purple-700 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </button>
                </div>
                <div className="prose max-w-none">
                  <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap font-serif text-gray-800">
                    {response}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - History & Tips */}
          <div className="space-y-6">
            {/* Quick Tips */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Quick Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Be specific in your prompts for better persona responses
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Add scenario context for more authentic responses
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Try different content types to explore versatility
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Compare responses across different personas
                </li>
              </ul>
            </div>

            {/* Recent History */}
            {history.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tests</h3>
                <div className="space-y-3">
                  {history.map((item, idx) => (
                    <div key={idx} className="border-l-4 border-purple-500 pl-4 py-2">
                      <div className="text-xs font-semibold text-purple-600 mb-1">
                        {item.personaName}
                      </div>
                      <div className="text-sm text-gray-700 line-clamp-2">
                        {item.prompt}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
