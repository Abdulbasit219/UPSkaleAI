"use client";
import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, 
  Clock, Users, MessageCircle, 
  CheckCircle2, ArrowRight,
  Sparkles, Shield, Globe
} from 'lucide-react';
import { useSelector } from 'react-redux';
import SharedCTABanner from "@/components/ui/CTABanner";


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "We'll respond within 24 hours",
      value: "support@skillbridge.com",
      link: "mailto:support@skillbridge.com",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Instant support with our AI assistant",
      value: "Start Chat",
      link: "#chat",
      color: "from-green-500 to-blue-500"
    }
  ];

  const faqs = [
    {
      question: "How long does it take to get a personalized roadmap?",
      answer: "Our AI generates your personalized career roadmap instantly after you complete the initial assessment."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 14-day money-back guarantee if you're not satisfied with our platform."
    },
    {
      question: "Can I change my career path later?",
      answer: "Absolutely! You can update your goals and get a new roadmap anytime at no additional cost."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial with full access to all platform features."
    }
  ];

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      text: "24/7 Support"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      text: "Global Community"
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Expert Mentors"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "Fast Response"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
        : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
    } pt-24 pb-20`}>
      
      {/* Background Pattern */}
      {isDark && (
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 border rounded-full mb-8 backdrop-blur-sm ${
            isDark
              ? "bg-purple-500/20 border-purple-500/30"
              : "bg-purple-100/80 border-purple-300/30"
          }`}>
            <Sparkles className={`w-4 h-4 ${isDark ? "text-purple-300" : "text-purple-500"}`} />
            <span className={`text-sm font-semibold ${isDark ? "text-purple-200" : "text-purple-700"}`}>
              We're Here to Help
            </span>
            <Sparkles className={`w-4 h-4 ${isDark ? "text-pink-300" : "text-pink-500"}`} />
          </div>

          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Get in
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient"> Touch </span>
          </h1>
          
          <p className={`text-xl sm:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            Have questions about your career journey? Our team is here to help you 
            <br className="hidden sm:block" />
            bridge the gap between learning and earning.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20 text-purple-200"
                    : "bg-white/80 border-purple-300/20 text-purple-700"
                }`}
              >
                <div className={`${isDark ? "text-purple-300" : "text-purple-500"}`}>
                  {feature.icon}
                </div>
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          {/* Contact Form */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className={`backdrop-blur-2xl border-2 rounded-[2rem] p-8 shadow-2xl ${
              isDark
                ? "bg-gradient-to-br from-slate-900/90 via-purple-900/30 to-slate-900/90 border-purple-500/40 shadow-purple-500/20"
                : "bg-gradient-to-br from-white/90 via-purple-50/30 to-white/90 border-purple-300/40 shadow-purple-300/20"
            }`}>
              <h2 className={`text-3xl font-black mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                Send us a Message
              </h2>
              <p className={`mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/40 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-3 text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold">Message sent successfully! We'll get back to you soon.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    }`}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                        isDark
                          ? "bg-slate-900/50 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400/60"
                          : "bg-white/80 border-purple-300/30 text-gray-900 placeholder-gray-500 focus:border-purple-400/60"
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    }`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                        isDark
                          ? "bg-slate-900/50 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400/60"
                          : "bg-white/80 border-purple-300/30 text-gray-900 placeholder-gray-500 focus:border-purple-400/60"
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                      isDark
                        ? "bg-slate-900/50 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400/60"
                        : "bg-white/80 border-purple-300/30 text-gray-900 placeholder-gray-500 focus:border-purple-400/60"
                    }`}
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none ${
                      isDark
                        ? "bg-slate-900/50 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400/60"
                        : "bg-white/80 border-purple-300/30 text-gray-900 placeholder-gray-500 focus:border-purple-400/60"
                    }`}
                    placeholder="Tell us about your career goals and how we can help..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Methods & Info */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div>
              <h3 className={`text-2xl font-black mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                Other Ways to Reach Us
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, idx) => (
                  <a
                    key={idx}
                    href={method.link}
                    className={`group block p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${
                      isDark
                        ? "bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/30"
                        : "bg-gradient-to-br from-white/80 to-white/60 border-purple-300/30 hover:border-purple-300/60 hover:shadow-2xl hover:shadow-purple-300/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {method.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold text-lg mb-1 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>
                          {method.title}
                        </h4>
                        <p className={`text-sm mb-2 ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}>
                          {method.description}
                        </p>
                        <p className={`font-semibold ${
                          isDark ? "text-purple-300" : "text-purple-600"
                        }`}>
                          {method.value}
                        </p>
                      </div>
                      <ArrowRight className={`w-5 h-5 transform group-hover:translate-x-1 transition-transform ${
                        isDark ? "text-purple-400" : "text-purple-500"
                      }`} />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className={`text-2xl font-black mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl border backdrop-blur-sm ${
                      isDark
                        ? "bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-purple-500/20"
                        : "bg-gradient-to-br from-white/50 to-white/30 border-purple-300/20"
                    }`}
                  >
                    <h4 className={`font-bold text-lg mb-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {faq.question}
                    </h4>
                    <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Info */}
            <div className={`p-6 rounded-2xl border backdrop-blur-sm ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/60 border-purple-300/30"
            }`}>
              <div className="flex items-start gap-3">
                <MapPin className={`w-5 h-5 mt-1 flex-shrink-0 ${
                  isDark ? "text-purple-400" : "text-purple-500"
                }`} />
                <div>
                  <h4 className={`font-bold text-lg mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    Our Office
                  </h4>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                    123 Career Street<br />
                    Karachi, 94105<br />
                    Pakistan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <SharedCTABanner
            isDark={isDark}
            className="rounded-[2rem] shadow-2xl"
            title="Ready to Transform Your Career?"
            subtitle="Join thousands of learners who are building their dream careers with AI-powered guidance."
            primaryBtn={{
              text: "Start Free Trial",
              icon: <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />,
              onClick: () => {}
            }}
            secondaryBtn={{
              text: "Book a Demo",
              onClick: () => {}
            }}
          >
            <p className="text-purple-100/90 text-sm mt-8 font-medium">
              No credit card required • 14-day free trial • Personalized onboarding
            </p>
          </SharedCTABanner>
        </div>

      </div>
    </div>
  );
}