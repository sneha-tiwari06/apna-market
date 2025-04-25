export function getTokenRole() {
    const token = localStorage.getItem('token');
    if (!token) return { token: null, role: null };
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { token, role: payload.role };
  }