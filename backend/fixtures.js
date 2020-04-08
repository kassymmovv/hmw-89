const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');

const User = require('./models/User');
const Author = require('./models/Author');
const Album = require('./models/Albums');
const Track = require('./models/Tracks');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        username: 'admin',
        password: '123',
        token: nanoid(),
        role: 'admin'
    }, {
        username: 'user',
        password: '123',
        token: nanoid()
    });

    const [basta, kasp] = await Author.create({
        name: 'Баста',
        image: 'баста.jpg',
        description: 'хороший репер',
        publish:true
    }, {
        name: 'Каспийский груз',
        image: 'касп.jpg',
        description: 'хороший репер',
        publish:true

    });

    const [жиза, тюрьма, пальто, конь] = await Album.create({
        name: 'бла бла',
        author: basta,
        date: 2010,
        publish:true

    }, {
        name: 'бла бла',
        author: kasp,
        date: 2011,
        publish:true

    }, {
        name: 'бла бла',
        author: kasp,
        date: 1999,
        publish:true

    }, {
        name: 'бла бла',
        author: kasp,
        date: 2015,
        publish:true

    });

    await Track.create({
        title: 'бла бла',
        duration: '2:59',
        number: 1,
        album: жиза,
        publish:true

    }, {
        title: 'бла бла',
        duration: '3:33',
        number: 2,
        album: жиза,
        publish:true

    }, {
        title: 'бла бла',
        duration: '3:04',
        number: 3,
        album: жиза,
        publish:true

    }, {
        title: 'бла бла',
        duration: '3:39',
        number: 4,
        album: жиза,
        publish:true

    }, {
        title: 'бла бла',
        duration: '4:04',
        number: 5,
        album: жиза,
        publish:true

    }, {
        title: 'бла бла',
        duration: '5:06',
        number: 1,
        album: тюрьма,
        publish:true

    }, {
        title: 'бла бла',
        duration: '3:05',
        number: 2,
        album: тюрьма,
        publish:true

    }, {
        title: 'бла бла',
        duration: '3:16',
        number: 3,
        album: тюрьма,
        publish:true

    }, {
        title: 'бла бла',
        duration: '4:15',
        number: 4,
        album: тюрьма,
        publish:true

    }, {
        title: 'бла бла',
        duration: '3:49',
        number: 5,
        album: тюрьма,
        publish:true

    }, {
        title: 'бла бла',
        duration: '4:14',
        number: 1,
        album: пальто,
        publish:true

    }, {
        title: 'бла бла',
        duration: '4:25',
        number: 2,
        album: пальто,
        publish:true

    }, {
        title: 'бла бла',
        duration: '3:35',
        number: 3,
        album: пальто,
        publish:true

    }, {
        title: 'бла бла',
        duration: '3:23',
        number: 4,
        album: пальто,
        publish:true

    }, {
        title: 'vбла бла',
        duration: '4:50',
        number: 5,
        album: пальто,
        publish:true

    }, {
        title: 'бла бла',
        duration: '4:12',
        number: 1,
        album: конь,
        publish:true

    }, {
        title: 'бла бла',
        duration: '5:41',
        number: 2,
        album: конь,
        publish:true

    }, {
        title: 'бла бла',
        duration: '3:47',
        number: 3,
        album: конь,
        publish:true

    }, {
        title: 'бла бла',
        duration: '6:55',
        number: 4,
        album: конь,
        publish:true

    }, {
        title: 'бла бла',
        duration: '5:06',
        number: 5,
        album: конь,
        publish:true

    });

    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});