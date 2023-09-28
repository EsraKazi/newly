document.addEventListener('DOMContentLoaded', function () {
    const hotelDropdown = document.getElementById('hotel');
    const roomDropdown = document.getElementById('room');

    // Your hotels data passed from the server
    const hotelsData = <%= JSON.stringify(hotels) %>;

    // Function to update the room dropdown based on the selected hotel
    function updateRoomDropdown() {
        // Clear the room dropdown
        roomDropdown.innerHTML = '<option value="" disabled selected>Oda Tipi</option>';
        
        // Get the selected hotel ID
        const selectedHotelId = hotelDropdown.value;
        
        // Find the selected hotel in the hotelsData array
        const selectedHotel = hotelsData.find((hotel) => hotel._id === selectedHotelId);
        
        // Populate the room dropdown with rooms from the selected hotel
        if (selectedHotel) {
            selectedHotel.rooms.forEach((room) => {
                const option = document.createElement('option');
                option.value = room.roomName;
                option.text = room.roomName;
                roomDropdown.appendChild(option);
            });
        }
    }

    // Add an event listener to the hotel dropdown to update the room dropdown
    hotelDropdown.addEventListener('change', updateRoomDropdown);
});
