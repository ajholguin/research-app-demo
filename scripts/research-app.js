function* infinite() {
    let index = 0;

    while (true) {
        yield index++;
    }
}
const ids = infinite();

var py_app = new Vue({
    el: '#py-app',
    data: {
        model: {
            id: ids.next().value,
            x: 0,
            y: 0
        },
        all_values: []
    },
    created: function () {
        this.fetchData('0');
    },
    methods: {
        fetchData: function (x) {
            axios
                .get(`https://7tw2vvqr25.execute-api.us-west-1.amazonaws.com/Prod/py_model/${x}/`)
                .then(response => {
                    this.model.y = response.data.model_output;
                    this.all_values.push({
                        'id': ids.next().value,
                        'x': parseFloat(x),
                        'y': this.model.y})
                })
        }
    },
    computed: {
        all_values_sorted: function() {
            return this.all_values.sort(compare)
        }
    },
    filters: {
        round2: function(x) {
            return x.toFixed(2);
        }
    }
});

// TODO: reduce redundant code (Vue components?)
var r_app = new Vue({ 
    el: '#r-app',
    data: {
        x: '0',
        y: ''
    },

    created: function () {
        this.fetchData('0');
    },        

    methods: {
        fetchData: function (x) {
            axios
                .get(`https://7tw2vvqr25.execute-api.us-west-1.amazonaws.com/Prod/r_model/${x}/`)
                .then(response => {
                    console.log(response);  // TODO: remove
                    this.y = response.data.model_output.toFixed(2);
                })
        }
    }
});

function compare(a, b) {
    let comparison = 0;
    if (a.x > b.x) {
        comparison = 1;
    } else if (a.x < b.x) {
        comparison = -1;
    }
    return comparison;
}
