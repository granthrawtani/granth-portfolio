'use client';

import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 300], [1, 0]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Handle drag to close
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 150) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/5 backdrop-blur-sm z-40"
          />

          {/* Bottom Sheet Panel */}
          <motion.div
            initial={{ translateY: '100%' }}
            animate={{ translateY: 0 }}
            exit={{ translateY: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 140,
              damping: 22,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ y, opacity }}
            className="fixed bottom-0 left-0 right-0 h-[88vh] bg-white rounded-t-3xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Drag Handle */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="h-full overflow-y-auto pt-12 px-8 pb-8">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
