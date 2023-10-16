document.addEventListener("DOMContentLoaded", function () {
  const modal = new bootstrap.Modal(
    document.getElementById("reservationModal")
  );

  // Check-in ve Check-out alanlarını al
  const checkInDateInput = document.getElementById("checkInDate");
  const checkOutDateInput = document.getElementById("checkOutDate");

  // Bugünün tarihini al ve Check-in alanının minimum değerine ayarla
  const today = new Date().toISOString().split("T")[0];
  checkInDateInput.min = today;

  // Check-in tarihi değiştiğinde
  checkInDateInput.addEventListener("change", function () {
    const checkInDate = new Date(this.value);
    const checkOutDate = new Date(checkOutDateInput.value);

    // Eğer Check-out tarihi, Check-in tarihinden önceyse, Check-out tarihini sıfırla
    if (checkOutDate < checkInDate) {
      checkOutDateInput.value = this.value;
    }

    // Check-out alanının minimum değerini ayarla
    checkOutDateInput.min = this.value;
  });

  // Otel seçildiğinde odaları yükle
  const hotelDropdown = document.getElementById("hotel");
  hotelDropdown.addEventListener("change", () => {
    const roomDropdown = document.getElementById("roomName");
    roomDropdown.innerHTML =
      '<option value="" disabled selected>Oda Tipi</option>';

    const hotelName = hotelDropdown.value;
    if (hotelName) {
      fetch(`/getRooms/${hotelName}`)
        .then((response) => {
          return response.json();
        })
        .then((rooms) => {
          rooms.forEach((room) => {
            const option = document.createElement("option");
            option.value = room;
            option.textContent = room;
            roomDropdown.appendChild(option);
          });
        });
    }
  });

  // "Rezervasyon Ekle" düğmesine tıklanınca modalı aç
  document
    .getElementById("openModalButton")
    .addEventListener("click", function () {
      modal.show();
    });

  // "Rezervasyon Ekle" düğmesine tıklanınca formu gönder
  document
    .getElementById("submitReservation")
    .addEventListener("click", function () {
      const checkInDate = document.getElementById("checkInDate").value;
      const checkOutDate = document.getElementById("checkOutDate").value;
      const hotel = document.getElementById("hotel").value;
      const roomName = document.getElementById("roomName").value;
      const agency = document.getElementById("agency").value;
      const description = document.getElementById("description").value;
      modal.hide();
    });

  $(document).ready(function () {
    $("input[type='radio']").change(function () {
      var inputValue = $(this).val();
      filterCards(inputValue);
    });

    // Varsayılan olarak "all" radyo düğmesini işaretle
    $("input[name='status'][value='all']").prop("checked", true);
    filterCards("all");

    function filterCards(value) {
      if (value == "all") {
        $(".order-list").show();
      } else {
        $(".order-list").hide();
        $(".order-list.status-" + value).show();
      }
    }
  });
});
