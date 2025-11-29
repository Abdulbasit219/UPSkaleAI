import { Rocket, Sparkles, Building } from "lucide-react";

const CTABanner = () => (
  <div className="mt-12 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-8 md:p-12 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
    <div className="relative z-10 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
        <Rocket className="w-4 h-4 text-white" />
        <span className="text-sm font-medium text-white">
          Ready to take the next step?
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Can't find the perfect role?
      </h2>
      <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
        Let our AI create a personalized career path and recommend new
        opportunities daily
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          Get AI Career Path
        </button>
        <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
          <Building className="w-5 h-5" />
          Browse Companies
        </button>
      </div>
    </div>
  </div>
);

export default CTABanner;