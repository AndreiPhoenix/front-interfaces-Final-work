
import { 
  validateEmail, 
  validatePassword, 
  validateUsername, 
  validateTemplateTitle 
} from '@/lib/validators';

describe('Validators', () => {
  describe('validateEmail', () => {
    it('should return error for empty email', () => {
      expect(validateEmail('')).toBe('Email is required');
    });

    it('should return error for invalid email format', () => {
      expect(validateEmail('invalid-email')).toBe('Invalid email format');
    });

    it('should return null for valid email', () => {
      expect(validateEmail('test@example.com')).toBeNull();
    });
  });

  describe('validatePassword', () => {
    it('should return error for empty password', () => {
      expect(validatePassword('')).toBe('Password is required');
    });

    it('should validate password length', () => {
      expect(validatePassword('Ab1')).toBe('Password must be at least 8 characters');
    });

    it('should require uppercase letter', () => {
      expect(validatePassword('password123')).toBe('Password must contain an uppercase letter');
    });

    it('should accept valid password', () => {
      expect(validatePassword('Password123')).toBeNull();
    });
  });

  describe('validateUsername', () => {
    it('should return error for empty username', () => {
      expect(validateUsername('')).toBe('Username is required');
    });

    it('should accept valid username', () => {
      expect(validateUsername('john_doe123')).toBeNull();
    });

    it('should reject special characters', () => {
      expect(validateUsername('john@doe')).toBe('Username can only contain letters, numbers, and underscores');
    });
  });

  describe('validateTemplateTitle', () => {
    it('should return error for empty title', () => {
      expect(validateTemplateTitle('')).toBe('Title is required');
    });

    it('should accept valid title', () => {
      expect(validateTemplateTitle('My Template')).toBeNull();
    });
  });
});