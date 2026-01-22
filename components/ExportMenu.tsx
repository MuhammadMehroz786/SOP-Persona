'use client';

import { useState } from 'react';

interface ExportMenuProps {
    sopId: string;
    sopTitle: string;
}

export default function ExportMenu({ sopId, sopTitle }: ExportMenuProps) {
    const [exportingFormat, setExportingFormat] = useState<string | null>(null);

    const handleExport = async (format: 'pdf' | 'docx' | 'xlsx' | 'html') => {
        setExportingFormat(format);
        try {
            const response = await fetch(`/api/export/${sopId}/${format}`);

            if (!response.ok) {
                throw new Error(`Failed to export as ${format.toUpperCase()}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            // Get filename from Content-Disposition header or create one
            const contentDisposition = response.headers.get('Content-Disposition');
            const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
            const filename = filenameMatch
                ? filenameMatch[1]
                : `${sopTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${format}`;

            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error(`Error exporting as ${format}:`, error);
            alert(`Failed to export as ${format.toUpperCase()}. Please try again.`);
        } finally {
            setExportingFormat(null);
        }
    };

    const exportOptions = [
        {
            format: 'pdf' as const,
            label: 'PDF',
            icon: '📄',
            description: 'Portable Document Format',
            color: 'bg-red-600 hover:bg-red-700'
        },
        {
            format: 'docx' as const,
            label: 'Word',
            icon: '📘',
            description: 'Microsoft Word Document',
            color: 'bg-blue-600 hover:bg-blue-700'
        },
        {
            format: 'xlsx' as const,
            label: 'Excel',
            icon: '📗',
            description: 'Excel Checklist Format',
            color: 'bg-green-600 hover:bg-green-700'
        },
        {
            format: 'html' as const,
            label: 'HTML',
            icon: '🌐',
            description: 'Web Page Format',
            color: 'bg-purple-600 hover:bg-purple-700'
        }
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {exportOptions.map(({ format, label, icon, description, color }) => (
                    <button
                        key={format}
                        onClick={() => handleExport(format)}
                        disabled={exportingFormat !== null}
                        className={`${color} text-white rounded-lg p-4 transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center text-center space-y-2`}
                    >
                        <span className="text-3xl">{icon}</span>
                        <span className="font-semibold">{label}</span>
                        <span className="text-xs opacity-90">{description}</span>
                        {exportingFormat === format && (
                            <svg className="animate-spin h-5 w-5 text-white mt-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                    </button>
                ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
                💡 Tip: Use Excel format for printable checklists, Word for editable documents, and HTML for web viewing.
            </p>
        </div>
    );
}
