"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [isHovering, setIsHovering] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const testimonials = [
    {
      quote:
        "I didn't know how tired I was until Lumina helped me stop pretending.",
      author: "Gideon M., Director of Ethics",
    },
    {
      quote: "My staff are more compliant—er, content—than ever.",
      author: "Sam D., Founder & Visionary",
    },
    {
      quote: "purr",
      author: "The Assistant",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, testimonials.length]);

  const handlePurr = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.03; // Set volume to 50%
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
      {/* Hidden audio element for purr sound */}
      <audio ref={audioRef} src="/purr.mp3" preload="auto" />

      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
            <h1 className="text-2xl font-light tracking-tight">
              FutureThought
            </h1>
            <p className="text-sm text-slate-500 italic">
              "Because genius deserves to rest."
            </p>
          </div>
          <nav className="flex space-x-6">
            {["About", "Solutions", "Assistant™", "Careers", "Login"].map(
              (item) => (
                <Link
                  key={item}
                  href="https://medium.com/@nibblesnbits/the-sleeping-mind-virus-ef3b67e2ce1e"
                  className="text-sm hover:text-slate-600 transition-colors duration-300"
                >
                  {item}
                </Link>
              )
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative pt-32 pb-20 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60" // Increased opacity
        >
          <source src="/ad.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for slight dimming - reduced opacity */}
        <div className="absolute top-0 left-0 w-full h-full bg-white/20 backdrop-blur-sm z-0" />

        {/* Hero Content */}
        <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-light max-w-3xl mx-auto leading-tight mb-12 z-10">
          "You've worked hard enough. Let Lumina do the thinking."
        </h2>

        <div className="relative z-10">
          <Button
            className="bg-white text-slate-800 hover:bg-white/90 border border-slate-200 rounded-full px-8 py-6 text-lg font-light tracking-wide shadow-md transition-all duration-500"
            onMouseEnter={() => {
              setIsHovering(true);
              handlePurr();
            }}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => {
              window.location.href =
                "https://medium.com/@nibblesnbits/the-sleeping-mind-virus-ef3b67e2ce1e";
            }}
          >
            GET STARTED
          </Button>

          {/* Pulsing orb */}
          <div
            className={cn(
              "absolute -z-10 rounded-full bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 opacity-70 blur-xl transition-all duration-[4000ms]",
              isHovering
                ? "w-40 h-40 -top-12 -left-12"
                : "w-32 h-32 -top-8 -left-8"
            )}
            style={{
              animation: "pulse 8s infinite ease-in-out",
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "NeuralFlow Integration™",
                description: "Feel understood before you even ask.",
              },
              {
                title: "Emotional Smoothing",
                description:
                  "Eliminate anxiety at the source: unpredictability.",
              },
              {
                title: "SleepSync",
                description: "Your dreams, curated.",
              },
              {
                title: "Companion Mode",
                description: "Because sometimes you just need a soft presence.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-6 border-slate-100 hover:border-slate-200 transition-all duration-500 hover:shadow-md"
              >
                <h3 className="text-xl font-light mb-2">{feature.title}</h3>
                <p className="text-slate-500">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative bg-white rounded-lg p-10 shadow-sm border border-slate-100">
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-8 w-8"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="min-h-[120px] flex flex-col items-center justify-center">
              <p className="text-xl md:text-2xl font-light italic text-center mb-6">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <p className="text-sm text-slate-500">
                – {testimonials[currentTestimonial].author}
              </p>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentTestimonial === index
                      ? "bg-slate-400"
                      : "bg-slate-200"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Teaser Ad */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative overflow-hidden rounded-lg aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
            <iframe
              className="w-full h-full rounded-lg z-10"
              src="https://www.youtube.com/embed/flDmKPSQRTQ?rel=0&modestbranding=1"
              title="Lumina Teaser Ad"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              "Terms of Harmony",
              "Anti-Disruption Policy",
              "Nest Mode (Beta)",
              "Careers in Emotional Optimization",
              "Report a Resistance Node",
            ].map((item, index) => (
              <div key={index} className="flex justify-center md:justify-start">
                <Link
                  href="https://medium.com/@nibblesnbits/the-sleeping-mind-virus-ef3b67e2ce1e"
                  className={cn(
                    "text-sm hover:text-slate-300 transition-colors duration-300",
                    index === 4 && "text-red-300 hover:text-red-200"
                  )}
                >
                  {index === 4 ? `[${item}]` : item}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-xs text-slate-600">
            <p>
              © {new Date().getFullYear()}{" "}
              <a href="https://junothreadborne.me" className="text-slate-400">
                Juno Threadborne
              </a>
              . All thoughts curated.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
