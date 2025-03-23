
document.addEventListener('DOMContentLoaded', () => {

  const menuItems = [
      {
          id: 1,
          name: 'Mahshi',
          description: 'Vegetables stuffed with rice and herbs, cooked in tomato sauce.',
          price: 'L.E 200',
          image: 'assets/images/mahshi-index.jpg'
      },
      {
          id: 2,
          name: 'Fattah',
          description: 'Layered rice, bread, and beef with a garlic and vinegar tomato sauce.',
          price: 'L.E 300',
          image: 'assets/images/fattah-egipto-1024x683.jpg'
      },
      {
          id: 3,
          name: 'Koshari',
          description: 'A traditional Egyptian dish with rice, pasta, lentils, and crispy onions.',
          price: 'L.E 70',
          image: 'assets/images/Egyptian-Koshari-Featured.jpg'
      },
      {
          id: 4,
          name: 'Ful Medames',
          description: 'Fava beans cooked with olive oil, lemon, and garlic. Served with bread.',
          price: 'L.E 50',
          image: 'assets/images/Ful-Medames-hero-square-1-1024x1024.jpg'
      },
      {
          id: 5,
          name: 'Molokhia',
          description: 'A green soup made with jute leaves, garlic, and coriander.',
          price: 'L.E 150',
          image: 'assets/images/Molokhia-Stew-The-Green-Soup-2.jpg'
      },

      {
          id: 6,
          name: 'Kofta',
          description: 'Grilled ground meat skewers with Middle Eastern spices.',
          price: 'L.E 600',
          image: 'assets/images/kofta_featured1.jpg'
      },
      {
          id: 7,
          name: 'Shawarma',
          description: 'Thinly sliced marinated meat served with garlic sauce and pita.',
          price: 'L.E 200',
          image: 'assets/images/Chicken-Shawarma.jpg'
      },
      {
          id: 8,
          name: 'Falafel',
          description: 'Deep-fried patties made from ground chickpeas and herbs.',
          price: 'L.E 40',
          image: 'assets/images/Crispy-Falafel-Recipe-2-1200.jpg'
      },
      {
          id: 9,
          name: 'Kebda Eskandarani',
          description: 'Alexandrian-style liver sautéed with garlic, chili, and spices.',
          price: 'L.E 70',
          image: 'assets/images/Screenshot 2025-03-19 225728.png'
      },
      {
          id: 10,
          name: 'Hamam Mahshi',
          description: 'Stuffed pigeon with rice, spices, and nuts.',
          price: 'L.E 500',
          image: 'assets/images/Screenshot 2025-03-19 230204.png'
      },
      {
          id: 11,
          name: 'Besarah',
          description: 'Mashed fava beans mixed with parsley, dill, and garlic.',
          price: 'L.E 80',
          image: 'assets/images/Besarah.jpg'
      },
      {
          id: 12,
          name: 'Kawaree',
          description: 'Slow-cooked cow feet in a rich, flavorful broth.',
          price: 'L.E 300',
          image: 'assets/images/egyptian-food-12-1024x640.jpg'
      },
      {
          id: 13,
          name: 'Roz Bel Laban',
          description: 'Rice pudding made with milk, sugar, and vanilla.',
          price: 'L.E 60',
          image: 'assets/images/roz-bil-laban13033.jpg'
      },
      {
          id: 14,
          name: 'Macarona Bechamel',
          description: 'Egyptian-style baked pasta with béchamel sauce and ground beef.',
          price: 'L.E 150',
          image: 'assets/images/Egyptian-Macarona-Bechamel-Featured.jpg'
      },
      {
          id: 15,
          name: 'Hawawshi',
          description: 'Spiced minced meat stuffed in pita bread and baked until crispy.',
          price: 'L.E 150',
          image: 'assets/images/Discover-the-Ultimate-Guide-to-Making-Authentic-Hawawshi-1040x1300.webp'
      },
      {
          id: 17,
          name: 'Basbousa',
          description: 'Semolina cake soaked in sugar syrup and topped with almonds.',
          price: 'L.E 50',
          image: 'assets/images/image0-1.jpeg'
      },
      {
          id: 18,
          name: 'Kunafa',
          description: 'Shredded pastry with a sweet cheese or cream filling, soaked in syrup.',
          price: 'L.E 60',
          image: 'assets/images/Cream-kunafa-recipe.jpg'
      }
  ];

  const itemsPerPage = 9;
  let currentPage = 1;
  const menuContainer = document.getElementById('menu-container');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');

  function displayMenuItems(page) {
    menuContainer.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToDisplay = menuItems.slice(start, end);
    itemsToDisplay.forEach(item => {
      menuContainer.innerHTML += `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${item.image}" class="card-img-top" alt="${item.name}" />
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="price">${item.price}</span>
                        <div>
                            <button class="btn btn-outline-secondary btn-sm wishlist-btn" data-id="${item.id}">♡ Wishlist</button>
                            <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `;
    });
    setupEventListeners();
    updatePaginationButtons();
  }

  function setupEventListeners() {
    document.querySelectorAll('.wishlist-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = +e.target.getAttribute('data-id');
        const item = menuItems.find(item => item.id === id);
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!wishlist.some(w => w.id === item.id)) {
          wishlist.push(item);
          localStorage.setItem('wishlist', JSON.stringify(wishlist));
          alert(`${item.name} added to wishlist!`);
        } else {
          alert(`${item.name} is already in your wishlist.`);
        }
      });
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = +e.target.getAttribute('data-id');
        const item = menuItems.find(item => item.id === id);
        addToCart(item);
        alert(`${item.name} added to cart!`);
      });
    });
  }

  function updatePaginationButtons() {
    const totalPages = Math.ceil(menuItems.length / itemsPerPage);
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  }

  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayMenuItems(currentPage);
    }
  });

  nextButton.addEventListener('click', () => {
    const totalPages = Math.ceil(menuItems.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayMenuItems(currentPage);
    }
  });

  displayMenuItems(currentPage);

});