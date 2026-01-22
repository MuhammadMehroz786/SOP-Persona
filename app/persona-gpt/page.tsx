import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getPersonaStats() {
  try {
    const totalPersonas = await prisma.persona.count();
    const customPersonas = await prisma.persona.count({
      where: { isPrebuilt: false }
    });
    const totalResponses = await prisma.personaResponse.count();
    const totalScenarios = await prisma.personaScenario.count();

    return {
      totalPersonas,
      customPersonas,
      totalResponses,
      totalScenarios
    };
  } catch (error) {
    console.error('Failed to fetch persona stats:', error);
    return {
      totalPersonas: 0,
      customPersonas: 0,
      totalResponses: 0,
      totalScenarios: 0
    };
  }
}

async function getPrebuiltPersonas() {
  try {
    return await prisma.persona.findMany({
      where: { isPrebuilt: true },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error('Failed to fetch prebuilt personas:', error);
    return [];
  }
}

async function getRecentPersonas() {
  try {
    return await prisma.persona.findMany({
      where: { isPrebuilt: false },
      orderBy: { updatedAt: 'desc' },
      take: 6
    });
  } catch (error) {
    console.error('Failed to fetch recent personas:', error);
    return [];
  }
}

export default async function PersonaGPTDashboard() {
  const stats = await getPersonaStats();
  const prebuiltPersonas = await getPrebuiltPersonas();
  const recentPersonas = await getRecentPersonas();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Persona GPT
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Build distinct AI personas with unique voices, beliefs, and behaviors
              </p>
            </div>
            <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
              <Link
                href="/persona-gpt/playground"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Test Playground
              </Link>
              <Link
                href="/persona-gpt/create"
                className="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Persona
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Personas</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stats.totalPersonas}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Custom Personas</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stats.customPersonas}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Responses Generated</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stats.totalResponses}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Scenarios Tested</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stats.totalScenarios}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pre-built Editorial Agents */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Pre-built Editorial Agents</h2>
            {prebuiltPersonas.length === 0 && (
              <Link
                href="/persona-gpt/setup-agents"
                className="text-sm text-purple-600 hover:text-purple-500 font-medium"
              >
                Set up agents →
              </Link>
            )}
          </div>
          {prebuiltPersonas.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pre-built agents yet</h3>
              <p className="text-sm text-gray-500 mb-4">
                Set up Malcolm, Ron, Winston, and Ana - your editorial dream team
              </p>
              <Link
                href="/persona-gpt/setup-agents"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                Set Up Editorial Agents
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {prebuiltPersonas.map((persona) => (
                <Link key={persona.id} href={`/persona-gpt/${persona.id}`}>
                  <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-500">
                    <div className="flex items-center mb-3">
                      {persona.avatarUrl ? (
                        <img src={persona.avatarUrl} alt={persona.name} className="h-10 w-10 rounded-full" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-semibold text-lg">
                            {persona.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="ml-3">
                        <h3 className="text-sm font-semibold text-gray-900">{persona.name}</h3>
                        <p className="text-xs text-gray-500">{persona.occupation || 'Editorial Agent'}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{persona.description}</p>
                    <div className="mt-3 flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      </svg>
                      {persona.usageCount} uses
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Use Case Templates */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Use Case Templates</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link href="/persona-gpt/templates/novelist">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="ml-3 text-lg font-semibold">Novelist</h3>
                </div>
                <p className="text-sm text-blue-100">
                  Character development, dialogue generation, plot consistency
                </p>
              </div>
            </Link>

            <Link href="/persona-gpt/templates/educator">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="ml-3 text-lg font-semibold">Educator</h3>
                </div>
                <p className="text-sm text-green-100">
                  Student personas, teaching scenarios, adaptive learning
                </p>
              </div>
            </Link>

            <Link href="/persona-gpt/templates/marketer">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                  <h3 className="ml-3 text-lg font-semibold">Marketer</h3>
                </div>
                <p className="text-sm text-purple-100">
                  Target personas, brand voice, campaign messaging
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Custom Personas */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Custom Personas</h2>
            <Link
              href="/persona-gpt/library"
              className="text-sm text-purple-600 hover:text-purple-500 font-medium"
            >
              View all →
            </Link>
          </div>
          {recentPersonas.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No custom personas yet</h3>
              <p className="text-sm text-gray-500 mb-4">
                Create your first persona to get started
              </p>
              <Link
                href="/persona-gpt/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                Create Your First Persona
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentPersonas.map((persona) => (
                <Link key={persona.id} href={`/persona-gpt/${persona.id}`}>
                  <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        {persona.avatarUrl ? (
                          <img src={persona.avatarUrl} alt={persona.name} className="h-10 w-10 rounded-full" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 font-semibold text-lg">
                              {persona.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="ml-3">
                          <h3 className="text-sm font-semibold text-gray-900">{persona.name}</h3>
                          <p className="text-xs text-gray-500">{persona.occupation || persona.category}</p>
                        </div>
                      </div>
                      {persona.category && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                          {persona.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{persona.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        </svg>
                        {persona.usageCount} uses
                      </div>
                      {persona.lastUsed && (
                        <span>Last used {new Date(persona.lastUsed).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
