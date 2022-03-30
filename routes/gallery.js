const multer = require('multer')

module.exports = (app)=>{


        var database = require('../config/database')
        var gallery = require('../models/gallery')
    app.get('/gallery', async(req,res)=>{
        database()
        var documentos = await gallery.find()
        res.render('gallery.ejs',{dados:documentos})
    })

    var upload = require('../config/multer')
    app.post('/gallery', (req,res)=>{
        upload (req,res,async (err)=>{
            if(err instanceof multer.MulterError){
                res.send("O arquivo é maior que 100kb")
            }else if(err){
                res.send('Tipo de arquivo inválido')
            }else{
                database()
        var documento = await new gallery({
            arquivo:req.file.filename
        }).save()
        res.redirect('/gallery')
            }
        })
        
    })
}