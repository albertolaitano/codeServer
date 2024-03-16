class UserManager {
  static #users = [];

  create(data) {
    try {
      if (!data.photo || !data.email || !data.password) {
        throw new Error("Los campos photo, email y password son obligatorios");
      } else {
        const user = {
          id:
            UserManager.#users.length === 0
              ? 1
              : UserManager.#users[UserManager.#users.length - 1].id + 1,
          photo: data.photo,
          email: data.email,
          password: data.password,
          role: 0,
        };
        UserManager.#users.push(user);
        return user;
      }
    } catch (error) {
      console.log("Error al cargar el usuario: ", error);
    }
  }
  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("NO HAY NOTAS");
      } else {
        return UserManager.#users;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const gestorDeUsuarios = new UserManager();
gestorDeUsuarios.create({
  photo: "photo1.png",
  email: "toto@gmail.com",
  password: "toto1234",
});

gestorDeUsuarios.create({
  photo: "photo2.png",
  email: "pepe@gmail.com",
  password: "pepe1234",
});

console.log(gestorDeUsuarios.read());
