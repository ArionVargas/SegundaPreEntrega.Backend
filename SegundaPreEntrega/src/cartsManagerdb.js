import mongoose from 'mongoose'
import cartsModel from './models/carts.model.js'


class CartManager {
    constructor() {
        // Conexión a MongoDB
        mongoose.connect('mongodb+srv://arionvargas07:YmcnUi3N3c5JyqAh@cluster2.nzze0xu.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster2')
            .then(() => console.log('Conexión exitosa a MongoDB'))
            .catch(err => console.error('Error al conectar a MongoDB:', err))
    }

    async getCarts() {
        try {
            return await cartsModel.find();
        } catch (err) {
            console.error('Error al obtener los carritos:', err)
            return []
        }
    }

    async getCartProducts(id) {
        try {
            const cart = await cartsModel.findById(id)
            return cart ? cart.products : []
        } catch (err) {
            console.error('Error al obtener los productos del carrito:', err)
            return []
        }
    }

    async newCart() {
        try {
            return await cartsModel.create({ products: [] })
        } catch (err) {
            console.error('Error al crear un nuevo carrito:', err)
            return null
        }
    }

    async addProductCart(cart_id, product_id) {
        try {
            const cart = await cartsModel.findById(cart_id)
            if (!cart) {
                console.log('Carrito no encontrado')
                return
            }
            const productIndex = cart.products.findIndex(product => product.product_id.toString() === product_id)
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1
            } else {
                cart.products.push({ product_id, quantity: 1 })
            }
            await cart.save()
            console.log('Producto agregado con éxito')
        } catch (err) {
            console.error('Error al agregar el producto al carrito:', err)
        }
    }
}

export default CartManager