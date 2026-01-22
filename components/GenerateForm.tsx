'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GenerateForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        industry: 'general',
        tone: 'formal',
        language: 'en',
        regulatoryFramework: [] as string[],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Generate content
            const generateRes = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    industry: formData.industry,
                    tone: formData.tone,
                    language: formData.language,
                    regulatoryFramework: formData.regulatoryFramework,
                }),
            });

            if (!generateRes.ok) throw new Error('Failed to generate content');

            const { content } = await generateRes.json();

            // Convert JSON structure to rich text HTML/JSON for the editor
            // This maps the AI's structured response to Tiptap content
            const visualContent = {
                type: 'doc',
                content: [
                    { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: '1. Purpose' }] },
                    { type: 'paragraph', content: [{ type: 'text', text: content.purpose }] },

                    { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: '2. Scope' }] },
                    { type: 'paragraph', content: [{ type: 'text', text: content.scope }] },

                    { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: '3. Responsibilities' }] },
                    {
                        type: 'bulletList', content: content.responsibilities.map((r: string) => ({
                            type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: r }] }]
                        }))
                    },

                    { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: '4. Procedures' }] },
                    {
                        type: 'orderedList', content: content.procedures.map((p: any) => ({
                            type: 'listItem', content: [
                                { type: 'paragraph', content: [{ type: 'text', text: `Step ${p.step}: ${p.action}` }] },
                                { type: 'paragraph', content: [{ type: 'text', text: p.details }] },
                                ...(p.warning ? [{ type: 'paragraph', attrs: { class: 'text-red-600 font-bold' }, content: [{ type: 'text', text: `WARNING: ${p.warning}` }] }] : [])
                            ]
                        }))
                    },

                    { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: '5. Safety Notes' }] },
                    {
                        type: 'bulletList', content: content.safetyNotes.map((n: string) => ({
                            type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: n }] }]
                        }))
                    },
                ]
            };

            // 2. Create SOP
            const createRes = await fetch('/api/sops', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    category: formData.category,
                    content: visualContent,
                    status: 'draft',
                    industry: formData.industry,
                    tone: formData.tone,
                    language: formData.language,
                    regulatoryFramework: formData.regulatoryFramework.join(','),
                }),
            });

            if (!createRes.ok) throw new Error('Failed to save SOP');

            const { id } = await createRes.json();
            router.push(`/edit/${id}`);

        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please check your API key and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow border border-gray-200">
            <div>
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    SOP Title
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        id="title"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                        placeholder="e.g. Employee Onboarding Process"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                        Category
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="category"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                            placeholder="e.g. HR, IT, Operations"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="industry" className="block text-sm font-medium leading-6 text-gray-900">
                        Industry
                    </label>
                    <div className="mt-2">
                        <select
                            id="industry"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        >
                            <option value="general">General</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="it">Information Technology</option>
                            <option value="finance">Financial Services</option>
                            <option value="laboratory">Laboratory</option>
                            <option value="food">Food & Beverage</option>
                            <option value="construction">Construction</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="tone" className="block text-sm font-medium leading-6 text-gray-900">
                        Tone
                    </label>
                    <div className="mt-2">
                        <select
                            id="tone"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                            value={formData.tone}
                            onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                        >
                            <option value="formal">Formal (Professional & Authoritative)</option>
                            <option value="technical">Technical (Detailed & Precise)</option>
                            <option value="simple">Simple (Clear & Accessible)</option>
                            <option value="friendly">Friendly (Approachable)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="language" className="block text-sm font-medium leading-6 text-gray-900">
                        Language
                    </label>
                    <div className="mt-2">
                        <select
                            id="language"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                            value={formData.language}
                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        >
                            <option value="en">🇺🇸 English</option>
                            <option value="es">🇪🇸 Spanish (Español)</option>
                            <option value="fr">🇫🇷 French (Français)</option>
                            <option value="de">🇩🇪 German (Deutsch)</option>
                            <option value="zh">🇨🇳 Chinese (简体中文)</option>
                            <option value="ja">🇯🇵 Japanese (日本語)</option>
                            <option value="pt">🇧🇷 Portuguese (Português)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                    Regulatory Framework (optional)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {['ISO 9001', 'ISO 13485', 'FDA 21 CFR Part 11', 'GMP', 'ISO 27001', 'SOC 2', 'HIPAA', 'HACCP'].map((framework) => (
                        <label key={framework} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formData.regulatoryFramework.includes(framework)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFormData({ ...formData, regulatoryFramework: [...formData.regulatoryFramework, framework] });
                                    } else {
                                        setFormData({ ...formData, regulatoryFramework: formData.regulatoryFramework.filter(f => f !== framework) });
                                    }
                                }}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                            />
                            <span className="text-sm text-gray-700">{framework}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    Brief Description
                </label>
                <div className="mt-2">
                    <textarea
                        id="description"
                        required
                        rows={4}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                        placeholder="Describe what this SOP should cover. The AI will use this to generate the content."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
            </div>

            {error && (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">{error}</h3>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed items-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating SOP...
                        </>
                    ) : (
                        'Generate with AI'
                    )}
                </button>
            </div>
        </form>
    );
}
