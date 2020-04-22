const createMockStore = async (store) => {
    const mockItems = [
        {
            name: '진라면',
            price: 5000,
            imgUrl: 'https://i.imgur.com/9YqbX5x.jpg',
        },
        {
            name: '신라면',
            price: 8500,
            imgUrl: 'https://i.imgur.com/ZUtc7jD.jpg',
        },
        {
            name: '삼양라면',
            price: 10000,
            imgUrl: 'https://i.imgur.com/NSGjRUK.jpg',
        },
        {
            name: '불닭볶음면',
            price: 9500,
            imgUrl: 'https://i.imgur.com/0u079XZ.jpg',
        },
        {
            name: '짜파게티',
            price: 8000,
            imgUrl: 'https://i.imgur.com/SWf26KA.jpg',
        },
        {
            name: '너구리',
            price: 6000,
            imgUrl: 'https://i.imgur.com/gx4kem1.jpg',
        },
        {
            name: '안성탕면',
            price: 7000,
            imgUrl: 'https://i.imgur.com/OVsQ530.jpg',
        },
    ];

    await store.Items.destroy({
        where: {},
        truncate: true
    });

    for(let i = 0; i < mockItems.length; i++)
        await store.Items.create(mockItems[i]);
};

module.exports = {
    createMockStore,
};
