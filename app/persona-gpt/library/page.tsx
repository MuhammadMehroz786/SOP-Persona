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
  usageCount: number;
  lastUsed: Date | null;
  tags: string | null;
  createdAt: Date;
}

export default function LibraryPage() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [filteredPersonas, setFilteredPersonas] = useState<Persona[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonas();
  }, []);

  useEffect(() => {
    filterPersonas();
  }, [personas, search, categoryFilter, typeFilter]);

  const fetchPersonas = async () => {
    try {
      const res = await fetch('/api/personas');
      const data = await res.json();
      setPersonas(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch personas:', err);
      setLoading(false);
    }
  };

  const filterPersonas = () => {
    let filtered = [...personas];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.occupation?.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.tags?.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    // Type filter
    if (typeFilter === 'prebuilt') {
      filtered = filtered.filter(p => p.isPrebuilt);
    } else if (typeFilter === 'custom') {
      filtered = filtered.filter(p => !p.isPrebuilt);
    }

    setFilteredPersonas(filtered);
  };

  const deletePersona = async (id: string) => {
    if (!confirm('Are you sure you want to delete this persona?')) {
      return;
    }

    try {
      await fetch(`/api/personas/${id}`, {
        method: 'DELETE',
      });
      setPersonas(personas.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete persona:', err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading personas...</p>
        </div>
      </main>
    );
  }

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
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Persona Library</h1>
              <p className="mt-2 text-gray-600">
                Browse and manage all your AI personas
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href="/persona-gpt/create"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Persona
              </Link>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, occupation, tags..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="editorial">Editorial</option>
                <option value="novelist">Novelist</option>
                <option value="educator">Educator</option>
                <option value="marketer">Marketer</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="prebuilt">Pre-built</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredPersonas.length} of {personas.length} personas
          </div>
        </div>

        {/* Personas Grid */}
        {filteredPersonas.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No personas found</h3>
            <p className="mt-2 text-sm text-gray-500">
              {search || categoryFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by creating your first persona'}
            </p>
            {personas.length === 0 && (
              <div className="mt-6">
                <Link
                  href="/persona-gpt/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                >
                  Create Persona
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPersonas.map((persona) => (
              <div key={persona.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 font-semibold">
                          {persona.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900">{persona.name}</h3>
                        {persona.occupation && (
                          <p className="text-sm text-gray-500">{persona.occupation}</p>
                        )}
                      </div>
                    </div>
                    {persona.isPrebuilt && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        ⭐ Pre-built
                      </span>
                    )}
                  </div>

                  {persona.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{persona.description}</p>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      </svg>
                      {persona.usageCount} uses
                    </div>
                    {persona.category && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                        {persona.category}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/persona-gpt/${persona.id}`}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 text-center"
                    >
                      View Details
                    </Link>
                    {!persona.isPrebuilt && (
                      <button
                        onClick={() => deletePersona(persona.id)}
                        className="px-3 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
