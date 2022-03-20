// import fetch from 'node-fetch'; 

import * as fs from 'fs';
import Discord, { Client, Options } from 'discord.js';


var client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES
    ]
});

const prefix = 'y-';

client.on("ready", () =>{
    console.log("Bot opérationnel !");
    client.user.setActivity("y-help pour le menu d'aide")
});

client.on("messageCreate", message =>{

    //y-poke
    if(message.content === prefix + "poke"){
        message.reply("Aïe !");
    }

    //y-help
    else if(message.content === prefix + "help"){
        const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setAuthor("YouyouBot", "https://cdn.discordapp.com/avatars/908297979037904946/ad0477255d3af9025fca737229efea4b.webp?size=80")
        .setTitle("Menu d'aide du YouyouBot [2.0]")
        .addField("y-poke", "Tapote notre cher youyoubot")
        .addField("y-help", "Affiche la liste des commandes disponibles")
        .addField("y-blague", "Affiche une blague prise aléatoirement dans mon dictionnaire")
        .addField("y-add", "Ajoute une blague à mon dictionnaire")
        .addField("y-ping", "Ping le véritable youenn")

        message.channel.send({embeds: [embed]});;
    }

    else if(message.content === prefix + "blague"){

        getBlagues(message);
    }

    else if(message.content === prefix + "add"){
        message.author.send("Entrez l'énoncé et la réponse séparé d'un / et des \\n pour sauter des lignes :")
        message.channel.send("J'attend ta blague..");

        client.on('messageCreate', directmess =>{
            if(directmess.author === message.author){
            let bl = directmess.content.split('/');
            addBlague(bl[0], bl[1].split('\\n'));
            console.log('Blague ajoutée !');
            message.channel.send('Blague ajoutée à mon dico !')
            message.author = undefined
            }
        });
    }

    else if(message.content === prefix + "ping"){
        message.guild.members.fetch('555800575174901763')
        .then(val =>{
            message.channel.send('Invocation en cours de : <@' + val + ">")
        })
        .catch(err =>{
            if(err) console.log(err)
            message.channel.send('Je ne trouve pas mon alter-ego')
        })
    }
});

async function getBlagues(message){
    fs.readFile('./blagues/blagues.json', 'utf-8', (err, data) =>{
        if(err){return console.log(err);}
        data = JSON.parse(data);
        var rand = parseInt(Math.random() * data.blague.length);
        console.log(data.blague[rand])
        message.channel.send(data.blague[rand].enonce);
        if(data.blague[rand].response[1]){
            for(var i = 0; i < data.blague[rand].response.length; i++){
                console.log('YOUSK2')
                message.channel.send(data.blague[rand].response[i])
            }
        }else{
            message.channel.send(data.blague[rand].response[0])
        }
        // message.channel.send(data.blague[rand].response);
        // console.log(rand);
        // console.log(string);
        // message.channel.send(string[rand]);
        // message.channel.send(string[rand+1]);
        // message.channel.send(data);
    });
}

async function addBlague(enonce, response){
    let blague = new Blague(enonce, response)
    // let blague = ',{\n"enonce": "' + enonce + '",\n"response": "' + response + '"\n}'
    console.log(blague);
    fs.readFile('./blagues/blagues.json', 'utf-8', (err, data) =>{
        if(err) console.log(err)
        data = JSON.parse(data)
        data.blague[data.blague.length] = blague
        fs.writeFile('./blagues/blagues.json', JSON.stringify(data), 'utf-8', err =>{
            if (err) console.log(err)
            console.log('YOUSK2')
        })
    })
}


client.login("OTA4Mjk3OTc5MDM3OTA0OTQ2.YYzsaQ.rxGjslbkfJCjZPzrd2bjJ_uOGxI"); // compte bot

class Blague{
    constructor(enonce, response){
        this.enonce = enonce,
        this.response = response; // tableau
    }
}