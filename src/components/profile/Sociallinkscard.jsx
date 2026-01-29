import React, { useState } from "react";
import { Globe, Github, Linkedin, Twitter, ExternalLink, Plus, Pencil } from "lucide-react";
import SocialLinksModal from "./Sociallinksmodal";

const SocialLinksCard = ({ socialLinks, isDark }) => {
  const [showModal, setShowModal] = useState(false);

  const links = [
    {
      name: "Website",
      icon: Globe,
      url: socialLinks?.website,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "GitHub",
      icon: Github,
      url: socialLinks?.github,
      color: "from-gray-700 to-gray-900",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: socialLinks?.linkedin,
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: socialLinks?.twitter,
      color: "from-sky-400 to-blue-500",
    },
  ].filter((link) => link.url); // Only show links that exist

  const hasLinks = links.length > 0;

  return (
    <>
      <div
        className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
          isDark
            ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20"
            : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className={`text-xl font-bold flex items-center gap-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <Globe className="w-5 h-5 text-purple-400" />
            Social Links
          </h3>
          <button
            onClick={() => setShowModal(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              isDark
                ? "bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20"
                : "bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300"
            }`}
          >
            {hasLinks ? (
              <>
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                Add
              </>
            )}
          </button>
        </div>

        {hasLinks ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    isDark
                      ? "bg-slate-800/50 border-slate-700 hover:border-purple-500/30 hover:bg-slate-800"
                      : "bg-gray-50 border-gray-200 hover:border-purple-300 hover:bg-white"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm font-medium ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {link.name}
                    </div>
                    <div
                      className={`text-xs truncate ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                    </div>
                  </div>
                  <ExternalLink
                    className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                </a>
              );
            })}
          </div>
        ) : (
          <div
            className={`text-center py-8 rounded-lg border-2 border-dashed ${
              isDark
                ? "border-slate-700 bg-slate-800/30"
                : "border-gray-300 bg-gray-50/50"
            }`}
          >
            <Globe
              className={`w-10 h-10 mx-auto mb-2 ${
                isDark ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No social links added yet
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer mt-3 text-sm text-purple-500 hover:text-purple-600 font-medium"
            >
              Add your first link
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <SocialLinksModal
          open={showModal}
          setOpen={setShowModal}
          currentLinks={socialLinks}
          isDark={isDark}
        />
      )}
    </>
  );
};

export default SocialLinksCard;
