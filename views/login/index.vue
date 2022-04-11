<template>
    <el-card class="login-container">
        <el-form
            :model="form"
            status-icon
            :rules="rules"
            ref="form"
            label-width="“100px”"
        >
            <h3 class="login_title">系统登陆</h3>
            <el-form-item
                label="用户名"
                label-width="80px"
                prop="username"
                class="username"
            >
                <el-input
                    type="input"
                    v-model="form.username"
                    placeholder="请输入账号"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px" prop="password">
                <el-input
                    type="password"
                    v-model="form.password"
                    placeholder="请输入密码"
                ></el-input>
            </el-form-item>
            <el-form-item class="login_submit">
                <el-button type="primary" @click="login" class="login-submit"
                    >登录</el-button
                >
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import Mock from "mockjs";
import { getMenu, setHeader } from "../../api/data";

export default {
    name: "login",
    data() {
        return {
            form: {},
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        message: "用户名长度不能小于3位",
                        blur: "",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        login: function () {
            getMenu(this.form).then((res) => {
                if (res.data.code === 20000) {
                    console.log(res);
                    setHeader({'Autorization' : res.headers.Authorization});
                    this.$store.commit("clearMenu");
                    this.$store.commit("setMenu", res.data.menu);
                    this.$store.commit("setToken", res.data.token);
                    this.$store.commit("addMenu", this.$router);
                    this.$router.push({ name: "home" });
                } else {
                    this.$message.warning("密码或账户错误！");
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.login-container {
    position: relative;
    width: 550px;
    margin: 50px auto;
    border: 1px solid #eee;
    .login-submit {
        position: relative;
        left: 85%;
    }
}
</style>