const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export const verifyPhone = async (email, phone, verificationCode) => {
  try {
    // Ensure code is sent as a 6-digit string (no spaces, no type coercion to number)
    const code = String(verificationCode ?? '').replace(/\D/g, '').slice(0, 6);
    const response = await fetch(`${API_BASE_URL}/api/verifyPhone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, phone, verificationCode: code })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Phone verification failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying phone:', error);
    throw error;
  }
};
