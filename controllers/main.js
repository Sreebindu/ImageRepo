const Jimp = require('jimp');
const { v4: uuid } = require('uuid')

module.exports = async (req, res) => {
    try {
        const operations = req.body.operations.split("|");
        const file_name = `public/${uuid()}.jpg`
        const image = await Jimp.read(req.file.path);

        for (const operation of operations) {
            if (operation.startsWith('ROTATE')) {
                const degree = operation.replace('ROTATE', '') - 0
                image.rotate(degree)
            } 

            if (operation.startsWith('RESIZE')) {
                const [width, height] = operation.split(',').splice(1, 3).map(n => n-0);
                console.log({width, height})
                image.resize(width, height);
            }

            switch (operation) {
                case 'GREYSCALE': 
                    image.greyscale()
                    break;
                case 'FLIP_HORIZONTAL':
                    image.flip(true, false)
                    break;
                case 'FLIP_VERTICAL':
                    image.flip(false, true)
                    break;
                case 'LEFT_ROTATE':
                    image.rotate(90);
                    break;
                case 'RIGHT_ROTATE':
                    image.rotate(-90);
                    break;
            }
        }

        image.write(file_name)

        res.json({ url: `/${file_name}` });
    } catch (error) {
        res.json({ message: 'ERROR, please check the input' });
    }
}