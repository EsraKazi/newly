const RoomType = require('./models/roomType'); // Import your RoomType model

// Create room types
const roomTypes = [
    {
        name: 'Standard',
        description: 'A comfortable standard room',
        price: 100,
    },
    {
        name: 'Deluxe',
        description: 'A luxurious deluxe room',
        price: 200,
    },
    {
        name: 'Suite',
        description: 'An elegant suite with extra amenities',
        price: 300,
    },
];

// Save room types to the database
RoomType.insertMany(roomTypes)
    .then((createdRoomTypes) => {
        console.log('Room types created:', createdRoomTypes);
    })
    .catch((error) => {
        console.error('Error creating room types:', error);
    });
