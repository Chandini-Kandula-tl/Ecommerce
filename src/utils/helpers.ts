import { DOLLAR } from "./constants";

export const validateEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
  return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const specialCharacters = "!@#$%^&*()_:;/{}[]<>,.";
  let upperCase = 0;
  let lowerCase = 0;
  let number = 0;
  let specialChar = 0;
  if (password.length < 8) {
    return false;
  } else {
    for (let i = 0; i < password.length; i++) {
      let char = password[i];
      if (specialCharacters.includes(char)) {
        specialChar++;
      } else if (char >= "A" && char <= "Z") {
        upperCase++;
      } else if (char >= "a" && char <= "z") {
        lowerCase++;
      } else if (char >= "0" && char <= "9") {
        number++;
      }
    }
    if (upperCase && lowerCase && number && specialChar) {
      return true;
    } else {
      return false;
    }
  }
};

export const validateText = (text: string): boolean => {
  return true;
  // return text.length >= min && text.length <= max;
};

export const validateNumber = (
  numeric: number,
  max: number,
  min: number
): boolean => {
  let numberLength = numeric.toString().length;
  if (numberLength >= min && numberLength <= max) {
    return true;
  } else {
    return false;
  }
  // if (length === 10) return true;
  // else return false;
};

export const handleSearch = () => {};

export const truncateProductName = (productName: string) => {
  if (productName.length > 25) return productName.substring(0, 25) + "...";
  else return productName;
};

export const formatCost = (cost: number) => {
  const formattedCost = cost.toFixed(2);
  if (formattedCost.endsWith(".00")) return DOLLAR + Math.floor(cost);
  return DOLLAR + formattedCost;
};
