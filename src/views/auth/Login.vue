<template>
    <div class="body-bg">
        <div class="container">
            <div class="d-flex justify-content-center">
                <div class="form-card bg-white">
                    <div class="px-3 pt-3 pb-4">
                        <form @submit.prevent="submit()">
                            <div class="form-group">
                                <label class="small">Username</label>
                                <input type="text" class="form-control form-control-lg" v-model="form.username" name="" />
                                <span class="text-danger small" v-if="errors.username">{{ errors.username[0] }}</span>
                            </div>
                            <div class="form-group">
                                <label class="small">Password</label>
                                <input type="password" class="form-control form-control-lg" v-model="form.password" name="" />
                                <span class="text-danger small" v-if="errors.password">{{ errors.password[0] }}</span>
                            </div>
                            <div class="form-group">
                                <loading-button :loading="sending" class="btn btn-secondary btn-lg btn-block" type="submit">Login</loading-button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from "@/apis/User";
import LoadingButton from "@/components/LoadingButton";

export default {
  name: "Login",
  components: {
    LoadingButton,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      sending: false,
      errors: [],
      showToast: false,
    };
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$route.query.redirect) {
        localStorage.removeItem("SB_USER");
      }
    });
  },

  methods: {
    async submit() {
      this.sending = true;
      await this.$store
        .dispatch("login", this.form)
        .then((res) => {
          localStorage.setItem("SB_USER", JSON.stringify(res.data));
          this.$store.commit("SET_USER", res.data);

          if (res.data.type === "student") {

            this.$router.push({ path: "/student/home" });
          }else if (res.data.type === "guardian") {

            this.$router.push({ path: "/guardian/home" });
          } 
          else if (res.data.type === "staff") {

            this.$router.push({ path: "/staff/home" });
          } else if (res.data.type === "admin") {

            this.$router.push({ path: "/m/home" });
          }

          this.sending = false;
        })
        .catch((err) => {
          this.sending = false;
          localStorage.removeItem("SB_USER");
          if (err.response.status === 422) {
            this.errors = err.response.data.errors;
          }
        });
    },
  },
};
</script>

<style scoped="">
.body-bg {
    /*background-color: #0066ff;*/
    width: 100%;
    height: 100vh;
}

.form-card {
    max-width: 450px;
    width: 450px;
    margin-top: 5rem;
    border-radius: .3rem;
}
</style>
