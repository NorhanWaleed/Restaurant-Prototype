document.addEventListener('DOMContentLoaded', () => {
    const wishlistContainer = document.getElementById('wishlist-container');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isLoggedIn = localStorage.getItem('loggedInUser') !== null;
    
    if (!isLoggedIn) {
        wishlistContainer.innerHTML = '<div class="col-12"><div class="alert alert-warning text-center p-4"><i class="fas fa-lock me-2"></i>Please <a href="login.html">login</a> to view your wishlist</div></div>';
        return;
    }
    
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p class="text-center">Your wishlist is empty.</p>';
    } else {
        wishlistContainer.innerHTML = wishlist.map(item => `
            <div class="col-md-4">
                <div class="card h-100">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}" />
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="price">${item.price}</span>
                            <button class="btn btn-danger btn-sm remove-wishlist-btn" data-id="${item.id}">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Remove from Wishlist
    document.querySelectorAll('.remove-wishlist-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const updatedWishlist = wishlist.filter(item => item.id != id);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            location.reload();
        });
    });
});
