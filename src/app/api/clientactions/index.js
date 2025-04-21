export const Login_token = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const token = localStorage.getItem("token");
    return token;
  }
};

export const UniqueId = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const Id = localStorage.getItem("Id");
    return Id;
  }
};
export const NameString = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const NameString = localStorage.getItem("NameString");
    return NameString;
  }
};
