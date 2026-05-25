// Имитация базы данных пользователей
interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('users', JSON.stringify(users));
};

export const registerUser = (username: string, email: string, password: string): { success: boolean; error?: string } => {
  const users = getUsers();
  
  // Проверка имени пользователя - только буквы
  if (username.length < 3) {
    return { success: false, error: 'Имя пользователя должно содержать минимум 3 символа' };
  }
  if (username.length > 20) {
    return { success: false, error: 'Имя пользователя не должно превышать 20 символов' };
  }
  if (!/^[a-zA-Zа-яА-ЯёЁ]+$/.test(username)) {
    return { success: false, error: 'Имя пользователя может содержать только буквы' };
  }
  
  // Проверка email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Введите корректный email адрес' };
  }
  
  // Проверка пароля - без обязательной заглавной буквы
  if (password.length < 6) {
    return { success: false, error: 'Пароль должен содержать минимум 6 символов' };
  }
  if (!/[a-zA-Z]/.test(password)) {
    return { success: false, error: 'Пароль должен содержать хотя бы одну букву' };
  }
  if (!/[0-9]/.test(password)) {
    return { success: false, error: 'Пароль должен содержать хотя бы одну цифру' };
  }
  
  // Проверка существующего пользователя
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Пользователь с таким email уже существует' };
  }
  if (users.find(u => u.username === username)) {
    return { success: false, error: 'Это имя пользователя уже занято' };
  }
  
  // Создание пользователя
  const newUser: User = {
    id: Date.now().toString(),
    username,
    email,
    password,
  };
  
  users.push(newUser);
  saveUsers(users);
  
  // Автоматический вход после регистрации
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentUser', JSON.stringify({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    }));
  }
  
  return { success: true };
};

export const loginUser = (email: string, password: string): { success: boolean; error?: string } => {
  const users = getUsers();
  
  if (!email || !password) {
    return { success: false, error: 'Заполните все поля' };
  }
  
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return { success: false, error: 'Пользователь с таким email не найден' };
  }
  
  if (user.password !== password) {
    return { success: false, error: 'Неверный пароль' };
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentUser', JSON.stringify({
      id: user.id,
      username: user.username,
      email: user.email,
    }));
  }
  
  return { success: true };
};

export const logoutUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentUser');
  }
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};