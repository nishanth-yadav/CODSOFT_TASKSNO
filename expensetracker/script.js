let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];


// Add Transaction

function addTransaction() {

    const description =
        document.getElementById("description").value.trim();

    const amount =
        Number(document.getElementById("amount").value);

    const type =
        document.getElementById("type").value;

    const category =
        document.getElementById("category").value;

    const date =
        document.getElementById("date").value;


    if (description === "" || amount <= 0 || date === "") {
        alert("Please enter valid transaction details.");
        return;
    }


    const transaction = {

        id: Date.now(),

        description: description,

        amount: amount,

        type: type,

        category: category,

        date: date
    };


    transactions.push(transaction);

    saveTransactions();

    clearForm();

    displayTransactions();
}


// Display Transactions

function displayTransactions() {

    const list =
        document.getElementById("transactionList");

    const search =
        document.getElementById("search")
        .value
        .toLowerCase();

    const filter =
        document.getElementById("filterCategory").value;


    list.innerHTML = "";


    const filtered = transactions.filter(transaction => {

        const matchesSearch =
            transaction.description
            .toLowerCase()
            .includes(search);

        const matchesCategory =
            filter === "All" ||
            transaction.category === filter;

        return matchesSearch && matchesCategory;
    });


    filtered.forEach(transaction => {

        const div = document.createElement("div");

        div.className = "transaction";


        div.innerHTML = `

            <div class="transaction-info">

                <h3>${transaction.description}</h3>

                <p>
                    ${transaction.category}
                    | ${transaction.date}
                </p>

            </div>


            <strong class="${transaction.type}">

                ${transaction.type === "income" ? "+" : "-"}
                ₹${transaction.amount}

            </strong>


            <div class="actions">

                <button
                    class="edit"
                    onclick="editTransaction(${transaction.id})"
                >
                    Edit
                </button>

                <button
                    class="delete"
                    onclick="deleteTransaction(${transaction.id})"
                >
                    Delete
                </button>

            </div>

        `;


        list.appendChild(div);
    });


    updateSummary();
}


// Update Summary

function updateSummary() {

    let income = 0;

    let expense = 0;


    transactions.forEach(transaction => {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

    });


    const balance = income - expense;


    document.getElementById("totalIncome")
        .textContent = `₹${income}`;

    document.getElementById("totalExpense")
        .textContent = `₹${expense}`;

    document.getElementById("balance")
        .textContent = `₹${balance}`;
}


// Edit Transaction

function editTransaction(id) {

    const transaction =
        transactions.find(item => item.id === id);


    const newDescription =
        prompt(
            "Enter new description:",
            transaction.description
        );


    if (newDescription === null ||
        newDescription.trim() === "") {
        return;
    }


    const newAmount =
        Number(
            prompt(
                "Enter new amount:",
                transaction.amount
            )
        );


    if (newAmount <= 0 || isNaN(newAmount)) {
        alert("Invalid amount.");
        return;
    }


    transaction.description =
        newDescription.trim();

    transaction.amount =
        newAmount;


    saveTransactions();

    displayTransactions();
}


// Delete Transaction

function deleteTransaction(id) {

    transactions =
        transactions.filter(
            transaction => transaction.id !== id
        );


    saveTransactions();

    displayTransactions();
}


// Save to Local Storage

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}


// Clear Form

function clearForm() {

    document.getElementById("description").value = "";

    document.getElementById("amount").value = "";

    document.getElementById("date").value = "";
}


// Initial Display

displayTransactions();