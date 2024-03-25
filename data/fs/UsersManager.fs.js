import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    this.path = "./data/fs/files/users.json";
    this.init();
  }
  init() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("Archivo creado");
    } else {
      console.log("Archivo ya existe");
    }
  }

  async create(data) {
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
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        console.log("Usuario creado");
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
        return user;
      }
    } catch (error) {
      console.log("Error al cargar el usuario: ", error);
    }
  }

  async read(rol) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      if (rol) {
        all = all.filter((each) => each.role === rol);
      }
      return all;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);

      const user = users.find((each) => each.id === id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      } else {
        console.log("Usuario encontrado: ", user);
        return user;
      }
    } catch (error) {
      console.log("Error al leer el usuario:", error.message);
    }
  }

  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let user = users.find((each) => each.id === id);
      if (!user) {
        throw new Error("NO ENCONTRADO");
      } else {
        let filtered = users.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log("Usuario eliminado: ", user);
        return user;
      }
    } catch (error) {
      console.log("Error al eliminar el usuario:", error.message);
    }
  }
}

async function test() {
  try {
    const gestorDeUsuarios = new UserManager();
    await gestorDeUsuarios.create({
      photo: "photo1.png",
      email: "toto@gmail.com",
      password: "toto1234",
      role: "profesor",
    });

    await gestorDeUsuarios.create({
      photo: "photo2.png",
      email: "pepe@gmail.com",
      password: "pepe1234",
      role: "alumno",
    });

    await gestorDeUsuarios.create({
      photo: "photo3.png",
      email: "raul@gmail.com",
      password: "raul1234",
      role: "alumno",
    });

    await gestorDeUsuarios.create({
      photo: "photo4.png",
      email: "luis@gmail.com",
      password: "luis1234",
      role: "alumno",
    });

    await gestorDeUsuarios.read();
    const tester = await gestorDeUsuarios.create({
      photo: "photo.5.png",
      email: "pedro@gmail.com",
      password: "pedro1234",
      role: "alumno",
    });

    console.log("Usuario nuevo creado ", tester);
    await gestorDeUsuarios.readOne(tester.id);
    await gestorDeUsuarios.destroy(tester.id);
  } catch (error) {
    console.log(error);
  }
}

//test();

const usersManager = new UserManager();
export default usersManager;
