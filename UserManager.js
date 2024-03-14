class UserManager {
    static #users = [];
    
    create(data) {
        const user = {
            id: UserManager.#users.length === 0 ? 1 : UserManager.#users[UserManager.#users.length - 1].id + 1,
            photo: data.photo,
            email: data.email,
            password: data.password,
            role: 0
        }
        UserManager.#users.push(user);
        console.log("Usuario creado");
    }
    read(){
        return UserManager.#users;
    }
}

const gestorDeUsuarios = new UserManager();
gestorDeUsuarios.create({
    photo: "photo1.png",
    email: "toto@gmail.com",
    password: "toto1234"
})

gestorDeUsuarios.create({
    photo: "photo2.png",
    email: "pepe@gmail.com",
    password: "pepe1234"
})

console.log(gestorDeUsuarios.read());