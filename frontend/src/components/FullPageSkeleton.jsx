import { motion } from 'framer-motion';

const SkeletonPulse = ({ darkMode, className, delay = 0 }) => {
  return (
    <motion.div
      className={`${className} ${
        darkMode 
          ? 'bg-white/5' 
          : 'bg-[#1a1410]/5'
      }`}
      initial={{ opacity: 0.4 }}
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: delay 
      }}
    />
  );
};

const FullPageSkeleton = ({ darkMode }) => {
  return (
    <div className={`min-h-screen ${
      darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]'
    }`}>
      {/* Header Skeleton */}
      <header className={`fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-7xl z-50 px-8 py-4 rounded-xl border backdrop-blur-xl ${
        darkMode ? 'bg-[#1a1410]/80 border-white/10' : 'bg-[#e8ddd4]/80 border-[#1a1410]/10'
      }`}>
        <nav className="flex justify-between items-center">
          <SkeletonPulse darkMode={darkMode} className="w-20 h-5 rounded" />
          <div className="hidden md:flex gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonPulse key={i} darkMode={darkMode} className="w-14 h-3 rounded" delay={i * 0.1} />
            ))}
          </div>
          <SkeletonPulse darkMode={darkMode} className="w-24 h-8 rounded-full" delay={0.5} />
        </nav>
      </header>

      <main className="pt-32">
        {/* Hero Skeleton */}
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column */}
              <div className="space-y-8">
                <SkeletonPulse darkMode={darkMode} className="w-40 h-3 rounded" />
                <div className="space-y-2">
                  <SkeletonPulse darkMode={darkMode} className="w-48 h-20 rounded" delay={0.1} />
                  <SkeletonPulse darkMode={darkMode} className="w-40 h-20 rounded" delay={0.15} />
                </div>
                <div className="space-y-2 max-w-md">
                  <SkeletonPulse darkMode={darkMode} className="w-full h-3 rounded" delay={0.2} />
                  <SkeletonPulse darkMode={darkMode} className="w-4/5 h-3 rounded" delay={0.25} />
                </div>
                <div className="flex gap-4 pt-4">
                  <SkeletonPulse darkMode={darkMode} className="w-32 h-12 rounded" delay={0.3} />
                  <SkeletonPulse darkMode={darkMode} className="w-32 h-12 rounded" delay={0.35} />
                </div>
              </div>

              {/* Right Column - Image */}
              <SkeletonPulse darkMode={darkMode} className="w-full h-[400px] lg:h-[500px] rounded-2xl" delay={0.2} />
            </div>
          </div>
        </section>

        {/* Projects Skeleton */}
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <SkeletonPulse darkMode={darkMode} className="w-24 h-3 rounded mb-4" />
              <SkeletonPulse darkMode={darkMode} className="w-48 h-14 rounded mb-6" delay={0.1} />
              <SkeletonPulse darkMode={darkMode} className="w-96 h-4 rounded" delay={0.15} />
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <SkeletonPulse darkMode={darkMode} className="w-full aspect-[4/3] rounded-xl" delay={i * 0.1} />
                  <SkeletonPulse darkMode={darkMode} className="w-24 h-3 rounded" delay={i * 0.1 + 0.05} />
                  <SkeletonPulse darkMode={darkMode} className="w-3/4 h-6 rounded" delay={i * 0.1 + 0.1} />
                  <SkeletonPulse darkMode={darkMode} className="w-full h-3 rounded" delay={i * 0.1 + 0.15} />
                  <SkeletonPulse darkMode={darkMode} className="w-1/2 h-px" delay={i * 0.1 + 0.2} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Skeleton */}
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <SkeletonPulse darkMode={darkMode} className="w-24 h-3 rounded mb-4" />
              <SkeletonPulse darkMode={darkMode} className="w-48 h-14 rounded" delay={0.1} />
            </div>

            {/* Timeline Items */}
            <div className="relative h-64 overflow-hidden">
              <SkeletonPulse darkMode={darkMode} className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2" />
              <div className="flex items-center gap-16 pt-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`flex-shrink-0 w-[220px] ${i % 2 === 0 ? '-mt-24' : 'mt-24'}`}>
                    <SkeletonPulse darkMode={darkMode} className="w-full h-40 rounded-xl mb-4" delay={i * 0.15} />
                    <div className="absolute left-0 right-0 top-1/2 flex justify-around">
                      <SkeletonPulse darkMode={darkMode} className="w-3 h-3 rounded-full" delay={i * 0.15 + 0.1} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blogs Skeleton */}
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <SkeletonPulse darkMode={darkMode} className="w-28 h-3 rounded mb-4" />
              <SkeletonPulse darkMode={darkMode} className="w-32 h-14 rounded mb-6" delay={0.1} />
              <SkeletonPulse darkMode={darkMode} className="w-80 h-4 rounded" delay={0.15} />
            </div>

            {/* Featured Blog */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 rounded-2xl border mb-12">
              <SkeletonPulse darkMode={darkMode} className="w-full aspect-[16/10] rounded-xl" />
              <div className="space-y-4">
                <div className="flex gap-4">
                  <SkeletonPulse darkMode={darkMode} className="w-20 h-3 rounded" />
                  <SkeletonPulse darkMode={darkMode} className="w-20 h-3 rounded" delay={0.1} />
                </div>
                <SkeletonPulse darkMode={darkMode} className="w-3/4 h-10 rounded" delay={0.15} />
                <SkeletonPulse darkMode={darkMode} className="w-full h-4 rounded" delay={0.2} />
                <SkeletonPulse darkMode={darkMode} className="w-4/5 h-4 rounded" delay={0.25} />
                <SkeletonPulse darkMode={darkMode} className="w-24 h-4 rounded" delay={0.3} />
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-3">
                  <SkeletonPulse darkMode={darkMode} className="w-full aspect-[16/10] rounded-xl" delay={i * 0.1} />
                  <div className="flex gap-2">
                    <SkeletonPulse darkMode={darkMode} className="w-16 h-2 rounded" delay={i * 0.1 + 0.05} />
                    <SkeletonPulse darkMode={darkMode} className="w-16 h-2 rounded" delay={i * 0.1 + 0.1} />
                  </div>
                  <SkeletonPulse darkMode={darkMode} className="w-3/4 h-5 rounded" delay={i * 0.1 + 0.15} />
                  <SkeletonPulse darkMode={darkMode} className="w-full h-3 rounded" delay={i * 0.1 + 0.2} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Skeleton */}
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left */}
              <div className="space-y-6">
                <SkeletonPulse darkMode={darkMode} className="w-24 h-3 rounded" />
                <SkeletonPulse darkMode={darkMode} className="w-48 h-14 rounded" delay={0.1} />
                <SkeletonPulse darkMode={darkMode} className="w-full h-4 rounded" delay={0.15} />
                <SkeletonPulse darkMode={darkMode} className="w-4/5 h-4 rounded" delay={0.2} />
                <div className="space-y-4 pt-6">
                  <div className="flex gap-4 items-center">
                    <SkeletonPulse darkMode={darkMode} className="w-10 h-10 rounded-full" delay={0.25} />
                    <SkeletonPulse darkMode={darkMode} className="w-40 h-4 rounded" delay={0.3} />
                  </div>
                  <div className="flex gap-4 items-center">
                    <SkeletonPulse darkMode={darkMode} className="w-10 h-10 rounded-full" delay={0.35} />
                    <SkeletonPulse darkMode={darkMode} className="w-32 h-4 rounded" delay={0.4} />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  {[1, 2, 3].map((i) => (
                    <SkeletonPulse key={i} darkMode={darkMode} className="w-10 h-10 rounded-full" delay={0.4 + i * 0.1} />
                  ))}
                </div>
              </div>

              {/* Right - Form */}
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-3">
                    <SkeletonPulse darkMode={darkMode} className="w-16 h-3 rounded" delay={i * 0.1} />
                    <SkeletonPulse darkMode={darkMode} className="w-full h-12 rounded" delay={i * 0.1 + 0.05} />
                  </div>
                ))}
                <SkeletonPulse darkMode={darkMode} className="w-full h-14 rounded mt-8" delay={0.5} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Skeleton */}
      <footer className="py-8 px-6 lg:px-12 border-t">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <SkeletonPulse darkMode={darkMode} className="w-48 h-3 rounded" />
          <SkeletonPulse darkMode={darkMode} className="w-16 h-px" delay={0.1} />
          <SkeletonPulse darkMode={darkMode} className="w-32 h-3 rounded" delay={0.2} />
        </div>
      </footer>
    </div>
  );
};

export default FullPageSkeleton;
