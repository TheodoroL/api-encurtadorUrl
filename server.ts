import express from "express"; 
import { Controller } from "./Controller/Controller";
import { CronJob } from 'cron';
import { UrlService } from "./UrlService/UrlService";
import cors from 'cors'; 

const server = express(); 
const url = new UrlService()
const job = new CronJob('* * * * *', async () => { 
    await url.deleteUrlExpiresAt();
});

server.use(cors({
    origin:"*", 
    credentials: true
}));
server.use(express.json()); 
server.use(Controller); 
job.start(); 

server.listen(8080, ()=>{
    console.log("server on"); 
});