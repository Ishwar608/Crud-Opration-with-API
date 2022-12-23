let frm = document.forms['frm'];
let myArray = [];

class PostData {
    constructor (entity,data){
        this.entity = entity;
        this.data = data;
    }

    getData() {
        fetch("http://localhost:4000/accounts/" + this.entity, {
            method: 'POST',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(y => y.json())
            .then(y => {

                localStorage.setItem("token",y.jwtToken)
                console.log(y);
                display(y);
            })

    }

    
}

Login = () =>{
 
    let myLoginData = {}

    for (const iterator of frm) {
        myLoginData[iterator.name]= iterator.value;
    }
    // console.log(myLoginData);

    let logData = new PostData("authenticate",myLoginData);
    logData.getData();

}

signUp = () =>{
 
    let myLoginData = {}

    for (const iterator of frm) {
        myLoginData[iterator.name]= iterator.value;
    }
    // console.log(myLoginData);

    let logData = new PostData("register",myLoginData);
    logData.getData();

}







// ----------------------------- Display Data -----------------------

let myData = [];
let mykey = [];

display = (myJson) => {
    myData = myJson;

    document.getElementById('theadP').innerHTML = "";
    document.getElementById('tbodyP').innerHTML = "";
    for (const key in myData) {
        if (key != "jwtToken") {
            // console.log(iterator);
            document.getElementById('theadP').innerHTML += `<th>${key}</th>`
        }
    }

    for (const key in myData) {

        if (key != "jwtToken") {
            // console.log(key);
            document.getElementById('tbodyP').innerHTML += `<td>${myData[key]}</td>`
        }
    }

}







