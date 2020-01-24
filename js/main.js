const content = new Vue({
    el: "#content",
    data: {
        isShow: false,
        isHide: true,
        isOpenShopcart: false,
        isHideShopcart: true,
        entereduser: false,
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
        femtshirts: [],
        blog: [],
        login: '',
        email: '',
        password: '',
        // Minimum six characters
        regp: /^[a-zA-Z0-9]{6,}$/,
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    },
    methods: {
        isEmailValid: function () {
            return (this.email == "")? "" : 
                   (this.reg.test(this.email)) ? 
                   'has-success' : 'has-error';
        },
        isPasswordValid: function () {
            return (this.password == "")? "" :
                   (this.regp.test(this.password)) ?
                   'has-success' : 'has-error';
        },
        //Hardcoded but work
        register: function (e, email, password) {
            e.preventDefault();
            const elEmail = document.getElementById('header__userin');
            const elPassword = document.getElementById('header__password');
            if (elEmail.classList.contains('has-success') && 
                elPassword.classList.contains('has-success')) {
                if (JSON.parse(localStorage.getItem('email')) === this.email ||
                    JSON.parse(localStorage.getItem('password') === this.password)) {
                        alert("You're already registered in the shop.");
                    } else {
                        localStorage.setItem('email', JSON.stringify(email));
                        localStorage.setItem('password', JSON.stringify(password));
                    }
            } else {
                alert("You should input correct data in the form and then click a button.");
            }
        },

        enter: function (e, email, password) {
            e.preventDefault();
            const storeEmail = JSON.parse(localStorage.getItem('email'));
            const storePassword = JSON.parse(localStorage.getItem('password'));
            if (storeEmail === email &&  storePassword === password) {
                this.login = this.email;
            } else {
                alert("You're not registered.");
            }
        }, 
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
            el.svg = "../images/mark.svg";
            const addedItem = Object.assign({}, el);
            addedItem.sizes = '-';
            console.log(addedItem);
            for (let i = 0; i< this.sizes.length; i++) {
                if ( this.sizes[i].id === addedItem.id) {
                    addedItem.sizes = this.sizes[i].size;
                }
            }
            console.log(addedItem.sizes);
            this.customerCart.goods.push(addedItem);
            this.customerCart.total += addedItem.price;
            this.customerCart.total = parseFloat(this.customerCart.total);
            localStorage.setItem('cards', JSON.stringify(this.customerCart.goods));
            //console.log(localStorage.cards);
            this.localCard = JSON.parse(localStorage.getItem('cards'));
            
        },
        deleteFromCart: function (el) {
           for (let i = 0; i < this.localCard.length; i++){
               if (this.localCard[i].id === el.id) {
                this.localCard.splice(i, 1);
                this.customerCart.goods.splice(i, 1);
                localStorage.setItem('cards', JSON.stringify(this.localCard));
               }
           }
           console.log(localStorage.cards);
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
    beforeMount:function () {
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
        fetch('./js/blog.json').then(response => {
            return response.json();
            }).then(data => {
            // Work with JSON data here
            this.blog = data.blog;
            }).catch(err => {
                console.log('Could not fetch data from tShirts.json file');
        });
    },
});