import bcrypt from "bcrypt";

// Function to hash a password before storing
function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

function verifyPassword(inputPassword, storedHashedPassword) {
    return bcrypt.compareSync(inputPassword, storedHashedPassword);
}

function verifyMFA(inputMfaCode, correctMfaCode) {
    return inputMfaCode === correctMfaCode;
}

function checkBalance(balance, withdrawalAmount) {
    return balance >= withdrawalAmount;
}

function checkDailyLimit(withdrawalAmount, dailyLimit) {
    return withdrawalAmount <= dailyLimit;
}

function processWithdrawal(user, inputPassword, inputMfaCode, withdrawalAmount) {
    if (!verifyPassword(inputPassword, user.hashedPassword)) {
        return "Transaction Failed: Incorrect password.";
    }
    if (!verifyMFA(inputMfaCode, user.correctMfaCode)) {
        return "Transaction Failed: MFA failed.";
    }
    if (!checkBalance(user.balance, withdrawalAmount)) {
        return "Transaction Failed: Insufficient balance.";
    }
    if (!checkDailyLimit(withdrawalAmount, user.dailyLimit)) {
        return "Transaction Failed: Amount exceeds daily limit.";
    }

    // Deduct the withdrawal amount from the user's balance
    user.balance -= withdrawalAmount;
    return `Transaction Successful! New Balance: ${user.balance}`;
}

// user data
const password = "securePassword123";
const storedHashedPassword = hashPassword(password); // Hash the password before storing
const actualMFA = "987654";
const userBalance = 1000;
const dailyLimit = 500;

// Create user object
const user = {
    hashedPassword: storedHashedPassword,
    correctMfaCode: actualMFA,
    balance: userBalance,
    dailyLimit: dailyLimit
};

// Test cases
console.log(processWithdrawal(user, "securePassword123", "987654", 200)); 
// Expected output: "Transaction Successful! New Balance: 800"

console.log(processWithdrawal(user, "nilisahau", "987654", 200)); 

console.log(processWithdrawal(user, "securePassword123", "000000", 200)); 

console.log(processWithdrawal(user, "securePassword123", "987654", 1200)); 

console.log(processWithdrawal(user, "securePassword123", "987654", 600)); 
