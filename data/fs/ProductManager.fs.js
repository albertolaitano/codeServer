const crypto = require("crypto");
const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./data/fs/files/products.json";
    this.init();
  }
  init() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("Producto creado");
    } else {
      console.log("El Producto ya existe");
    }
  }

  async create(data) {
    try {
      if (
        !data.title ||
        !data.photo ||
        !data.category ||
        !data.price ||
        !data.stock
      ) {
        throw new Error(
          "Todos los campos (title, category, price, stock) son obligatorios"
        );
      } else {
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
        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        console.log("Producto creado");
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
        return product;
      }
    } catch (error) {
      console.log("Error al cargar el producto: ", error);
    }
  }

  async read() {
    try {
      let Products = await fs.promises.readFile(this.path, "utf-8");
      Products = JSON.parse(Products);

      if (Products.length === 0) {
        throw new Error("No hay productos disponibles");
      } else {
        console.log("Error al leer productos: ", Products);
        return Products;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let Products = await fs.promises.readFile(this.path, "utf-8");
      Products = JSON.parse(Products);

      const Product = Products.find((each) => each.id === id);
      if (!Product) {
        throw new Error("Producto no encontrado");
      } else {
        console.log("Producto encontrado: ", Product);
        return Product;
      }
    } catch (error) {
      console.log("Error al leer el producto:", error.message);
    }
  }

  async destroy(id) {
    try {
      let Products = await fs.promises.readFile(this.path, "utf-8");
      Products = JSON.parse(Products);
      let Product = Products.find((each) => each.id === id);
      if (!Product) {
        throw new Error("NO ENCONTRADO");
      } else {
        let filtered = Products.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log(`Producto con ID ${id} eliminado`, Product);
        return Product;
      }
    } catch (error) {
      console.log("Error al eliminar un producto:", error.message);
    }
  }
}

async function test() {
  try {
    const gestorDeProductos = new ProductManager();
    await gestorDeProductos.create({
      title: "remera",
      photo: "remera.png",
      category: "ropa",
      price: 80,
      stock: 1000,
    });

    await gestorDeProductos.create({
      title: "pantalón",
      photo: "pantalon.png",
      category: "ropa",
      price: 120,
      stock: 800,
    });

    await gestorDeProductos.create({
      title: "zapatos",
      photo: "zapatos.png",
      category: "calzado",
      price: 150,
      stock: 500,
    });

    await gestorDeProductos.create({
      title: "gorra",
      photo: "gorra.png",
      category: "accesorios",
      price: 20,
      stock: 200,
    });

    await gestorDeProductos.create({
      title: "reloj",
      photo: "reloj.png",
      category: "accesorios",
      price: 100,
      stock: 300,
    });

    await gestorDeProductos.create({
      title: "buzo",
      photo: "buzo.png",
      category: "ropa",
      price: 100,
      stock: 300,
    });

    await gestorDeProductos.create({
      title: "botines",
      photo: "botines.png",
      category: "calzado",
      price: 100,
      stock: 300,
    });

    await gestorDeProductos.create({
      title: "borcegos",
      photo: "borcegos.png",
      category: "calzado",
      price: 100,
      stock: 300,
    });

    await gestorDeProductos.create({
      title: "camperon",
      photo: "camperon.png",
      category: "ropa",
      price: 100,
      stock: 300,
    });

    await gestorDeProductos.create({
      title: "gorro",
      photo: "gorro.png",
      category: "accesorios",
      price: 100,
      stock: 300,
    });

    await gestorDeProductos.read();
    const tester = await gestorDeProductos.create({
      title: "gorroXXL",
      photo: "gorroXXL.png",
      category: "accesorios",
      price: 100,
      stock: 300,
    });

    console.log("producto nuevo creado ", tester);
    await gestorDeProductos.readOne(tester.id);
    await gestorDeProductos.destroy(tester.id);
  } catch (error) {
    console.log(error);
  }
}
test();
