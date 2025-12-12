"use client";

import { SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

export default function LoginPage() {
  const { t } = useLanguage();
  const [particles, setParticles] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    // Create floating particles
    const particleElements = Array.from({ length: 9 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${(i + 1) * 10}%`,
          animationDelay: `${i * 2}s`,
        }}
      />
    ));
    setParticles(particleElements);
  }, []);

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        {/* Floating particles background */}
        <div className="particles fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
          {particles}
        </div>

        {/* Main content */}
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Language Selector */}
            <div className="absolute top-4 right-4 z-50">
              <LanguageSelector />
            </div>
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "var(--soft-gold)",
                    animation: "sparkle 3s ease-in-out infinite",
                  }}
                />
                <h1
                  className="text-3xl font-medium tracking-tight"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t.common.appName}
                </h1>
              </div>
              <p
                className="text-base font-light"
                style={{ color: "var(--text-light)" }}
              >
                {t.landing.hero.badge}
              </p>
            </div>

            {/* Login card with glass morphism */}
            <div
              className="glass p-8 animate-breathe"
              style={{
                animation: "breathe 8s ease-in-out infinite",
              }}
            >
              <div className="mb-6 text-center">
                <h2
                  className="text-2xl font-medium mb-2"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t.login.title}
                </h2>
                <p
                  className="text-sm font-light"
                  style={{ color: "var(--text-light)" }}
                >
                  {t.login.subtitle}
                </p>
              </div>

              {/* Clerk SignIn component with custom styling */}
              <div className="clerk-sign-in">
                <SignIn
                  appearance={{
                    elements: {
                      rootBox: "mx-auto",
                      card: "bg-transparent shadow-none border-none",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton:
                        "bg-white/40 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 text-sm font-normal transition-all duration-300 hover:bg-white/60 hover:translate-y-[-2px] hover:shadow-lg",
                      socialButtonsBlockButtonText:
                        "text-[var(--text-primary)] font-normal",
                      formButtonPrimary:
                        "bg-[var(--sage)] hover:bg-[var(--sage-dark)] text-white rounded-full px-6 py-3 text-sm font-normal transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg",
                      formFieldInput:
                        "bg-white/40 backdrop-blur-md border border-white/30 rounded-full px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-light)] focus:bg-white/60 focus:border-[var(--sage)] focus:outline-none transition-all duration-300",
                      formFieldLabel:
                        "text-[var(--text-secondary)] text-sm font-normal mb-2",
                      footerActionLink:
                        "text-[var(--sage)] hover:text-[var(--sage-dark)] font-normal transition-colors",
                      identityPreviewText:
                        "text-[var(--text-primary)] font-normal",
                      identityPreviewEditButton:
                        "text-[var(--sage)] hover:text-[var(--sage-dark)]",
                      dividerLine: "bg-[var(--glass-border)]",
                      dividerText: "text-[var(--text-light)] text-sm font-light",
                      formResendCodeLink:
                        "text-[var(--sage)] hover:text-[var(--sage-dark)] font-normal",
                      alertText: "text-[var(--text-primary)] text-sm",
                      formHeaderTitle:
                        "text-[var(--text-primary)] font-medium text-xl",
                      formHeaderSubtitle:
                        "text-[var(--text-light)] text-sm font-light",
                    },
                    layout: {
                      socialButtonsPlacement: "top",
                      showOptionalFields: false,
                    },
                  }}
                  routing="path"
                  path="/login"
                  signUpUrl="/register"
                />
              </div>
            </div>

            {/* Footer text */}
            <p
              className="text-center mt-6 text-sm font-light"
              style={{ color: "var(--text-light)" }}
            >
              {t.login.newToApp}{" "}
              <a
                href="/register"
                className="font-normal transition-colors hover:underline"
                style={{ color: "var(--sage)" }}
              >
                {t.login.createAccount}
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--soft-gold);
          border-radius: 50%;
          opacity: 0.3;
          animation: float 20s infinite linear;
        }

        .animate-breathe {
          animation: breathe 8s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px) translateX(100px);
            opacity: 0;
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            backdrop-filter: blur(20px);
          }
          50% {
            transform: scale(1.02);
            backdrop-filter: blur(25px);
          }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.5; transform: rotate(0deg); }
          50% { opacity: 1; transform: rotate(180deg); }
        }

        /* Override Clerk's default styles */
        .clerk-sign-in {
          --clerk-primary-color: var(--sage);
        }

        .clerk-sign-in [data-clerk-element="card"] {
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
        }

        /* Hide header on login page */
        body > header {
          display: none;
        }
      `}</style>
    </>
  );
}

