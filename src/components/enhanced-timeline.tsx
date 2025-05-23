'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface TimelineEvent {
  title: string;
  subtitle: string;
  description: string;
  date?: string;
  icon?: React.ReactNode;
}

interface EnhancedTimelineProps {
  events: TimelineEvent[];
}

export default function EnhancedTimeline({ events }: EnhancedTimelineProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative max-w-4xl mx-auto" ref={ref}>
      {/* Timeline Line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 transform md:-translate-x-1/2"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10"
      >
        {events.map((event, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`relative flex flex-col md:flex-row items-start mb-16 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-primary shadow-glow transform -translate-x-1/2 md:-translate-x-1/2 z-10">
              <div className="absolute inset-1 rounded-full bg-background animate-pulse"></div>
            </div>
            
            {/* Content Card */}
            <div 
              className={`ml-10 md:ml-0 md:w-5/12 ${
                index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
              }`}
            >
              <div className="bg-card hover:bg-card/80 p-6 rounded-lg shadow-lg border border-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Date Badge */}
                {event.date && (
                  <div className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                    {event.date}
                  </div>
                )}
                
                {/* Title */}
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {event.title}
                </h3>
                
                {/* Subtitle */}
                <p className="text-muted-foreground mb-3">{event.subtitle}</p>
                
                {/* Description */}
                <p className="text-foreground/80">{event.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
