import axios from "axios";

export interface User {
  uuid: string;
  name: string;
  avatar: string;
  room: string;
  timezone: string;
  description: string;
  lastConnection: string;
  lastMessage: string;
  isCurrentUser: boolean;
}

export const fetchUser = async (): Promise<User | null> => {
  try {
    const response = await axios.get("https://randomuser.me/api/");
    const newUser = response.data.results[0];
    return {
      uuid: newUser.login.uuid,
      name: `${newUser.name.first} ${newUser.name.last}`,
      avatar: newUser.picture.thumbnail,
      room: newUser.login.uuid,
      timezone: newUser.location.timezone.description,
      description: newUser.location.street.name,
      lastConnection: newUser.registered.date,
      lastMessage: "",
      isCurrentUser: false,
    };
  } catch (error) {
    console.error("Error fetching new user:", error);
    return null;
  }
};

export const simulateResponse = (user: User): string => {
  const responseMessages = [
    `Hola, soy ${user.name}. ¿Cómo puedo ayudarte?`,
    `${user.name} está ocupado en este momento. Por favor, deja un mensaje.`,
    `¡Hola! ${user.name} aquí. ¿Qué necesitas?`,
  ];
  return responseMessages[
    Math.floor(Math.random() * responseMessages.length)
  ];
};