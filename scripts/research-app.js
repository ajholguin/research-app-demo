var app = new Vue({ 
    el: '#app',
    data: {
        x: "0",
        y: ""
    },

    created: function () {
        this.fetchData("0");
    },        

    methods: {
        fetchData: function (x) {
            this.$http.get(`https://7tw2vvqr25.execute-api.us-west-1.amazonaws.com/Prod/py_random/${x}/`)
                      .then(response => {
                        console.log(response);
                        this.y = response.body.model_output.toFixed(2);
                      })
        }
    }
});
