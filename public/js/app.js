document.addEventListener('DOMContentLoaded', () => {
    // Fetch donations and populate homepage
    fetch('/donations')
      .then(response => response.json())
      .then(donations => {
        const donationCards = document.getElementById('donationCards');
        donations.forEach(donation => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <img src="${donation.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">${donation.text}</p>
              <button class="btn btn-primary" data-toggle="modal" data-target="#moreInfoModal" data-text="${donation.text}" data-image="${donation.image}">More Info</button>
            </div>
          `;
          donationCards.appendChild(card);
        });
      });
  
    // Add event listener to dynamically populate modal content
    $('#moreInfoModal').on('show.bs.modal', function (event) {
      const button = $(event.relatedTarget);
      const text = button.data('text');
      const image = button.data('image');
      const modal = $(this);
      modal.find('.modal-body').html(`
        <img src="${image}" class="img-fluid" alt="...">
        <p>${text}</p>
      `);
    });
  });
  