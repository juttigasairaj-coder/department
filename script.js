
const books=[

"Artificial Intelligence",
"Machine Learning",
"Deep Learning",
"Python Programming",
"Data Science",
"Computer Networks",
"Operating Systems",
"Database Systems",
"Natural Language Processing",
"Computer Vision"

];

if(!localStorage.getItem("borrowed"))
localStorage.setItem("borrowed",JSON.stringify([]));

if(!localStorage.getItem("history"))
localStorage.setItem("history",JSON.stringify([]));


function login(){

let u=document.getElementById("username").value;
let p=document.getElementById("password").value;

if(u==="admin" && p==="vuacse")
window.location="dashboard.html";

else
document.getElementById("error").innerText="Wrong username or password";

}



if(document.getElementById("bookSelect")){

let select=document.getElementById("bookSelect");

books.forEach(b=>{

let op=document.createElement("option");
op.text=b;
select.add(op);

});

displayTables();

}



function borrowBook(){

let name=document.getElementById("facultyName").value;
let mobile=document.getElementById("mobile").value;
let book=document.getElementById("bookSelect").value;

let borrowDate=new Date();

let returnDate=new Date();
returnDate.setDate(returnDate.getDate()+28);

let borrowed=JSON.parse(localStorage.getItem("borrowed"));

borrowed.push({
name,
mobile,
book,
borrowDate,
returnDate
});

localStorage.setItem("borrowed",JSON.stringify(borrowed));

displayTables();

}



function returnBook(i){

let borrowed=JSON.parse(localStorage.getItem("borrowed"));
let history=JSON.parse(localStorage.getItem("history"));

history.push(borrowed[i]);

borrowed.splice(i,1);

localStorage.setItem("borrowed",JSON.stringify(borrowed));
localStorage.setItem("history",JSON.stringify(history));

displayTables();

}



function displayTables(){

let borrowed=JSON.parse(localStorage.getItem("borrowed"));
let history=JSON.parse(localStorage.getItem("history"));

let today=new Date();

let borrowedTable=document.getElementById("borrowedTable");
let delayedTable=document.getElementById("delayedTable");
let historyTable=document.getElementById("historyTable");
let availableTable=document.getElementById("availableTable");

borrowedTable.innerHTML="";
delayedTable.innerHTML="";
historyTable.innerHTML="";
availableTable.innerHTML="";

borrowed.forEach((b,i)=>{

let row=

`<tr>
<td>${b.book}</td>
<td>${b.name}</td>
<td>${b.mobile}</td>
<td>${new Date(b.borrowDate).toDateString()}</td>
<td>${new Date(b.returnDate).toDateString()}</td>
<td><button class="btn btn-success" onclick="returnBook(${i})">Return</button></td>
</tr>`;

if(new Date(b.returnDate)<today)
delayedTable.innerHTML+=`<tr class="red">${row}</tr>`;

else
borrowedTable.innerHTML+=row;

});


history.forEach(h=>{

historyTable.innerHTML+=

`<tr>
<td>${h.book}</td>
<td>${h.name}</td>
<td>${h.mobile}</td>
</tr>`;

});


books.forEach(book=>{

let taken=borrowed.map(b=>b.book);

if(!taken.includes(book)){

availableTable.innerHTML+=

`<tr>
<td>${book}</td>
</tr>`;

}

});

}
