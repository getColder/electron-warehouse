export default {
    state: {
        stockData7: {
            in: [30, 60, 40, 30, 30, 60, 70],
            out: [40, 30, 30, 60, 30, 60, 20],
        },
    },
    mutations: {
        getStock7(state, val) {
            state.stockData7 = val;
            
        },
    }
}