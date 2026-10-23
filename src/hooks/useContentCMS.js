import { useState, useEffect } from 'react';
import { getContentCMS, subscribeContentCMS, saveContentCMS } from '../services/contentCMS';

export function useContentCMS() {
  const [content, setContent] = useState(getContentCMS());

  useEffect(() => {
    // Initial fetch
    setContent(getContentCMS());
    // Subscribe to live broadcast updates
    const unsubscribe = subscribeContentCMS((updated) => {
      setContent(updated);
    });
    return () => unsubscribe();
  }, []);

  const updateSection = (sectionKey, updatedValues, auditMessage) => {
    const next = {
      ...content,
      [sectionKey]: {
        ...(content[sectionKey] || {}),
        ...updatedValues
      }
    };
    saveContentCMS(next, auditMessage || `Updated ${sectionKey}`);
  };

  return { content, setContent, updateSection };
}

export default useContentCMS;
