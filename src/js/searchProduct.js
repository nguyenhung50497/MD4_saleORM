const searchProduct = (value) => {
    axios.get('/users/search-product', {
        params:{
            keyword: value
        }
    }).then (res =>{
        let products = res.data;
        let html = '';
        products.map((item) => {
            html += `<div class="col-lg-4 col-md-6 pb-1">
                        <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                            <p class="text-right">${item.name}</p>
                            <a href="" class="cat-img position-relative overflow-hidden mb-3">
                                <img class="img-fluid" src="${item.image}" alt="" style="width: 400px;">
                            </a>
                            <h5 class="font-weight-semi-bold m-0">${item.price} $</h5>
                            <h5 class="font-weight-semi-bold m-0">${item.category.name}</h5>
                            <div class="cd-flex flex-column">
                                <a href="/products/detail/${item._id}"><button type="button" class="btn btn-primary">Detail</button></a>
                            </div>
                        </div>
                    </div>`
        })

        document.getElementById('list-blog').innerHTML = html;
    })
}