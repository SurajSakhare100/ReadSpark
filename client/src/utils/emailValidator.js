export const emailValidator = (email) => {
    const invalidEmails = ["abc@gmail.com", "test@gmail.com", "info@gmail.com"];
    const disposableDomains = [
      "mailinator.com", "tempmail.com", "10minutemail.com", "yopmail.com",
    ];
  
    // Regex for basic validation
    const regex = /^[a-zA-Z][a-zA-Z0-9._%+-]{1,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      return false;
    }
  
    const domain = email.split("@")[1];
    if (invalidEmails.includes(email.toLowerCase()) || disposableDomains.includes(domain)) {
      return false;
    }
  
    return true;
  };
  export const nameValidator = (name) => {
    const regex = /^[a-zA-Z\s]{3,}$/; // At least 2 alphabetic characters (no numbers, no special symbols)
    return regex.test(name.trim());
  };