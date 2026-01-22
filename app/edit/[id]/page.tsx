'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SOPEditor from '@/components/SOPEditor';
import ExportMenu from '@/components/ExportMenu';

interface EditPageProps {
    params: {
        id: string;
    };
}

export default function EditPage({ params }: EditPageProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [sop, setSop] = useState<any>(null);
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        const fetchSOP = async () => {
            try {
                const res = await fetch(`/api/sops/${params.id}`);
                if (!res.ok) throw new Error('Failed to fetch SOP');
                const data = await res.json();
                setSop(data);
                setContent(JSON.parse(data.content));
            } catch (error) {
                console.error(error);
                alert('Could not load SOP');
            } finally {
                setLoading(false);
            }
        };

        fetchSOP();
    }, [params.id]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/sops/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...sop,
                    content: content,
                }),
            });

            if (!res.ok) throw new Error('Failed to save');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this SOP?')) return;

        try {
            const res = await fetch(`/api/sops/${params.id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete');
            router.push('/');
        } catch (error) {
            console.error(error);
            alert('Failed to delete SOP');
        }
    };

    const handleExport = () => {
        window.open(`/api/export/${params.id}`, '_blank');
    };

    if (loading) return <div className="p-10 text-center">Loading SOP...</div>;
    if (!sop) return <div className="p-10 text-center">SOP not found</div>;

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm z-10">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-gray-500 hover:text-gray-700">
                            <span className="sr-only">Back</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </Link>
                        <div>
                            <input
                                type="text"
                                value={sop.title}
                                onChange={(e) => setSop({ ...sop, title: e.target.value })}
                                className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-xl sm:font-bold font-semibold"
                                placeholder="SOP Title"
                            />
                            <span className="text-xs text-gray-500">v{sop.version} • {sop.status}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDelete}
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-50"
                        >
                            Delete
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content - Editor and Export Menu */}
            <div className="flex-1 overflow-auto">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <SOPEditor
                            content={content}
                            onChange={setContent}
                        />
                    </div>

                    <ExportMenu sopId={params.id} sopTitle={sop.title} />
                </div>
            </div>
        </main>
    );
}
