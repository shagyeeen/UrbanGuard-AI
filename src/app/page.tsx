'use client'

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IntroSplash } from '@/components/visuals/IntroSplash';
import Dashboard from './dashboard/page';
import { EmergencyOverlay } from '@/components/visuals/EmergencyOverlay';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence mode='wait'>
        {showSplash ? (
          <IntroSplash key="splash" onFinish={() => setShowSplash(false)} />
        ) : (
          <div key="content" className="w-full">
            <Dashboard />
          </div>
        )}
      </AnimatePresence>
      <EmergencyOverlay />
    </>
  );
}
