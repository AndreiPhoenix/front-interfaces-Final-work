
export const generateUniqueId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatAriaLabel = (label: string, context?: string): string => {
  return context ? `${label} - ${context}` : label;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unexpected error occurred';
};

// Keyboard navigation helpers
export const handleKeyboardActivation = (
  event: React.KeyboardEvent,
  action: () => void,
  keys: string[] = ['Enter', ' ']
) => {
  if (keys.includes(event.key)) {
    event.preventDefault();
    action();
  }
};

// Focus management
export const focusElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.focus();
  }
};

// Announce to screen readers
export const announceToScreenReader = (
  message: string,
  politeness: 'polite' | 'assertive' = 'polite'
) => {
  const announcementElement = document.createElement('div');
  announcementElement.setAttribute('role', 'status');
  announcementElement.setAttribute('aria-live', politeness);
  announcementElement.setAttribute('aria-atomic', 'true');
  announcementElement.classList.add('sr-only');
  announcementElement.textContent = message;
  
  document.body.appendChild(announcementElement);
  
  setTimeout(() => {
    document.body.removeChild(announcementElement);
  }, 1000);
};