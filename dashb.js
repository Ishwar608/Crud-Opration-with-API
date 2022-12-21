let myArray = "";

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


}

display = (myData) =>{


    // console.log(myData);

    for (const key in myData[0]) {
        if (key != "jwtToken") {
            document.getElementById('theadP').innerHTML += `<th>${key}</th>`
        }
    }


    document.getElementById('tbodyP').innerHTML = myData.map((value)=>{
        let text = '';
        for (const iterator in value) {
             text += `<td>${value[iterator]}</td>`
        }
        return `<tr>${text}</tr>`
    }).join("");

    
}
    dashbord();