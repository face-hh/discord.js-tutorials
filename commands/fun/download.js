module.exports = {
	name: 'download',
	aliases: [],
	execute: async (_client, message, args) => {
		const fs = require('fs');
		const https = require('https');

		const file = args[0];
		const url = args[1];

		const filetype = file.split('.')[1] === 'mp4' ? 'video' : 'audio';

		if(!file) return message.channel.send('please provide a file name within the extension');
		if(!['mp4', 'mp3'].includes(file.split('.')[1])) return message.channel.send('Invalid extension');

		message.channel.send('We are getting the file for you please wait!');

		https.get(`https://popcat.xyz/download?url=${url}&filename=${file.split('.')[0]}&filter=${filetype}`, async res => {
			const path = `${__dirname}/${file}`;
			const filePath = fs.createWriteStream(path);
			res.pipe(filePath);

			filePath.on('finish', async () => {
				filePath.close();

				await fs.stat(path, async (err, { size }) => {
					if(err) console.log(err);
					let filesizemax = 8000000;

					if(message.guild.premiumTier === 'TIER_2') filesizemax = 50000000;
					if(message.guild.premiumTier === 'TIER_3') filesizemax = 100000000;

					if(size > filesizemax) {
						message.channel.send('Sorry! The file size was too big for this server');
						fs.unlink(path, (err => { if(err) console.log(err); }));
					}
					else {
						await message.channel.send({
							content: 'alright, here is your file:',
							files: [{
								name: file,
								attachment: path,
							}],
						});
						fs.unlink(path, (err => { if(err) console.log(err); }));
					}
				});
			});
		});
	},
};