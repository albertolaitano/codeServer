const crypto = require("crypto");
const fs = require("fs");

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
      }
    } catch (error) {
      console.log("Error al cargar el usuario: ", error);
    }
  }

  async read() {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);

      if (users.length === 0) {
        throw new Error("No hay usuarios");
      } else {
        return users;
      }
    } catch (error) {
      console.log(error);
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
      const index = users.findIndex((user) => user.id === id);
      if (index === -1) {
        throw new Error("Usuario no encontrado con el ID especificado");
      }

      const deletedUser = users.splice(index, 1)[0];
      await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2));
      console.log(`Usuario con el ID ${id} eliminado`);
      return deletedUser;
    } catch (error) {
      console.error("Error al eliminar el usuario:", error.message);
      throw error;
    }
  }
}

async function test() {
  const gestorDeUsuarios = new UserManager();
  await gestorDeUsuarios.create({
    photo: "photo1.png",
    email: "toto@gmail.com",
    password: "toto1234",
    role: "Alumno",
  });

  await gestorDeUsuarios.create({
    photo: "photo2.png",
    email: "pepe@gmail.com",
    password: "pepe1234",
    role: "Alumno",
  });

  await gestorDeUsuarios.create({
    email: "jose@gmail.com",
    password: "jose1234",
    role: "Alumno",
  });

  await gestorDeUsuarios.create({
    photo: "photo4.png",
    email: "raul@gmail.com",
    password: "raul1234",
    role: "Alumno",
  });

  console.log(await gestorDeUsuarios.read());
  //console.log(await gestorDeUsuarios.readOne("1"));
  //console.log(await gestorDeUsuarios.destroy("3"));
}

test();
