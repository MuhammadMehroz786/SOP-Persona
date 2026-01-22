import Link from 'next/link';

export default function EducatorTemplatePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/persona-gpt" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-xl p-8 text-white mb-8">
          <div className="flex items-center mb-4">
            <svg className="w-12 h-12 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <div>
              <h1 className="text-3xl font-bold">Educator Template</h1>
              <p className="text-green-100 mt-1">Student Personas & Adaptive Teaching</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Educational Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">👨‍🎓 Student Personas</h3>
              <p className="text-gray-600 text-sm">Create diverse student personas with different learning styles, backgrounds, and challenges</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">📚 Adaptive Content</h3>
              <p className="text-gray-600 text-sm">Test how different students respond to various teaching approaches</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">💬 Q&A Simulation</h3>
              <p className="text-gray-600 text-sm">Anticipate student questions and prepare better explanations</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Personalization</h3>
              <p className="text-gray-600 text-sm">Create personalized learning experiences for different student types</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Example Student Personas</h2>
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">The Visual Learner</h4>
              <p className="text-sm text-gray-700">Struggles with lectures, excels with diagrams and demonstrations. Needs to see concepts visualized.</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">The Struggling Student</h4>
              <p className="text-sm text-gray-700">Has learning difficulties, needs extra support and patience. Responds well to encouragement.</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">The Advanced Learner</h4>
              <p className="text-sm text-gray-700">Grasps concepts quickly, needs challenging material to stay engaged. Asks deep questions.</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">The Anxious Student</h4>
              <p className="text-sm text-gray-700">Knows the material but struggles with test anxiety. Needs reassurance and stress management techniques.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg shadow-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Enhance Your Teaching</h2>
          <p className="mb-6 text-green-100">Create student personas to improve your educational approach</p>
          <div className="flex gap-4 justify-center">
            <Link href="/persona-gpt/create" className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-green-600 transition-colors">
              Create Student Persona
            </Link>
            <Link href="/persona-gpt/playground" className="inline-flex items-center px-6 py-3 bg-white text-base font-medium rounded-lg text-green-600 hover:bg-green-50 transition-colors">
              Test Scenarios
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
