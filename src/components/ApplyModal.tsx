import React from 'react';
import { X } from 'lucide-react';
import { ApplySection } from './ApplySection';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourseId?: string;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  preselectedCourseId
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-colors cursor-pointer"
          aria-label="Close Registration Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1">
          <ApplySection 
            preselectedCourseId={preselectedCourseId}
            isModal={true}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};
