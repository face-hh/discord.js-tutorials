const Discord = require('discord.js');

module.exports = {
	name: 'canvas',
	aliases: [],
	execute: async (client, message) => {
		const Canvas = require('canvas');

		const canvas = Canvas.createCanvas(400, 400);
		const ctx = canvas.getContext('2d');
		const icon = await Canvas.loadImage('https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg');

		ctx.drawImage(icon, 113, 69, 175, 263);

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'cat.png');

		return message.channel.send({ files: [attachment] });
	},
};