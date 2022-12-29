let myArray = [];
let ediItem = -1;
dashbord = () =>{
    let tkn = localStorage.getItem("token");
    // let bn = "bearer";


    fetch("http://localhost:4000/accounts", {
        method: 'Get',
        headers: {

            "Authorization" : "bearer " + tkn
        }
       
    }).then(y=>y.json()).then(y=> {
        // console.log(y)
        display(y);
    })

document.getElementById("regi").style.display = "none";
}
display = (myData) =>{

    myArray = myData;
    let keyVal = [];
    // console.log(myData);

    for (const key in myData[0]) {
        keyVal.push(key);
    }
    if(myData.message != "Unauthorized"){
        keyVal.push("Action")
    }
    for (const iterator of keyVal) {
        
        document.getElementById('theadP').innerHTML += `<th>${iterator}</th>`
    }


    document.getElementById('tbodyP').innerHTML = myData.map((value,index)=>{
        let text = '';
        for (const iterator in value) {
             text += `<td>${value[iterator]}</td>`
        }
        return `<tr id="${value.id}">${text}<td><a href="Dashbord.html"><button class="btn1" onclick="dltData(${index})">Delete</button></a><button class="btn1" onclick=editData(${index})>Edit</button></td></tr>`
    }).join("");

    
    
}

dltData = (index) =>{
    let tkn = localStorage.getItem("token");
 
    let id = myArray[index].id;
    fetch("http://localhost:4000/accounts/" + id, {
            method: 'DELETE',
            headers: {

                "Authorization" : "bearer " + tkn
            }
        })
    }
    
    editData = (index) =>{


        ediItem = index;

        document.getElementById("title").value = myArray[index].title;
        document.getElementById("firstName").value = myArray[index].firstName;
        document.getElementById("lastName").value = myArray[index].lastName;
        document.getElementById("email").value = myArray[index].email;

        
        document.getElementById("regi").style.display = "block";
        // console.log(myData);
        
}

updateData = () =>{
    let upData = {
        title : document.getElementById("title").value,
        firstName : document.getElementById("firstName").value,
        lastName:document.getElementById("lastName").value,
        email:document.getElementById("email").value
    }
    console.log(upData);

    let tkn = localStorage.getItem("token");

    let id = myArray[ediItem].id;
    fetch("http://localhost:4000/accounts/" + id, {
            method: 'PUT',
            headers: {
                "Authorization" : "bearer " + tkn,
                 'Content-Type': 'application/json'
            },
            body: JSON.stringify(upData)    
        })

        let myData = document.getElementById(myArray[ediItem].id);

        let myt = myData.getElementsByTagName("td");

        myt[1].innerHTML = upData["title"];
        myt[2].innerHTML = upData["firstName"];
        myt[3].innerHTML = upData["lastName"];
        myt[4].innerHTML = upData["email"];

        document.getElementById("regi").style.display = "none";

}

dashbord();


    