const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:40000');

export const registerUser = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      const text = await response.text();
      let errorData = {};
      try {
        errorData = JSON.parse(text);
      } catch (_) {}
      const message = errorData.error || response.statusText || text;
      if (response.status !== 409) {
        const details = errorData.details ? `\n\n${errorData.details}` : '';
        alert("SEND MAIL ERROR: " + response.status + " " + message + details);
      }
      throw new Error(errorData.error || errorData.details || text || 'Registration failed');
    }

    const data = await response.json();
    const successMsg = typeof data === 'object' && data !== null ? (data.message || JSON.stringify(data)) : data;
    //alert("SEND MAIL SUCCESS: " + successMsg);
    return data;
  } catch (error) {
    const isAlreadyExists = (error?.message || '').includes('already exists');
    if (!isAlreadyExists) {
      alert("SEND MAIL ERROR: " + (error?.message || error));
    }
    console.error('Error registering user:', error);
    throw error;
  }
};
