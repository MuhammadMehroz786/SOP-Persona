import Link from 'next/link';

export default function MarketerTemplatePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/persona-gpt" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-xl p-8 text-white mb-8">
          <div className="flex items-center mb-4">
            <svg className="w-12 h-12 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            <div>
              <h1 className="text-3xl font-bold">Marketer Template</h1>
              <p className="text-purple-100 mt-1">Target Personas & Brand Voice Development</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Marketing Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Buyer Personas</h3>
              <p className="text-gray-600 text-sm">Create detailed target audience personas with motivations, pain points, and preferences</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">📱 Social Media Voice</h3>
              <p className="text-gray-600 text-sm">Develop consistent brand voice across different platforms and audiences</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">✍️ Content Testing</h3>
              <p className="text-gray-600 text-sm">Test messaging with different personas before launching campaigns</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">💼 B2B Personas</h3>
              <p className="text-gray-600 text-sm">Create decision-maker personas for enterprise sales and marketing</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Example Target Personas</h2>
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Budget-Conscious Millennial</h4>
              <p className="text-sm text-gray-700">Values experiences over things. Skeptical of traditional advertising. Influenced by peer reviews and social proof.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Tech-Savvy Professional</h4>
              <p className="text-sm text-gray-700">Early adopter. Values efficiency and innovation. Responds to data-driven messaging and ROI proof.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Enterprise Decision Maker</h4>
              <p className="text-sm text-gray-700">Risk-averse. Needs security, scalability, and vendor reliability. Long sales cycle with multiple stakeholders.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Eco-Conscious Consumer</h4>
              <p className="text-sm text-gray-700">Prioritizes sustainability and ethical practices. Willing to pay premium for values-aligned brands.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Example Marketing Prompts</h2>
          <div className="space-y-4">
            <div className="bg-pink-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 italic">"Write a social media post explaining why this product solves your biggest problem"</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 italic">"What objections do you have about buying this product, and what would convince you?"</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 italic">"Describe your ideal customer journey from awareness to purchase"</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg shadow-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Build Better Campaigns</h2>
          <p className="mb-6 text-purple-100">Create target personas to refine your marketing strategy</p>
          <div className="flex gap-4 justify-center">
            <Link href="/persona-gpt/create" className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-purple-600 transition-colors">
              Create Target Persona
            </Link>
            <Link href="/persona-gpt/playground" className="inline-flex items-center px-6 py-3 bg-white text-base font-medium rounded-lg text-purple-600 hover:bg-purple-50 transition-colors">
              Test Messaging
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
