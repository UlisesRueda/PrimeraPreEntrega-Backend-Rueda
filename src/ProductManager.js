import fs from 'fs'

export class ProductManager{
    constructor(){
        this.products = [];
        this.path = "./src/data/productos.json";
    };

    getProducts(){
        try {
            const data = fs.readFileSync(this.path, "utf-8")
            this.products = JSON.parse(data);
            return this.products;
        } catch (error) {
            console.error('error al leer el archivo', error);
            return [];
        }
    };

    getProductsByID(pid){
        this.getProducts()
        const idCoindence = this.products.find(event => event.id === pid)

        if(idCoindence){
            return idCoindence;
        }else{
            console.log('Producto no encontrado')
        }
        
    }

    addProduct(product){
        const { title, description, price, thumbnail, code, stock, category, status } = product;

        if(!title || !description || !price || !thumbnail || !code || !stock || !category || !status ){
            throw new Error('Todos los campos deben ser obligatorios');
        };

        if(this.products.some((prod) => prod.code === code)){
            return new Error('El producto ya existe')
        }
 
        const newProduct ={
            id: this.products.length + 1,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            status: status,
            category: category
        }

        this.products.push(newProduct);
        console.log('Producto agregado correctamente');

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products))
            console.log('producto guardado exitosamente');
            return newProduct
        } catch (error) {
            console.log('no se guardo el producto', error);
            return error;
        }
    }

    updateProduct(id, updatedFields){
        this.getProducts();

        const idCoindence = this.products.findIndex(event => event.id === id);

        if(idCoindence){
            const Index = this.products.findIndex(prod => prod.id === id)
            this.products[Index] = {id, ...updatedFields};

            try {
                fs.writeFileSync(this.path, JSON.stringify(this.products));
                console.log('Archivo actualizado con exito');
            } catch (error) {
                console.error('no se pudo actualizar el archivo', error)
            }

        }else{
            console.log('No se encontro el producto');
        }
    };

    deleteProduct(id){
        this.getProducts();
        const idCoindence = this.products.findIndex(event => event.id === id)

        if(idCoindence){
           const Index = this.products.findIndex(prod => prod.id === id);
           this.products.splice(Index, 1);
           try {
                fs.writeFileSync(this.path, JSON.stringify(this.products));
                console.log('El producto se ha borrado con éxito');
           } catch (error) {
                console.error('no se pudo borrar el producto', error);
           }
        }else{
            console.log('No se encontro el producto');
        }
    }
}

