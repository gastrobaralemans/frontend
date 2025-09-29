import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useForgotPasswordStore = create(
  persist(
    (set, get) => ({
      email: '',
      code: '',
      step: 'codeMail',
      setMail: (email) => set({ email }),
      setCode: (code) => set({ code }),
      setStep: (step) => set({ step }),
      reset: () => set({ email: '', code: '', step: 'codeMail' })
    }),
    {
      name: 'forgot-password-storage',
      getStorage: () => localStorage,
    }
     )
);