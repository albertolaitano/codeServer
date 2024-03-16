class ProductManager {
  static #products = [];

  create(data) {
    const product = {
      id:
        ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id +
            1,
      title: data.title,
      photo: data.photo,
      category: data.category,
      price: data.price,
      stock: data.stock,
    };
    ProductManager.#products.push(product);
    console.log("Producto creado");
  }
  read() {
    return ProductManager.#products;
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
