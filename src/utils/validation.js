/**
 * Validation utilities for Login and Checkout forms
 */

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return '';
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return 'Phone number is required';
  }
  const cleaned = phone.trim().replace(/[\s-]/g, '');
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(cleaned)) {
    return 'Please enter a valid 10-digit phone number';
  }
  return '';
};

export const validatePincode = (pincode) => {
  if (!pincode || !pincode.trim()) {
    return 'Pincode is required';
  }
  const pinRegex = /^[0-9]{6}$/;
  if (!pinRegex.test(pincode.trim())) {
    return 'Pincode must be a 6-digit numeric code';
  }
  return '';
};

export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || !value.toString().trim()) {
    return `${fieldName} is required`;
  }
  return '';
};

export const validateCheckoutForm = (formData) => {
  const errors = {};

  const nameError = validateRequired(formData.fullName, 'Full name');
  if (nameError) errors.fullName = nameError;
  else if (formData.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;

  const addressError = validateRequired(formData.address, 'Address');
  if (addressError) errors.address = addressError;
  else if (formData.address.trim().length < 5) {
    errors.address = 'Please provide a complete delivery address';
  }

  const cityError = validateRequired(formData.city, 'City');
  if (cityError) errors.city = cityError;

  const pinError = validatePincode(formData.pincode);
  if (pinError) errors.pincode = pinError;

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
