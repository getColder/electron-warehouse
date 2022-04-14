<template>
    <el-form ref="form" label-width="100px" :model="localForm" :inline="inline">
        <el-form-item
            v-for="item in formLabel"
            :key="item.label"
            :label="item.label"
        >
            <el-input
                v-if="item.type === 'input'"
                :placeholder="'请输入' + item.label"
                v-model="localForm[item.model]"
            ></el-input>
            <el-select
                v-if="item.type === 'select'"
                placeholder="请选择"
                v-model="localForm[item.model]"
            >
                <el-option
                    v-for="item in item.opts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item><slot></slot></el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "commonForm",
    props: {
        formLabel: Array,
        form: Object,
        inline: Boolean,
    },
    data() {
        return {
            localForm: this.form,
        };
    },
    watch: {
        form: function (val) {
            this.localForm = val;
        },
    },
};
</script>
