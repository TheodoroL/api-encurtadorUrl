
import {PrismaClient} from '@prisma/client'; 

export class UrlService{
    private prisma =  new PrismaClient(); 
    
    async createUrl(url:string){

        let urlOriginal = url; 
        console.log(urlOriginal); 
        let urlGerada:string = `http://localhost:8080/${this.gerarValue()}`;
        let data = new Date()
        let expiresAt= new Date(data.getTime()+2*60*60*1000); 
        try{
            return await this.prisma.linkDasPessoas.create({
               data:{
                   urlOriginal,
                   urlGerada,
                   expiresAt
               }   
           })

        } catch(error){
            console.error(error); 
        }

    }

    async getUrl(urlGerada:string){
        return await this.prisma.linkDasPessoas.findUnique({
            where:{
                urlGerada
            }
        }); 
        }

    async deleteUrlExpiresAt(){
        const now = new Date(); 
        console.log(now)
        try{
            const deleteLink = await this.prisma.linkDasPessoas.deleteMany({
                where:{
                    expiresAt:{
                        lte: now
                    }
                }
            }); 

        }
        catch(error){
            console.error("erro de deletar o link "+error); 
        }
    }

    private gerarValue():string{
        let value:string = "";         
        while (value.length < 5) {
         let alfanumeric:string ="ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"; 

            let randomIndex = Math.floor(Math.random() * alfanumeric.length);
            let char = alfanumeric[randomIndex];

            if (!value.includes(char)) {
                value += char;
            }
        }
        return value; 
    }
}   