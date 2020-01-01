const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
var cli = new Discord.Client({autoReconnect:true});
const botuser = new Discord.Client({disableEveryone: true});
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

botuser.on("ready", async () => {
    console.log(`${botuser.user.username} has made a successful connection with the API!`)
    botuser.user.setGame("in the snow!")
});

botuser.on("message", async message => {
    if(message.author.bot) return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    botuser.on("message", message => {
      const args = message.content.split(" ").slice(1);
     
      if (message.content.startsWith(config.prefix + "eval")) {
        if(message.author.id !== config.ownerID) return;
        try {
          const code = args.join(" ");
          let evaled = eval(code);
     
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
     
          message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
      }
    });
    
    if(cmd === `${prefix}active`){
        return message.channel.send(`${message.author} I'm online and active!`)
    }
    if(cmd === `${prefix}botinfo`){

    let boticon = botuser.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle(`Bot Information`)
    .setDescription("Information for SnowBot#9790")
    .setColor("#ccfffa")
    .setThumbnail(boticon)
    .addField("Bot Username", "SnowBot#9790")
    .addField("Created By", "SnOwO#0690")
    .addField("Created At", `${botuser.user.createdAt}`);

        return message.channel.send(botembed);
    }

    if(cmd === `${prefix}commands`){

        message.delete()

        let boticon = botuser.user.displayAvatarURL;
        let commandsembed = new Discord.RichEmbed()
        .setTitle(`Commands`)
        .setDescription(`A List Of Commands To Use With ${botuser.user.username}`)
        .setColor("#ccfffa")
        .setThumbnail(boticon)
        .addField(">commands", "Shows a list of commands!")
        .addField(">active", "Tells you if I'm online")
        .addField(">active", "Tells you if I'm online")
    
        return message.author.send(commandsembed)
    }

    if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    message.channel.send(serverembed);
}

if(cmd === `${prefix}say`){
    message.delete();
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permissions to run this command! Required Permissions `MANAGE_MESSAGES`");
    let botmessage = args.join(" ");
    message.channel.send(botmessage);
  }

if(cmd === `${prefix}ban`){
message.delete();
if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permissions to run this command! Required Permissions `BAN_MEMBERS`");
if(args[0] == "help"){
  message.reply("Usage: >ban <user> <reason>");
  return;
}
let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!bUser) return errors.cantfindUser(message.channel);
if(bUser.id === bot.user.id) return message.channel.send("You can't ban a robot!"); 
let bReason = args.join(" ").slice(22);
if(!bReason) return message.channel.send("No reason was given! User has not been banished!");
if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot ban a staff member!");

let banEmbed = new Discord.RichEmbed()
.setDescription("Ban Log")
.setColor("#15f153")
.addField("Banned User", `${bUser} with ID ${bUser.id}`)
.addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("Banned In", message.channel)
.addField("Time", message.createdAt)
.addField("Reason", bReason);

message.guild.member(bUser).ban(bReason);
message.send(banEmbed);
}

if(cmd === `${prefix}kick`){
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot kick a staff member!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick Log")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);

    message.guild.member(kUser).kick(kReason);
    message.channel.send(kickEmbed);
}

if(cmd === `${prefix}report`){
    message.delete();
    if(args[0] == "help"){
      message.reply("Usage: >report <user> <reason>");
      return;
    }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send(`Could not find user "${rUser}"`);
    let rreason = args.join(" ").slice(22);
    if(!rreason) return message.channel.send("No report reason was given! User report was not sent in!");

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Report Log")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "userreports");
    if(!reportschannel) return message.channel.send("Can't find channel of name `userreports`");
    reportschannel.send(reportEmbed);

}

if(cmd === `${prefix}ping`){
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Pinging.. Please wait!");
    m.edit(`Pinging completed! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(botuser.ping)}ms`);
  }

if(cmd === `${prefix}purge`) {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100! I cannot go over 100s");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

  if(cmd === "N!kiss"){
    message.delete;
    message.channel.send("That is forbidden in this land!")
  }

if(cmd === `${prefix}tempmute`){
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have permissions!");
  if(args[0] == "help"){
    message.reply("Usage: >tempmute <user> <1s/m/h/d>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find that user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot mute a staff member!");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("No reason was supplied!");

  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          CONNECT: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`You've been muted for ${mutetime} by ${message.author}`)
  }catch(e){
    message.channel.send(`A user has been muted... but their DMs are locked. They will be muted for ${mutetime}`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Mute executed by ${message.author}`)
  .setColor(orange)
  .addField("Muted User", tomute)
  .addField("Muted in", message.channel)
  .addField("Time", message.createdAt)
  .addField("Length", mutetime)
  .addField("Reason", reason);

  let incidentschannel = message.guild.channels.find(`name`, "moderationlogs");
  if(!incidentschannel) return message.reply("Can't find channel of name moderationlogs");
  incidentschannel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


//end of module
}

if(cmd === `${prefix}mute`){
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          CONNECT: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
 }

 if(cmd === `${prefix}diceroll`){
  var dice = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const embed = new Discord.RichEmbed()
      .setColor("#15f153")
      .addField("First dice", dice[Math.floor(Math.random()*dice.length)], true)
      .addField("Second dice", dice[Math.floor(Math.random()*dice.length)], true)
      .setTimestamp();

  return message.channel.send(embed);
 }

 if(cmd === `${prefix}coinflip`){
  const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

  var randomIndex = Math.floor(Math.random() * flipcoin.length); 

  message.channel.send(`<@${member.user.id}> `+ flipcoin[randomIndex]);
}

 if(cmd === `${prefix}dogpic`){
  var dogs = [
    'https://cdn.shopify.com/s/files/1/1324/6367/collections/Why_all_dogs_love_us_close_up_large.jpg?v=1487160259',
    'https://static01.nyt.com/images/2018/02/11/realestate/11dogs-topbreeds-Chihuahua/11dogs-topbreeds-Chihuahua-master495.jpg',
    'https://woodsboroworld.com/wp-content/uploads/2018/04/scroll0015.jpg',
    'https://123callingalldogs.com/wp-content/uploads/2017/11/slide-4-1900x825_t.jpg',
    'https://i.pinimg.com/736x/63/0f/0e/630f0ef3f6f3126ca11f19f4a9b85243--dachshund-puppies-weenie-dogs.jpg',
    'http://www.insidedogsworld.com/wp-content/uploads/2016/03/Dog-Pictures.jpg',
    'https://i.huffpost.com/gen/3754046/original.jpg',
    'https://www.dogster.com/wp-content/uploads/2014/06/A-Doberman-puppy.jpg',
    'http://dogcatandman.com/wp-content/uploads/2015/09/doberman1.jpg',
    'https://petsidi.com/wp-content/uploads/2018/06/adopt-a-corgi-puppy.jpg',
    'https://www.pets4homes.co.uk/images/breeds/50/large/fdaffb675fe084458758d97f7bac468f.jpg',
    'https://www.lifegate.it/app/uploads/corgi-surf.jpg',
    'https://www.ideegreen.it/wp-content/uploads/2016/01/pastore-tedesco1.jpg',
    'http://puppytoob.com/wp-content/uploads/2016/09/Black-German-Shepherd-750x493.jpg'

];

const embed = new Discord.RichEmbed()
    .setColor("#15f153")
    .setDescription(`Oh look I found a cute dog! :dog:`)
    .setImage(dogs[Math.floor(Math.random()*dogs.length)]);

return message.channel.send(embed);  
 }

 if(cmd === `${prefix}uptime`){
  let days = 0;
  let week = 0;
  let uptime = ``;
  let totalSeconds = (client.uptime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);

  if(hours > 23){
      days = days + 1;
      hours = 0;
  }

  if(days == 7){
      days = 0;
      week = week + 1;
  }

  if(week > 0){
      uptime += `${week} week, `;
  }

  if(minutes > 60){
      minutes = 0;
  }

  uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

  let servembed = new Discord.RichEmbed()
      .setColor("#228B22")
      .addField('Uptime', uptime);

  message.channel.send(servembed);

}
 
});

botuser.login(botconfig.token);