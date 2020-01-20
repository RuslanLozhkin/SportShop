const content = new Vue({
    el: "#content",
    data: {
        isShow: false,
        isHide: true,
        isOpenShopcart: false,
        isHideShopcart: true,
        bootPopup: false,
        pantPopup: false,
        tShirtPopup: false,
        imgIsAble: false,
        first: '',
        last: '',
        localCard: [],
        sizes: [],
        customerCart: {
            goods: [],
            total: 0,
            count: 0
        },
        delAddress: {
            zip: '' || 73000,
            country: '' || 'Ukraine',
            city: '' || 'Kherson',
            street: '',
            number: 0,
            appartment: 0
        },
        sneakers: [],
        pants: [],
        tShirts: [],
        femsneakers: [],
        fempants: [],
        femtshirts: []
    },
    methods: {
        swap: function () {
            if (this.isHide === true) {
                this.isHide = false;
                this.isShow = true;
            } else {
                this.isShow = false;
                this.isHide = true;
            }
        },
        swapCart: function () {
            if (this.isHideShopcart === true) {
                this.isHideShopcart = false;
                this.isOpenShopcart = true;
            } else {
                this.isOpenShopcart = false;
                this.isHideShopcart = true;
            }
        },
        imgIsAble: function () {
            
        },
        switchBootPopup: function () {
            bootPopup = !bootPopup;
        },
        switchPantPopup: function () {
            pantPopup = !pantPopup;
        },
        switchTshirtPopup: function () {
            tShirtPopup = !tShirtPopup;
        },
        cartSubmit: function () {
            const {
                zip,
                country,
                city,
                street,
                number,
                appartment,
            } =  this.delAddress;
            // TODO почитать про диструктуризацию объектов
            localStorage = { ...localStorage, 
                                zip, 
                                country, 
                                city, 
                                street, 
                                number, 
                                appartment 
            }
        },
        addToCart: function (event, el) {
            event.preventDefault();
            const addedItem = Object.assign({}, el);
            console.log(addedItem);
            for (let i = 0; i< this.sizes.length; i++) {
                if ( this.sizes[i].id === addedItem.id) {
                    addedItem.sizes = this.sizes[i].size;
                    console.log(addedItem.sizes);
                }
            }
            this.customerCart.goods.push(addedItem);
            this.customerCart.total += addedItem.price;
            this.customerCart.total = parseFloat(this.customerCart.total);
            localStorage.setItem('cards', JSON.stringify(addedItem));
            this.localCard.push(JSON.parse(localStorage.getItem('cards')));
        },
        setSize: function (event, parent, el) {
            event.preventDefault();
            const size = {
                id: parent.id,
                size: el
            };
            this.sizes.push(size);
        },
        closeCart: function () {
            if (this.isHideShopcart === false) {
                this.isHideShopcart = true;
            }
        },
        scrollDown: function (ref) {
            const main = this.$refs[ref];
            window.scrollTo(0, top);
            window.scrollTo({
                top: window.scrollY + main.getBoundingClientRect().y,
                behavior: "smooth"
            });
        },
        next: function (arr) {
            this.first = arr.shift();
            console.log(arr);
            arr.push(this.first);
            console.log(arr);
        },
        prev: function (arr) {
            this.last = arr.pop();
            console.log(arr);
            arr.unshift(this.last);
            console.log(arr);
        },
    },
    mounted:function () {
        fetch('./js/sneakers.json').then(response => {
            return response.json();
            }).then(data => {
            // Work with JSON data here
            this.sneakers = data.sneakers;
            }).catch(err => {
                console.log('Could not fetch data from sneakers.json file');
        });

        fetch('./js/femSneakers.json').then(response => {
            return response.json();
            }).then(data => {
            // Work with JSON data here
            this.femsneakers = data.sneakers;
            }).catch(err => {
                console.log('Could not fetch data from sneakers.json file');
        });

        fetch('./js/pants.json').then(response => {
            return response.json();
            }).then(data => {
            // Work with JSON data here
            this.pants = data.pants;
            }).catch(err => {
                console.log('Could not fetch data from pants.json file');
        });

        fetch('./js/femPants.json').then(response => {
            return response.json();
            }).then(data => {
            // Work with JSON data here
            this.fempants = data.pants;
            }).catch(err => {
                console.log('Could not fetch data from pants.json file');
        });

        fetch('./js/tShirts.json').then(response => {
            return response.json();
            }).then(data => {
            // Work with JSON data here
            this.tShirts = data.tShirts;
            }).catch(err => {
                console.log('Could not fetch data from tShirts.json file');
        });

        fetch('./js/femTshirts.json').then(response => {
            return response.json();
            }).then(data => {
            // Work with JSON data here
            this.femtshirts = data.tShirts;
            }).catch(err => {
                console.log('Could not fetch data from tShirts.json file');
        });

    },
});