<template>
<div class="form__wrapper">
    <form @submit.prevent="loginUser" class="form">
        <h1 class="form__header">LOGIN</h1>
        <div class="form__item">
            <input type="text" name="email" id="email" v-model="email" placeholder="Enter Email" required>
        </div>
        <div class="form__item">
            <input type="password" name="password" id="password" v-model="password" placeholder="Enter Password" required>
        </div>
        <button class="btn">
            <loading v-if="loading"/>
            <span v-else>Login</span>
        </button>
    </form>
</div>
</template>

<script>
import Loading from '@/components/Loading.vue';
export default {
    name: "Login",
    components: {
        Loading
    },
    data: () => ({
        email: '',
        password: '',
        loading: false
    }),
    methods: {
        loginUser() {
            this.loading = true;
            setTimeout(() => {
                localStorage.setItem("email", this.email);
                localStorage.setItem("loggedIn", true);
                this.$store.commit('setLoggedIn', true)
                this.$router.push({ name: 'timeline'})
                this.loading = false
            }, 1500)
        }
    }
}
</script>
<style lang="scss" scoped>
.form {
    width: 100%;
    max-width: 480px;
    background: #42b983;
    border-radius: 4px;
    margin: auto;
    padding: 6rem 3rem;
    &__wrapper {
        display: flex;
        min-height: calc(98vh - 3rem);
    }
    &__header {
        color: #ffffff;
    }
    &__item {
        text-align: left;
        margin: 1rem;
        input {
            box-sizing: border-box;
            width: 100%;
            padding: 1rem;
            border: none;
            background: transparent;
            border-bottom: 2px solid #ffffff;
            color: #ffffff;
            font-size: 1rem;
            &:focus,
            &:focus-within {
                outline: 0;
            }
            &::placeholder {
                color: #ffffff;
            }
        }
    }
    .btn {
        background: #ffffff;
        padding: 1rem 5rem;
        margin-top: 2rem;
        border-radius: 4px;
        border: none;
        color: #912f56;
    }
}

</style>