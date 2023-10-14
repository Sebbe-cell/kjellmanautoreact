export const verifyJwt = (jwtToken: any, secretKey: any) => {
    const parts = jwtToken.split('.');
    
    if (parts.length !== 3) {
      return false;
    }
    
    const payload = JSON.parse(atob(parts[1]));
    
    if (payload.key === secretKey) {
      return true;
    } else {
      return false;
    }
  }