export function setUser(user) {
  const parseUser = JSON.stringify(user);
  localStorage.setItem('user', parseUser);
}

export function getUser() {
  const data = localStorage.getItem('user');
  if(!data) return null;
  try {
    const parseData = JSON.parse(data);
    return parseData;
  } catch (error) {
    console.log(error);
    return null
  }
}