// NASA:
var url = "https://api.nasa.gov/planetary/apod?api_key=0bKlsZEkuHkAi9eZOMZXTx5LcvfrGDuRfnSOSt5w";

var vm = new Vue ({
    el: "#app",
    data: {
        greetings: "Learning Vue.js",
        email: "yourmail@example.com",
        submitted: false,
        imgSrc: "",
        imgTitle: "Hola Cabron"
    },
    methods: {
        process: function () {
            this.submitted = true;
        }
    }
});

axios.get(url)
    .then(function (res) {
            console.log(res);
            vm.imgSrc = res.data.url;
            vm.imgTitle = res.data.title;
    });

