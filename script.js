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
                // display(y);
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







