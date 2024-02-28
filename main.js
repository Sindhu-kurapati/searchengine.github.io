import algoliasearch from "algoliasearch";

const client = algoliasearch("LTPN0CB8XZ", "405f7976507a53ceb2304ac451e360c0");
const index = client.initIndex("search");


let data = []
let resultsRootElement = document.querySelector('.results');
fetch('https://fakestoreapi.com/products').then(res=>res.json()).then(json=>{
    data = json;
    // console.log(data);
})


document.querySelector('#searchInput').addEventListener('keyup',()=>{
    let searchTerm = document.querySelector('#searchInput').value;
    let resultsArray = []

    if(String(searchTerm).trim().length > 0){

        index.search(searchTerm).then((response) => {
            renderProducts(response.hits)
        })
        .catch(err => {console.log(err);
            
        });
        
    }else{removeElements() }
})


function renderProducts(products){
    removeElements()
    products.forEach(product=>{
        renderSingleProduct(product);
    })
}
function renderSingleProduct(product){
    
    let resultDiv = document.createElement('div');
    let resultImage = document.createElement('img');
    let resultTitle = document.createElement('h4');
    let resultPrice = document.createElement('p');
    let purchaseButton = document.createElement('button');

    resultImage.src = product.image;
    resultTitle.innerText = product.title;
    resultPrice.innerText = product.price;
    purchaseButton.innerText = 'Purchase';

    // console.log(resultImage);
    // console.log(resultTitle);

    resultDiv.appendChild(resultImage);
    resultDiv.appendChild(resultTitle);
    resultDiv.appendChild(resultPrice);
    resultDiv.appendChild(purchaseButton);
    resultDiv.className='result';

    resultsRootElement.appendChild(resultDiv);
}

function removeElements(){
    document.querySelectorAll('.result').forEach(prod=>{
        prod.remove()
    })
}

function addNewProduct(){
    index.saveObject({
            objectID:24332,
            "id": 1,
            "title": "Cynohub <> React Project",
            "price": 109.95,
            "description": "This is an algolia based React project,where we learn how to use search",
            "category": "Development",
            "image": "https://picsum.photos/200",
            "rating": {
                "rate": 5,
                "count": 120
         
            }
    }).then(response=>{
        console.log(response)
    })
}

addNewProduct()