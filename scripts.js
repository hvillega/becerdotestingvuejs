var vm = new Vue ({
    el: "#app",
    data: {
        asteroids: []
    },
    computed: {
        numAsteroids: function () {
            return this.asteroids.length;
        },
        closestObject: function () {
            var neosHavingData = this.asteroids.filter(function (neo) {
                return neo.close_approach_data.length > 0;
            });
            var simpleNeos = neosHavingData.map( function (neo) {
                return { name: neo.name, miles: neo.close_approach_data[0].miss_distance_miles };
            });
            var sortedNeos = simpleNeos.sort( function ( a, b) {
                return a.miles - b.miles;
            })
            return sortedNeos[0].name;
        }
    },
    // Wrap our Ajax request in a function with a meaningful name,
    // and make it clear that we want it to be executed as soon as the Vue instance is created.
    // https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
    created: function () {
        this.fetchAsteroids();
    },
    methods: {
        fetchAsteroids: function () {
            // var url = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=0bKlsZEkuHkAi9eZOMZXTx5LcvfrGDuRfnSOSt5w";
            var url = "http://737798.youcanlearnit.net/neos.json";
            axios.get(url)
                .then(function (res) {
                    vm.asteroids = res.data.near_earth_objects.slice(0, 10);
                })
        },
        getCloseApproachDate: function (a) {
            if (a.close_approach_data.length > 0) {
                return a.close_approach_data[0].close_approach_date;
            }
            return 'N/A';
        },
        remove: function ( index ) {
            this.asteroids.splice(index, 1);
        }
    }
});

