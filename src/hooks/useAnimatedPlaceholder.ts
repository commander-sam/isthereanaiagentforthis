import { useState, useEffect, useCallback } from 'react';

const searchExamples = [
  "writing blog posts...",
  "analyzing data...",
  "coding assistance...",
  "image generation...",
  "research papers...",
  "task automation...",
  "content creation...",
  "language translation...",
  "video editing...",
  "social media management..."
];

export function useAnimatedPlaceholder() {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const animateText = useCallback(() => {
    const currentExample = searchExamples[currentIndex];
    const speed = isDeleting ? 50 : 100; // Faster deletion, slower typing
    const pauseDuration = 1500; // Pause duration at full text

    if (!isDeleting && currentText === currentExample) {
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return;
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % searchExamples.length);
      return;
    }

    const nextText = isDeleting
      ? currentText.slice(0, -1)
      : currentExample.slice(0, currentText.length + 1);

    setCurrentText(nextText);
  }, [currentText, isDeleting, currentIndex]);

  useEffect(() => {
    if (!isPaused) {
      const timeout = setTimeout(animateText, isDeleting ? 50 : 100);
      return () => clearTimeout(timeout);
    }
  }, [animateText, isDeleting, isPaused]);

  return currentText;
}