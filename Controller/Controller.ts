import Router  from "express";
import { UrlService } from "../UrlService/UrlService";

export const Controller = Router(); 
const urlDb =  new UrlService(); 

Controller.get("/:urlGerada", async (req, res) => {
  const { urlGerada } = req.params;

  try {
      const urlReal = await urlDb.getUrl("http://localhost:8080/"+urlGerada);
      
      if (!urlReal) {
        console.error("URL encurtada não encontrada");
        res.status(404).send({ error: "URL encurtada não encontrada" });
      }
      
      res.redirect(urlReal?.urlOriginal??""); 
  } 
  catch (error) {
      console.error("Erro ao redirecionar para a URL original:", error);
      res.status(500).send({ error: "Erro ao redirecionar para a URL original" });
  }
});

Controller.post("/encurtar", async(req, res)=>{
  const {URL} = req.body;

  if(!URL){
    res.status(400).send({error:"não foi possivel pegar a url"}); 
  }
  const resultado = await urlDb.createUrl(URL);
  const urlReal = await urlDb.getUrl(resultado?.urlGerada ?? "");
  console.log(urlReal)
  res.status(201).json({ urlGerada: urlReal?.urlGerada});   
}); 
