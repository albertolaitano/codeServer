const crypto = require("crypto");
class ProductManager {
  static #products = [];

  create(data) {
    try {
      if (!data.title || !data.category || !data.price || !data.stock) {
        throw new Error(
          "Todos los campos (title, category, price, stock) son obligatorios"
        );
      }

      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title:
          data.title ||
          "https://static.pullandbear.net/2/photos//2024/V/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739296",
        photo: data.photo,
        category: data.category,
        price: data.price,
        stock: data.stock,
      };
      ProductManager.#products.push(product);
      console.log("Producto creado");
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  }

  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("No hay productos disponibles.");
      }
      return ProductManager.#products;
    } catch (error) {
      console.error("Error al leer productos:", error.message);
      return [];
    }
  }

  readOne(id) {
    try {
      const product = ProductManager.#products.find((each) => each.id === id);
      if (!product) {
        throw new Error(`No se encontró un producto con el ID: ${id}`);
      }
      return product;
    } catch (error) {
      console.error("Error al leer un producto:", error.message);
      return null;
    }
  }

  destroy(id) {
    try {
      const filtered = ProductManager.#products.filter(
        (each) => each.id !== id
      );
      if (filtered.length === ProductManager.#products.length) {
        throw new Error(`No se encontró un producto con el ID: ${id}`);
      }
      ProductManager.#products = filtered;
      console.log(`Producto con ID ${id} eliminado`);
    } catch (error) {
      console.error("Error al eliminar un producto:", error.message);
    }
  }
}

const gestorDeProductos = new ProductManager();
gestorDeProductos.create({
  title: "remera",
  photo: "remera.png",
  category: "ropa",
  price: 80,
  stock: 1000,
});

gestorDeProductos.create({
  title: "pantalón",
  photo: "pantalon.png",
  category: "ropa",
  price: 120,
  stock: 800,
});

gestorDeProductos.create({
  title: "zapatos",
  photo: "zapatos.png",
  category: "calzado",
  price: 150,
  stock: 500,
});

gestorDeProductos.create({
  title: "gorra",
  photo: "gorra.png",
  category: "accesorios",
  price: 20,
  stock: 200,
});

gestorDeProductos.create({
  title: "reloj",
  photo: "reloj.png",
  category: "accesorios",
  price: 100,
  stock: 300,
});

console.log(gestorDeProductos.read());
