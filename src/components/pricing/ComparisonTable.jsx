import React from 'react';

const ComparisonTable = ({ isDark }) => {
  const comparisonData = [
    ['Career Paths', '10', 'Unlimited', 'Unlimited + Custom'],
    ['Skill Assessments', '3/month', 'Unlimited', 'Unlimited'],
    ['AI Recommendations', '—', '✓', '✓'],
    ['Job Matches', 'Basic', 'Advanced', 'Premium + API'],
    ['Portfolio Builder', 'Basic', 'Advanced', 'Custom'],
    ['Support', 'Email', 'Priority', '24/7 Dedicated'],
    ['Analytics', '—', 'Standard', 'Advanced'],
    ['Team Management', '—', '—', '✓'],
  ];

  return (
    <div className="mb-20">
      <h2 className={`text-3xl font-bold text-center mb-12 ${
        isDark ? "text-white" : "text-gray-900"
      }`}>
        Compare Plans
      </h2>
      <div className={`backdrop-blur-xl border rounded-2xl overflow-hidden ${
        isDark
          ? "bg-slate-900/50 border-purple-500/20"
          : "bg-white/80 border-purple-300/20"
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${
                isDark ? "border-purple-500/20" : "border-purple-300/20"
              }`}>
                <th className={`text-left py-4 px-6 font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}>Features</th>
                <th className={`text-center py-4 px-6 font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>Free</th>
                <th className={`text-center py-4 px-6 font-semibold ${
                  isDark ? "text-white bg-purple-500/10" : "text-gray-900 bg-purple-100/50"
                }`}>Pro</th>
                <th className={`text-center py-4 px-6 font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>Enterprise</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className={`border-b ${
                  isDark 
                    ? "border-purple-500/10 hover:bg-purple-500/5" 
                    : "border-purple-300/10 hover:bg-purple-100/30"
                }`}>
                  <td className={`py-4 px-6 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>{row[0]}</td>
                  <td className={`py-4 px-6 text-center ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}>{row[1]}</td>
                  <td className={`py-4 px-6 text-center ${
                    isDark ? "text-white bg-purple-500/5" : "text-gray-900 bg-purple-50/50"
                  }`}>{row[2]}</td>
                  <td className={`py-4 px-6 text-center ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
