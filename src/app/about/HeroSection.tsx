// Hero.Section.tsx
import React from "react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
  <section className="relative w-full h-screen flex items-center justify-center bg-[#1a1a1a] overflow-hidden px-4">
      {/* Decorative Stars */}
      <span className="absolute top-20 left-10 text-yellow-400 text-2xl">✨</span>

          <Image
            src="/images/about/doctor.jpeg"
            alt="Doctor"
            width={160}
            height={160}
            className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 object-cover rounded-lg shadow-lg"
            priority
          />
          <Image
            src="/images/about/team.jpeg"
            alt="Researcher"
            width={128}
            height={128}
            className="absolute top-1/3 left-10 w-32 h-32 object-cover rounded-lg shadow-lg"
            priority
          />
          <Image
            src="/images/about/engineer.jpeg"
            alt="Engineer"
            width={144}
            height={144}
            className="absolute bottom-40 left-1/4 w-36 h-36 object-cover rounded-lg shadow-lg"
            priority
          />
          <Image
            src="/images/about/city.jpeg"
            alt="City"
            width={144}
            height={144}
            className="absolute bottom-20 right-20 w-36 h-36 object-cover rounded-lg shadow-lg"
            priority
          />
          <Image
            src="/images/about/researcher.jpeg"
            alt="Researcher"
            width={144}
            height={144}
            className="absolute top-1/3 right-10 -translate-y-1/2 w-36 h-36 object-cover rounded-lg shadow-lg"
            priority
          />

      {/* Central Text */}
      <div className="text-center max-w-2xl z-10">
  <h1 className="text-3xl md:text-5xl font-bold text-white leading-snug">
          The place where{" "}
          <span className="text-pink-600">seamless relocation</span> meets{" "}
          <span className="text-purple-600">endless possibilities</span>.
        </h1>
        <div className="mt-4 border-b-4 border-yellow-300 w-24 mx-auto"></div>
      </div>
    </section>
  );
};

export default HeroSection;
