import Link from 'next/link';

export default function NovelistTemplatePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/persona-gpt"
          className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
        >
          ← Back to Dashboard
        </Link>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-xl p-8 text-white mb-8">
          <div className="flex items-center mb-4">
            <svg className="w-12 h-12 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <div>
              <h1 className="text-3xl font-bold">Novelist Template</h1>
              <p className="text-blue-100 mt-1">Character Development & Dialogue Generation</p>
            </div>
          </div>
        </div>

        {/* What You Can Do */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What You Can Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">📝 Character Development</h3>
              <p className="text-gray-600 text-sm">Create deep, consistent characters with unique voices and believable motivations</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">💬 Dialogue Generation</h3>
              <p className="text-gray-600 text-sm">Generate authentic dialogue that reflects each character's personality and background</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎭 Plot Consistency</h3>
              <p className="text-gray-600 text-sm">Ensure characters react consistently based on their established beliefs and behaviors</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">🧪 Scene Testing</h3>
              <p className="text-gray-600 text-sm">Test how characters would respond in different scenarios before writing</p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use for Novel Writing</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                1
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900 mb-1">Create Character Personas</h3>
                <p className="text-gray-600 text-sm mb-2">Build a persona for each major character in your novel. Include:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Backstory and formative experiences</li>
                  <li>Voice characteristics (dialect, vocabulary, speech patterns)</li>
                  <li>Core beliefs shaped by their history</li>
                  <li>Emotional range and typical mood</li>
                  <li>How they handle conflict and make decisions</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                2
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900 mb-1">Test Dialogue</h3>
                <p className="text-gray-600 text-sm">Use the playground to generate dialogue. Ask questions like:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2">
                  <li>"How would you react if someone betrayed your trust?"</li>
                  <li>"Describe your childhood home"</li>
                  <li>"What would you say to someone who disagrees with your core belief?"</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                3
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900 mb-1">Scene Planning</h3>
                <p className="text-gray-600 text-sm">Test how multiple characters would interact in a scene. Use scenario context to set the stage, then see how each persona responds.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                4
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900 mb-1">Character Arc Testing</h3>
                <p className="text-gray-600 text-sm">As your character evolves, update their persona and test how they've changed. Compare responses from different points in their arc.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Example Use Cases */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Example Prompts for Novelists</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Character Voice Consistency</h4>
              <p className="text-sm text-gray-700 italic">"You just discovered your best friend has been lying to you for years. What do you say to them?"</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Backstory Exploration</h4>
              <p className="text-sm text-gray-700 italic">"Tell me about the moment that changed your life forever."</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Dialogue in Conflict</h4>
              <p className="text-sm text-gray-700 italic">"You're arguing with someone you love about a decision that could ruin your life. Write the dialogue."</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Internal Monologue</h4>
              <p className="text-sm text-gray-700 italic">"What are you thinking right now as you stand at this crossroads?"</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Your Characters?</h2>
          <p className="mb-6 text-blue-100">Start creating distinct, memorable personas for your novel</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/persona-gpt/create"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              Create Character Persona
            </Link>
            <Link
              href="/persona-gpt/playground"
              className="inline-flex items-center px-6 py-3 bg-white text-base font-medium rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Test in Playground
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
