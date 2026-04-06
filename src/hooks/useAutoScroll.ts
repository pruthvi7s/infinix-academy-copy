
"use client";

import { useEffect, useRef, useCallback } from 'react';
import { type FieldValues } from 'react-hook-form';

/**
 * A hook to automatically scroll to the next unanswered question in a form.
 * @param watchedValues - The object of form values from react-hook-form's `watch()`.
 * @param allQuestionIds - An array of all question IDs in the order they appear.
 */
export function useAutoScroll(watchedValues: FieldValues, allQuestionIds: string[]) {
  const prevValuesRef = useRef(watchedValues);
  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Memoize the handler to prevent re-creating it on every render
  const handleUserScroll = useCallback(() => {
    isUserScrolling.current = true;
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      isUserScrolling.current = false;
    }, 1500); // User is "active" for 1.5 seconds after a scroll
  }, []);
  
  // Add and clean up the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleUserScroll);
    return () => {
      window.removeEventListener('scroll', handleUserScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleUserScroll]);

  useEffect(() => {
    const prevValues = prevValuesRef.current;
    
    // Find the question that was just answered
    const changedKey = allQuestionIds.find(key => prevValues[key] !== watchedValues[key] && watchedValues[key]);

    if (changedKey && !isUserScrolling.current) {
      const lastAnsweredIndex = allQuestionIds.indexOf(changedKey);
      
      // Find the next unanswered question
      let nextUnansweredIndex = -1;
      for (let i = lastAnsweredIndex + 1; i < allQuestionIds.length; i++) {
        if (!watchedValues[allQuestionIds[i]]) {
          nextUnansweredIndex = i;
          break;
        }
      }

      if (nextUnansweredIndex !== -1) {
        const nextQuestionId = allQuestionIds[nextUnansweredIndex];
        const nextElement = document.querySelector(`[data-question-id="${nextQuestionId}"]`);
        
        if (nextElement) {
          setTimeout(() => {
            // Re-check for user scrolling right before we scroll
             if (!isUserScrolling.current) {
                nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
             }
          }, 100); // Small delay to let the UI update
        }
      }
    }

    // Update the ref for the next render
    prevValuesRef.current = watchedValues;
  }, [watchedValues, allQuestionIds]);
}
