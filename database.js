/**
 * Módulo de conexão com o banco de dados
 * Uso de framework mongoose
 */



const mongoose = require('mongoose')


const url = 'mongodb+srv://admin:123Senac@cluster0.qwga8.mongodb.net/dbnotes'



let conectado = false


const conectar = async () => {
    
    if(!conectado) {
        try {
            await mongoose.connect(url) 
            conectado = true
            console.log("MongoDB Conectado")
        } catch (error) {
            console.error(error)
        }
    }
}


const desconectar = async () => {
    
    if(conectado) {
        
        try {
            await mongoose.disconnect(url) 
            conectado = false 
            console.log("MongoDB desconectado")
        } catch (error) {
            console.error(error)
        }
    }
}


module.exports = {conectar, desconectar}