const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3005';

export const createPassword = async (token, email, password, phone) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/createPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, email, password, phone })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to create password');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating password:', error);
    throw error;
  }
};
