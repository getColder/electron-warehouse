export default {
    state: {
        groupsInfo: [
            {
                group: "组A",
                number: "1000"
            },
            {
                group: "组B",
                number: "200"
            },
            {
                group: "组C",
                number: "600"
            },
            {
                group: "组D",
                number: "400"
            }
        ]
    },
    mutations: {
        getGroup(state, val) {
            state.groupsInfo = val;
        },
    }
}