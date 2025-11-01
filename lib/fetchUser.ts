import axios from 'axios';

export async function fetchUser(): Promise<any | null> {
  try {
    const res = await axios.get('http://localhost:2727/api/auth/me', {
      withCredentials: true,
      headers: {
        Cookie: '', 
      },
    });
    return res.data;
  } catch (err) {
    return null;
  }
}
