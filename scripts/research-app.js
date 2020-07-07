var py_app = new Vue({ 
    el: '#py-app',
    data: {
        x: "0",
        y: ""
    },

    created: function () {
        this.fetchData("0");
    },        

    methods: {
        fetchData: function (x) {
            this.$http.get(`https://7tw2vvqr25.execute-api.us-west-1.amazonaws.com/Prod/py_model/${x}/`)
                      .then(response => {
                        console.log(response);  // TODO: remove
                        this.y = response.body.model_output.toFixed(2);
                      })
        }
    }
});
                        this.y = response.body.model_output.toFixed(2);
                      })
        }
    }
});
