import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import SOPList from '@/components/SOPList';

export const dynamic = 'force-dynamic';

async function getSOPs() {
  try {
    const sops = await prisma.sOP.findMany({
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        category: true,
        status: true,
        updatedAt: true,
      },
    });
    // Serialize dates for client components
    return sops.map((sop: any) => ({
      ...sop,
      updatedAt: sop.updatedAt.toISOString(),
      category: sop.category || null,
    }));
  } catch (error) {
    console.error('Failed to fetch SOPs:', error);
    return [];
  }
}

export default async function SOPGeneratorDashboard() {
  const sops = await getSOPs();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="min-w-0 flex-1">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
            >
              ← Back to Home
            </Link>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              SOP Library
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and organize your Standard Operating Procedures.
            </p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <Link
              href="/create"
              className="ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Create New SOP
            </Link>
          </div>
        </div>

        <SOPList initialSops={sops} />
      </div>
    </main>
  );
}
