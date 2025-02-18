const user = {
    id: "USER-123456",
    name: {
        first: "Alice",
        last: "Liddell"
    },
    email: "alice@example.com",
    address: {
        shipping: {
            street: "123 Rabbit Hole",
            city: "Wonderland",
            state: "Fantasy",
            postalCode: "12345",
            country: "WL"
        },
        billing: {
            street: "456 Mad Hatter Lane",
            city: "Tea Party",
            state: "Fantasy",
            postalCode: "67890",
            country: "WL"
        }
    },
    payment: {
        total: "100.00",
        currency: "USD",
        details: {
            subtotal: "75.00",
            tax: "15.00",
            shipping: "10.00"
        },
        transactions: [
            {
                id: "TXN-123", amount: "50.00", description: "Magic Potion"
            },
            { id: "TXN-456", amount: "50.00", description: "Enchanted    Sword" }
        ]
    }
};



const{
    id,
    name:{
        first,
        last
    },
    email,
    address :{
        shipping: {
            street,
            city,
            state,
            postalCode,
            country
        },
        billing: {
            street:billingStreet,
            city:billingCity,
            state:billingState,
            postalCode:billingPCode,
            country:billingCountry
        }
    },
    payment: {
        total,
        currency,
        details: {
            subtotal,
            tax,
            shipping
        },
        transactions: [
            {
                id:transId, amount:transAmount, description:transDesc
            },
            { id:transId2, amount:transAmount2, description:transDesc2}
        ]
    }
}=user

console.log(total)

const personalInfo=document.getElementById("personal-info")
const shippingAddress=document.getElementById("shipping-address")
const billingAddress=document.getElementById("billing-address")
const transaction=document.getElementById("transactions")


personalInfo.innerHTML=`
<h2>Personal Info</h2>
<p>${id}</p>
<p>${first} ${last}</p>
<p>${email}</p>

`
shippingAddress.innerHTML=`
<h2>Shipping Address</h2>
<p>${street}</p>
<p>${city}</p>
<p>${state}</p>
<p>${postalCode}</p>
<p>${country}</p>
`
billingAddress.innerHTML=`
<h2>Billing Address</h2>
<p>${billingStreet}</p>
<p>${billingCity}</p>
<p>${billingState}</p>
<p>${billingPCode}</p>
<p>${billingCountry}</p>
`
transaction.innerHTML = `<h2>Transactions</h2>
${user.payment.transactions
  .map(
    (txn) =>
      `<p>ID: ${txn.id}, Amount: ${txn.amount}, Description: ${txn.description}</p>`
  )
  .join("")}`;