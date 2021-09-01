
const authAxios = {
    headers: { 
      Authorization: window.localStorage.getItem('Authorization')
  }
  };

  export default authAxios;