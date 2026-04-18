export const validators = {
  isValidEmail: (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  isValidPhone: (phone: string) => {
    return phone.replace(/\D/g, '').length >= 10;
  }
};
