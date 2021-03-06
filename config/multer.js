const multer = require ('multer')

const armazenamento = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() +file.originalname)
    }
})

var upload = multer(
    {
        storage:armazenamento, limits:{fileSize:100000},
        fileFilter:(req,file,cb)=>{
            if(file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"){
                cb(null,true)
            }else{
                cb(null,false)
                return cb(new Error('Tipo de arquivo inválido'))
            }
        }
    }).single('imagem')

module.exports = upload
