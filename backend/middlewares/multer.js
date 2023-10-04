import multer from "multer";

const storage = multer.diskStorage({
        destination:function (req,file , cb){
            cb(null , 'backend/images')
        },
        filename:function (req ,file ,cb ){
            let  error = null ;
            const name = file.originalname.split(" ").join('_')
            const unique= Date.now() + '_' + Math.round(Math.random() * 1E9);

            if(!file.mimetype.startsWith('image')){
                error = new Error("image type validation failed");
            }        
            cb(error, unique +'_'+ name);
        }
})

export const upload = multer({storage:storage}) 