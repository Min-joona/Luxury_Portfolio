import { motion } from 'framer-motion';

const Skeleton = ({ type, darkMode }) => {
  const shimmer = {
    initial: { backgroundPosition: "-200px 0" },
    animate: {
      backgroundPosition: ["-200px 0", "200px 0"],
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    }
  };

  const baseClass = `relative overflow-hidden ${
    darkMode ? 'bg-chrome/10' : 'bg-slate-grey/10'
  }`;

  const shimmerStyle = {
    background: `linear-gradient(90deg, transparent, ${
      darkMode ? 'rgba(192, 192, 192, 0.1)' : 'rgba(100, 116, 139, 0.1)'
    }, transparent)`,
    backgroundSize: '200px 100%'
  };

  const renderSkeleton = () => {
    switch (type) {
      case 'project-card':
        return (
          <div className="h-full p-8 rounded-lg border border-chrome/10">
            <motion.div
              className={`${baseClass} h-4 w-24 mb-4`}
              variants={shimmer}
              initial="initial"
              animate="animate"
              style={shimmerStyle}
            />
            <motion.div
              className={`${baseClass} h-8 w-3/4 mb-3`}
              variants={shimmer}
              initial="initial"
              animate="animate"
              style={shimmerStyle}
            />
            <motion.div
              className={`${baseClass} h-4 w-full mb-2`}
              variants={shimmer}
              initial="initial"
              animate="animate"
              style={shimmerStyle}
            />
            <motion.div
              className={`${baseClass} h-4 w-5/6`}
              variants={shimmer}
              initial="initial"
              animate="animate"
              style={shimmerStyle}
            />
          </div>
        );
      case 'timeline-item':
        return (
          <div className="min-w-[300px]">
            <motion.div
              className={`${baseClass} h-16 w-32 mb-4`}
              variants={shimmer}
              initial="initial"
              animate="animate"
              style={shimmerStyle}
            />
            <motion.div
              className={`${baseClass} h-8 w-48 mb-2`}
              variants={shimmer}
              initial="initial"
              animate="animate"
              style={shimmerStyle}
            />
            <motion.div
              className={`${baseClass} h-4 w-36 mb-4`}
              variants={shimmer}
              initial="initial"
              animate="animate"
              style={shimmerStyle}
            />
            <motion.div
              className={`${baseClass} h-4 w-full mb-2`}
              variants={shimmer}
              initial="initial"
              animate="animate"
              style={shimmerStyle}
            />
            <motion.div
              className={`${baseClass} h-4 w-4/5`}
              variants={shimmer}
              initial="initial"
              animate="animate"
              style={shimmerStyle}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return renderSkeleton();
};

export default Skeleton;