import { create } from "zustand";

interface Errors {
  usernameError: string | null;
  passwordError: string | null;
  emailError: string | null;
  firstNameError: string | null;
  lastNameError: string | null;
}
interface AuthErrorStore {
  errors: Errors;
  setUsernameError: (error: string) => void;
  setPasswordError: (error: string) => void;
  setEmailError: (error: string) => void;
  setFirstNameError: (error: string) => void;
  setLastNameError: (error: string) => void;
  resetErrors: () => void;
}
type Error = "username" | "password" | "email" | "first_name" | "last_name";
const setError = (
  store: AuthErrorStore,
  type: Error,
  message: string
): AuthErrorStore => {
  switch (type) {
    case "username":
      return { ...store, errors: { ...store.errors, usernameError: message } };
    case "password":
      return { ...store, errors: { ...store.errors, passwordError: message } };
    case "email":
      return { ...store, errors: { ...store.errors, emailError: message } };
    case "first_name":
      return { ...store, errors: { ...store.errors, firstNameError: message } };
    case "last_name":
      return { ...store, errors: { ...store.errors, lastNameError: message } };
  }
};
const useErrorStore = create<AuthErrorStore>((set) => ({
  errors: {} as Errors,
  setUsernameError: (error: string) =>
    set((store) => setError(store, "username", error)),
  setPasswordError: (error: string) =>
    set((store) => setError(store, "password", error)),
  setEmailError: (error: string) =>
    set((store) => setError(store, "email", error)),
  setFirstNameError: (error: string) =>
    set((store) => setError(store, "first_name", error)),
  setLastNameError: (error: string) =>
    set((store) => setError(store, "last_name", error)),
  resetErrors: () => set(() => ({})),
}));

export default useErrorStore;
