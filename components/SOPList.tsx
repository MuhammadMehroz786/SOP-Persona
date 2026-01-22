'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SOP {
    id: string;
    title: string;
    category: string | null;
    status: string;
    updatedAt: string;
}

export default function SOPList({ initialSops }: { initialSops: SOP[] }) {
    const [sops] = useState<SOP[]>(initialSops);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'draft': return 'bg-yellow-100 text-yellow-800';
            case 'archived': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (sops.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No SOPs</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new SOP.</p>
                <div className="mt-6">
                    <Link
                        href="/create"
                        className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Create SOP
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sops.map((sop) => (
                <Link
                    key={sop.id}
                    href={`/edit/${sop.id}`}
                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-md border border-gray-200 block"
                >
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                        <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                                <h3 className="truncate text-sm font-medium text-gray-900">{sop.title}</h3>
                                <span className={`inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ${getStatusColor(sop.status)}`}>
                                    {sop.status}
                                </span>
                            </div>
                            <p className="mt-1 truncate text-xs text-gray-500">
                                {sop.category || 'Uncategorized'}
                            </p>
                        </div>
                    </div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="flex w-0 flex-1">
                            <span className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                Last updated: {new Date(sop.updatedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
