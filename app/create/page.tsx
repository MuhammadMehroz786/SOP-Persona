import GenerateForm from '@/components/GenerateForm';
import Link from 'next/link';

export default function CreatePage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8">
                    <nav className="flex mb-4" aria-label="Breadcrumb">
                        <ol role="list" className="flex items-center space-x-4">
                            <li>
                                <div className="flex items-center">
                                    <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                                        SOP Library
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                    </svg>
                                    <span className="ml-4 text-sm font-medium text-gray-900" aria-current="page">Create New SOP</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                        Create AI-Generated SOP
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Provide a title and description, and our AI will generate a professional SOP draft for you.
                    </p>
                </div>

                <GenerateForm />
            </div>
        </main>
    );
}
