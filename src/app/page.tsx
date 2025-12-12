"use client";

import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

export default function Home() {
  const { t } = useLanguage();
  return (
    <>
      {/* Language Selector */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      {/* Hero Section */}
      <section className="pt-16 relative overflow-hidden">
        <div className="max-w-[120rem] mx-auto relative">
          <div className="container px-5 mx-auto sm:px-7">
            <div className="max-w-[800px] mx-auto">
              <div className="text-center pb-16">
                <div className="rounded-full mb-6 max-w-fit mx-auto bg-linear-to-r from-[#FF58D580] to-[#4E6EFF80] p-0.5">
                  <div className="bg-white py-2 text-sm items-center gap-2 px-5 inline-flex rounded-full">
                    <span>✨</span>
                    <p>{t.landing.hero.badge}</p>
                  </div>
                </div>

                <h1 className="text-gray-700 mx-auto font-bold mb-4 text-4xl sm:text-[50px] sm:leading-[64px] max-w-[700px]">
                  {t.landing.hero.title}
                </h1>
                <p className="max-w-[537px] text-center mx-auto text-gray-500 text-base">
                  {t.landing.hero.description}
                </p>

                <div className="mt-9 flex sm:flex-row flex-col gap-3 relative z-30 items-center justify-center">
                  <SignedOut>
                    <SignUpButton mode="modal">
                      <button 
                        className="transition h-12 inline-flex items-center justify-center px-6 py-3 rounded-full text-white text-sm"
                        style={{
                          background: "linear-gradient(135deg, #7A8A76, #B8952F)",
                        }}
                      >
                        {t.common.getStarted}
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <Link
                      href="/dashboard"
                      className="transition h-12 inline-flex items-center justify-center px-6 py-3 rounded-full text-white text-sm"
                      style={{
                        background: "linear-gradient(135deg, #4A5D49, #7A8A76)",
                      }}
                    >
                      {t.common.goToDashboard}
                    </Link>
                  </SignedIn>
                  <button className="rounded-full video-popup flex h-12 gap-3 items-center text-sm border bg-white border-gray-100 p-1.5 pr-6 text-gray-700">
                    <span 
                      className="size-9 rounded-full inline-flex items-center justify-center text-sm font-medium"
                      style={{
                        background: "linear-gradient(135deg, #7A8A76, #B8952F)",
                      }}
                    >
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.5 3.71077L3.5 12.3482C3.5 13.5211 4.78545 14.2402 5.78489 13.6265L12.8183 9.30776C13.7717 8.7223 13.7717 7.33672 12.8183 6.75125L5.7849 2.43251C4.78545 1.81882 3.5 2.53795 3.5 3.71077Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    {t.common.watchDemo}
                  </button>
                </div>
              </div>
            </div>
            <div className="max-w-[1000px] mx-auto relative">
              <div className="p-3 sm:p-[18px] relative z-30 rounded-[32px] border border-white/30 bg-white/20">
                <div className="w-full rounded-2xl block bg-gradient-to-br from-[#E6B8A2] via-[#B8952F] to-[#7A8A76] p-12 min-h-[400px] flex items-center justify-center">
                  <div className="grid md:grid-cols-3 gap-6 w-full">
                    {[
                      {
                        name: "Grandma Rose",
                        relationship: "Beloved Grandmother",
                        gradient: "linear-gradient(135deg, #E6B8A2, #B8952F)",
                      },
                      {
                        name: "Uncle Marcus",
                        relationship: "Family Storyteller",
                        gradient: "linear-gradient(135deg, #7A8A76, #E6B8A2)",
                      },
                      {
                        name: "Dad",
                        relationship: "My Hero",
                        gradient: "linear-gradient(135deg, #B8952F, #7A8A76)",
                      },
                    ].map((memory, i) => (
                      <div
                        key={i}
                        className="text-center p-6 rounded-2xl bg-white/90 backdrop-blur-sm"
                      >
                        <div
                          className="w-20 h-20 rounded-full mx-auto mb-4"
                          style={{
                            background: memory.gradient,
                          }}
                        />
                        <h3 className="font-medium mb-1 text-gray-800">
                          {memory.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {memory.relationship}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-30 bg-gray-50 px-5">
        <div className="max-w-[72rem] mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-bold text-gray-800 text-3xl md:text-title-lg max-w-xl mx-auto">
              {t.landing.features.title}
            </h2>

            <p className="max-w-xl mx-auto leading-6 text-gray-500">
              {t.landing.features.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: "🎙️",
                title: t.landing.features.voiceCloning.title,
                description: t.landing.features.voiceCloning.description,
              },
              {
                icon: "💬",
                title: t.landing.features.conversations.title,
                description: t.landing.features.conversations.description,
              },
              {
                icon: "📸",
                title: t.landing.features.memoryCreation.title,
                description: t.landing.features.memoryCreation.description,
              },
              {
                icon: "🤖",
                title: t.landing.features.aiAvatars.title,
                description: t.landing.features.aiAvatars.description,
              },
              {
                icon: "🔍",
                title: t.landing.features.memoryExploration.title,
                description: t.landing.features.memoryExploration.description,
              },
              {
                icon: "🔒",
                title: t.landing.features.privacy.title,
                description: t.landing.features.privacy.description,
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-9 border border-gray-200 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]"
              >
                <div className="text-4xl mb-9">{feature.icon}</div>

                <h3 className="mb-4 text-gray-800 font-bold text-xl md:text-2xl">
                  {feature.title}
                </h3>
                <p className="text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-14 md:py-28">
        <div className="container px-5 mx-auto sm:px-7">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <h2 className="mb-3 font-bold text-center text-gray-800 text-3xl md:text-title-lg">
              {t.landing.howItWorks.title}
            </h2>
            <p className="max-w-2xl mx-auto leading-6 text-gray-500">
              {t.landing.howItWorks.subtitle}
            </p>
          </div>

          <div className="max-w-[1008px] mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-[20px] border border-gray-200">
              <div className="grid md:grid-cols-5 gap-6">
                {[
                  { step: "1", title: t.landing.howItWorks.step1.title, desc: t.landing.howItWorks.step1.description },
                  { step: "2", title: t.landing.howItWorks.step2.title, desc: t.landing.howItWorks.step2.description },
                  { step: "3", title: t.landing.howItWorks.step3.title, desc: t.landing.howItWorks.step3.description },
                  { step: "4", title: t.landing.howItWorks.step4.title, desc: t.landing.howItWorks.step4.description },
                  { step: "5", title: t.landing.howItWorks.step5.title, desc: t.landing.howItWorks.step5.description },
                ].map((step, i) => (
                  <div key={i} className="text-center">
                    <div 
                      className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-lg font-medium text-white"
                      style={{
                        background: "linear-gradient(135deg, #7A8A76, #B8952F)",
                      }}
                    >
                      {step.step}
                    </div>
                    <h4 className="font-medium mb-2 text-sm text-gray-800">
                      {step.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 md:py-28">
        <div className="container px-5 mx-auto sm:px-7">
          <div className="max-w-4xl mx-auto">
            <div 
              className="p-12 md:p-16 rounded-[20px] text-center"
              style={{
                background: "linear-gradient(135deg, #7A8A76, #B8952F, #E6B8A2)",
              }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {t.landing.cta.title}
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                {t.landing.cta.description}
              </p>
              <SignedOut>
                <SignUpButton mode="modal">
                  <button 
                    className="px-10 py-5 rounded-full text-lg font-medium bg-white hover:bg-gray-50 transition-colors"
                    style={{ color: "#4A5D49" }}
                  >
                    {t.common.getStarted}
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="inline-block px-10 py-5 rounded-full text-lg font-medium bg-white hover:bg-gray-50 transition-colors"
                  style={{ color: "var(--sage-dark)" }}
                >
                  {t.common.goToDashboard}
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .text-title-lg {
          font-size: 44px;
          line-height: 52px;
        }

        @media (max-width: 768px) {
          .text-title-lg {
            font-size: 32px;
            line-height: 40px;
          }
        }
      `}</style>
    </>
  );
}
