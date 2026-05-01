export const validateCreateStore = (data) => {
    const { name, storeCode, password } = data;
  
    if (!name || !storeCode || !password) {
      throw new Error("All fields are required");
    }
  
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
  };