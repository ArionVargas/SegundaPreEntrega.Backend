import express from "express"
import { ProductManager } from "./productManager.js"
import { productsRouter } from "./routes/products.router.js"
import { cartsRouter } from "./routes/carts.router.js"
import { CartManager } from "./cartManager.js"
import __dirname from "../utils.js"
import handlebars from "express-handlebars"

const PORT = 8080
const app = express()

export const productManager = new ProductManager
export const cartManager = new CartManager

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/src/public"))

app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/src/views")

app.get("/hello", (req,res) =>{

    let test = {
        name: `arion`,
        last_name: `vargas`,
        age: 31
    }
    res.render("hello",test)
})

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.listen(PORT, (req, res) => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`)
})