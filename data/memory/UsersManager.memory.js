const crypto = require("crypto");

class UserManager {
  static #users = [];

  create(data) {
    try {
      if (!data.email || !data.password || !data.role) {
        throw new Error("Los campos email, password y role son obligatorios");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          photo:
            data.photo ||
            "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
          email: data.email,
          password: data.password,
          role: data.role,
        };
        UserManager.#users.push(user);
        console.log("Usuario creado");
        return user;
      }
    } catch (error) {
      console.log("Error al cargar el usuario: ", error);
    }
  }
  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("No hay usuarios");
      } else {
        return UserManager.#users;
      }
    } catch (error) {
      console.log(error);
    }
  }

  readOne(id) {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("Usuario no encontrado");
      } else {
        UserManager.#users.find((each) => each.id === id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  destroy(id) {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("Id de usuario no encontrado");
      } else {
        const filtered = UserManager.#users.filter((each) => each.id !== id);
        UserManager.#users = filtered;
        console.log(id + " eliminado");
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
  role: "Alumno",
});

gestorDeUsuarios.create({
  photo: "photo2.png",
  email: "pepe@gmail.com",
  password: "pepe1234",
  role: "Alumno",
});
gestorDeUsuarios.create({
  email: "jose@gmail.com",
  password: "jose1234",
  role: "Alumno",
});

gestorDeUsuarios.create({
  photo: "photo4.png",
  email: "raul@gmail.com",
  password: "raul1234",
  role: "Alumno",
});

console.log(gestorDeUsuarios.read());
