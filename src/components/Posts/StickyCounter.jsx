import { useEffect, useState } from 'react';

export const DataCount = ({ label, count }) => {
    return (
      <div data-count={count} data-counter={label} />
    )
  }

export const StickyCounter = ({ counters }) => {
  const [currentCounts, setCurrentCounts] = useState(
    counters.reduce((acc, counter) => {
      acc[counter.label] = 0;
      return acc;
    }, {})
  );
  const triggerPercentage = 80;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * (triggerPercentage / 100);
      
      const newCounts = {};
      
      counters.forEach(counter => {
        const elements = document.querySelectorAll(`[data-counter="${counter.label}"]`);
        let count = 0;
        
        elements.forEach(element => {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          
          if (elementTop <= scrollPosition) {
            count = Math.max(count, parseFloat(element.getAttribute('data-count') || '0'));
          }
        });
        
        newCounts[counter.label] = count;
      });
      
      setCurrentCounts(newCounts);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [counters, triggerPercentage]);

  if (Object.values(currentCounts).every(count => count === 0)) {
    return null;
  }
  
  return (
    <div className={`fixed right-0 bottom-0 items-stretch ${isVisible ? 'translate-x-0' : 'hidden-counter'} overflow-hidden z-50 flex bg-gray-900 border-l border-t border-b border-green rounded-l-lg shadow-lg min-w-[200px] transition-transform duration-300 ease-in-out`}>
        <style>
            {`
                .hidden-counter {
                    transform: translateX(calc(100% - 35px));
                }
            `}
        </style>
        <button
            onClick={() => setIsVisible(!isVisible)}
            className={`z-50 w-[35px] bg-green border-r border-green p-2 shadow-lg hover:bg-gray-800 transition-all duration-300 ease-in-out flex items-center justify-center`}
            title={isVisible ? "Hide counters" : "Show counters"}
        >
            <svg className={`w-4 h-4 text-white transition-transform duration-300 ${isVisible ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <div className="px-4 py-2">
            {/* Counters */}
            <div className="space-y-2">
            {counters.filter(counter => !counter.hidden || currentCounts[counter.label] > 0).map(counter => (
                <div key={counter.label} className="flex items-center gap-2">
                <span className="font-bold text-xl text-green">
                    {currentCounts[counter.label] || 0}
                </span>
                <span className="text-white text-sm">{counter.label}</span>
                </div>
            ))}
            </div>
        </div>
    </div>
  );
};
