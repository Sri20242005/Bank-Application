
// ---------------- LOGIN ----------------
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let userData = localStorage.getItem(email);

    if (!userData) {
        document.getElementById("message").innerText =
            "No account found. Please register.";
        return;
    }

    let user = JSON.parse(userData);

    if (user.password === password) {
        localStorage.setItem("loggedInUser", email);

        if (user.role === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "user.html";
        }
    } else {
        document.getElementById("message").innerText =
            "Incorrect password!";
    }
}


// ---------------- REGISTER ----------------
function register() {
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;
    let role = document.getElementById("role").value;

    if (!email || !password) {
        document.getElementById("regMessage").innerText =
            "Fill all fields!";
        return;
    }

    if (localStorage.getItem(email)) {
        document.getElementById("regMessage").innerText =
            "Account already exists!";
    } else {
        let user = {
            password: password,
            role: role,
            balance: 0,
            transactions: []
        };

        localStorage.setItem(email, JSON.stringify(user));

        document.getElementById("regMessage").innerText =
            "Registered successfully!";
    }
}


// ---------------- HELPER ----------------
function getCurrentUser() {
    return localStorage.getItem("loggedInUser");
}


// ---------------- USER FUNCTIONS ----------------

// CHECK BALANCE
function checkBalance() {
    let email = getCurrentUser();
    let user = JSON.parse(localStorage.getItem(email));

    document.getElementById("userMessage").innerText =
        "Balance: ₹" + user.balance;
}


// DEPOSIT
function deposit() {
    let amount = parseInt(prompt("Enter amount:"));

    if (isNaN(amount) || amount <= 0) {
        document.getElementById("userMessage").innerText =
            "Invalid amount!";
        return;
    }

    let email = getCurrentUser();
    let user = JSON.parse(localStorage.getItem(email));

    user.balance += amount;

    user.transactions.push("Deposited ₹" + amount);

    localStorage.setItem(email, JSON.stringify(user));

    document.getElementById("userMessage").innerText =
        "Deposited successfully!";
}


// WITHDRAW
function withdraw() {
    let amount = parseInt(prompt("Enter amount:"));

    let email = getCurrentUser();
    let user = JSON.parse(localStorage.getItem(email));

    if (isNaN(amount) || amount <= 0) {
        document.getElementById("userMessage").innerText =
            "Invalid amount!";
        return;
    }

    if (amount > user.balance) {
        document.getElementById("userMessage").innerText =
            "Insufficient balance!";
        return;
    }

    user.balance -= amount;

    user.transactions.push("Withdrew ₹" + amount);

    localStorage.setItem(email, JSON.stringify(user));

    document.getElementById("userMessage").innerText =
        "Withdraw successful!";
}


// TRANSACTION HISTORY
function getTransactions() {
    let email = getCurrentUser();
    let user = JSON.parse(localStorage.getItem(email));

    if (user.transactions.length === 0) {
        document.getElementById("userMessage").innerText =
            "No transactions yet.";
        return;
    }

    document.getElementById("userMessage").innerText =
        user.transactions.join("\n");
}


// ---------------- ADMIN FUNCTIONS ----------------

// VIEW ALL ACCOUNTS
function viewAccounts() {
    let output = "";

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);

        if (key !== "loggedInUser") {
            let user = JSON.parse(localStorage.getItem(key));
            output += key + " | Balance: ₹" + user.balance + "\n";
        }
    }

    document.getElementById("adminMessage").innerText = output;
}


// SEARCH ACCOUNT
function searchAccount() {
    let email = prompt("Enter email:");
    let userData = localStorage.getItem(email);

    if (!userData) {
        document.getElementById("adminMessage").innerText =
            "Account not found!";
    } else {
        let user = JSON.parse(userData);
        document.getElementById("adminMessage").innerText =
            email + " | Balance: ₹" + user.balance;
    }
}


// DELETE ACCOUNT
function deleteAccount() {
    let email = prompt("Enter email:");

    if (localStorage.getItem(email)) {
        localStorage.removeItem(email);
        document.getElementById("adminMessage").innerText =
            "Account deleted!";
    } else {
        document.getElementById("adminMessage").innerText =
            "Account not found!";
    }
}


// FREEZE ACCOUNT (simple simulation)
function freezeAccount() {
    let email = prompt("Enter email:");
    let userData = localStorage.getItem(email);

    if (!userData) {
        document.getElementById("adminMessage").innerText =
            "Account not found!";
        return;
    }

    let user = JSON.parse(userData);
    user.frozen = true;

    localStorage.setItem(email, JSON.stringify(user));

    document.getElementById("adminMessage").innerText =
        "Account frozen!";
}