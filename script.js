document.addEventListener('DOMContentLoaded', function() {
    const BASE_URL = 'http://localhost:4001'; // Replace with your actual base URL
console.log(BASE_URL);
    async function createUser(userDetails) {
        try {
            const response = await fetch(`${BASE_URL}/insert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Function to fetch all users
    async function getAllUsers() {
        try {
            const response = await fetch(`${BASE_URL}/details`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw error;
        }
    }

    // Function to display users in a table
    function displayUsers(users) {
        const table = document.getElementById('userTable');

        users.forEach(user => {
            const row = table.insertRow();
            const nameCell = row.insertCell(0);
            const emailCell = row.insertCell(1);
            const imageCell = row.insertCell(2);

            nameCell.innerHTML = user.userName;
            emailCell.innerHTML = user.userEmail;
            imageCell.innerHTML = `<img src="${user.userImage}" alt="User Image" style="max-width: 100px;">`;
        });
    }

    // Form submission event listener
    const customerForm = document.getElementById('customerForm');
    if (customerForm) {
        customerForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const image = document.getElementById('image').value;

            const userDetails = { userName: name, userEmail: email, userPassword: password, userImage: image };

            try {
                await createUser(userDetails);
                window.location.href = 'users.html'; // Redirect to all users page
            } catch (error) {
                console.error('Error creating user:', error);
            }
        });
    }

    // Check if we're on the all users page
    const userTable = document.getElementById('userTable');
    if (userTable) {
        getAllUsers()
            .then(users => displayUsers(users));
    }
});
