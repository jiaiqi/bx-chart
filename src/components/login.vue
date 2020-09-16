<template>
  <div class="container_view">
    <div class="container">
      <div class="title">登录</div>
      <div class="panel">
        <div class="content login">
          <div class="form">
            <div
              class="input"
              :class="{ focus: userNameFocus == true }"
              placeholder="用户名"
            >
              <input
                type="text"
                v-model="userName"
                @focus="focus('user')"
                @blur="blur('user')"
              />
            </div>
            <div
              class="input"
              :class="{ focus: pwdFocus == true }"
              placeholder="密 码"
            >
              <input
                type="password"
                v-model="pwd"
                @focus="focus('pwd')"
                @blur="blur('pwd')"
                @keyup.enter="toHome"
              />
            </div>

            <div id="forget_pwd_id" class="remberPass">
              <input
                type="checkbox"
                name
                id="ck_rmbUser"
                v-model="saveAccount"
              />
              <label for="ck_rmbUser">记住密码</label>
            </div>
          </div>
          <div class="login-box">
            <button @click="toHome" class="client-login">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: "",
      pwd: "",
      saveAccount: false,
      userNameFocus: false,
      pwdFocus: false,
    };
  },
  mounted () {
    let account = localStorage.getItem("account");
    if (account) {
      account = JSON.parse(account);
      if (account.userName && account.pwd) {
        this.userName = account.userName;
        this.pwd = account.pwd;
      }
    }
  },
  methods: {
    focus (p) {
      if (p == "user") {
        this.userNameFocus = true
      } else if (p == "pwd") {
        this.pwdFocus = true
      }
    },
    blur (p) {
      if (p === "user" && this.userName === "") {
        this.userNameFocus = false
      } else if (p === "pwd" && this.pwd === "") {
        this.pwdFocus = false
      }
    },
    // 保存cookie
    setCookie: function (cName, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        cName +
        "=" +
        decodeURIComponent(value) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    },
    // 获取cookie
    getCookie: function (key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + "=");
        if (start !== -1) {
          start = start + key.length + 1;
          var end = document.cookie.indexOf(";", start);
          if (end === -1) end = document.cookie.length;
          return unescape(document.cookie.substring(start, end));
        }
      }
      return "";
    },
    /*保存登录账户信息*/
    saveLoginUser () {
      let username = this.userName;
      let password = this.pwd;
      this.setCookie("login_user_name", username, { expires: 7 });

      if (this.saveAccount) {
        this.setCookie("rmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie
        this.setCookie("user_no", username, { expires: 7 });
        this.setCookie("pwd", password, { expires: 7 });
      } else {
        this.setCookie("rmbUser", "false", { expire: -1 });
        this.setCookie("user_no", "", { expires: -1 });
        this.setCookie("pwd", "", { expires: -1 });
      }
    },
    toHome (param) {
      const self = this;
      const user_no = this.userName;
      const { pwd } = this;
      const bxReqs = [];
      const bxReq = {};
      bxReq.serviceName = "srvuser_login";
      bxReq.data = [ { user_no: user_no, pwd: pwd } ];
      bxReqs.push(bxReq);
      sessionStorage.setItem("need_login_flag", null);
      let path = this.getServiceUrl("operate", "srvuser_login", "sso");
      const callBack = data => {
        if (data.state == "SUCCESS") {
          const resp = data.response[ 0 ];
          const { bx_auth_ticket } = resp.response;
          sessionStorage.setItem("bx_auth_ticket", bx_auth_ticket);
        } else {
          alert(data.resultMessage);
        }
      };
      function crosAjax (url, method, jsonData, succFun) {
        if (sessionStorage.getItem("need_login_flag") != "need_login") {
          self.$http({
            url,
            method,
            data: jsonData,
            xhrFields: {
              withCredentials: true
            }
          })
            .then(res => {
              if (res.data.resultCode === "SUCCESS") {
                self.saveLoginUser();
                const resp = res.data.response[ 0 ];
                const { bx_auth_ticket } = res.data.response[ 0 ].response;
                sessionStorage.setItem("bx_auth_ticket", bx_auth_ticket);
                const current_login_user = resp.response.login_user_info;
                // alert(JSON.stringify(resp))
                sessionStorage.setItem(
                  "current_login_user",
                  JSON.stringify(current_login_user)
                );
                top.user = current_login_user;


                if (self.$route.query.length > 0) {
                  const path = self.$route.query.from;
                  if (path) {
                    self.$router.push({ name: path });
                  } else {
                    self.$router.go(-1)
                  }
                } else {
                  self.$router.go(-1)

                  // if (param) {
                  //   let chartId = localStorage.getItem("chartId")
                  //   self.$router.push({ name: "dataView", params: { chart: chartId } });
                  // } else {
                  //   self.$router.push({ name: "dataView" });
                  // }
                }
              }
            })
            .catch(err => {
              if (err.indexOf("timeout"))
                this.$message({
                  showClose: true,
                  message: '登录超时，连接服务器失败，请稍后再试',
                  type: 'warning'
                });
              // alert("登录超时，连接服务器失败，请稍后再试")
            });
        }
      }

      crosAjax(path, "POST", bxReqs, callBack);

      if (this.saveAccount == true) {
        let account = {
          userName: this.userName,
          pwd: this.pwd
        };
        account = JSON.stringify(account);
        localStorage.setItem("account", account);
      } else {
        const account = localStorage.getItem("account");
        if (account) {
          localStorage.removeItem("account");
        }
      }
    }
  },
  watch: {
    saveAccount: function (new_v, old_v) {
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, rgb(181, 154, 254), rgb(245, 189, 253))
    fixed;
}

.container_view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #667db6; /* fallback for old browsers */
  background: linear-gradient(to top, #667db6, #0082c8, #0082c8, #667db6);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  .container {
    position: relative;
    // width: 800px;
    // height: 400px;
    // background: url("../assets/images/bg.jpg") no-repeat;
    // background-size: 60% 100%;
    // margin-right: 100px;
    display: flex;
    justify-content: flex-end;
    .title {
      width: 100%;
      text-align: center;
      font-size: 24px;
      color: #fff;
      position: absolute;
      top: -30%;
    }
    .panel {
      background-color: rgba(255, 255, 255, 0.274);
      display: flex;
      justify-content: center;
      .content.login {
        padding: 20px;
        // margin-left: 80px;
        .remberPass {
          display: flex;
          align-items: center;
          color: #fff;
        }
      }
    }
  }
}
.login-box {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  .client-login {
    width: 40%;
  }
  .web-login {
    width: 40%;
  }
  button {
    border: none;
    outline: none;
    width: 90%;
    height: 50px;
    border-radius: 40px;
    background: #00c6ff; /* fallback for old browsers */
    background: linear-gradient(to left, #1488cc, #0072ff);
    cursor: pointer;
    color: white;
  }
}
.form {
  width: 230px;
  padding-left: 50px;
  .input {
    position: relative;
    opacity: 1;
    height: 30px;
    width: 100%;
    margin: 30px 0;
    display: inline-block;
    transition: 0.4s;
    input {
      margin-top: 5px;
      outline: none;
      width: 100%;
      border: none;
      line-height: 30px;
      text-indent: 16px;
      border-bottom: 1px solid #0072ff;
    }
    &:after {
      content: attr(placeholder);
      position: absolute;
      // left: 0;
      top: 0;
      left: -50px;
      font-size: 14px;
      line-height: 40px;
      color: #fff;
      transition: 0.3s;
    }
  }
  button {
    border: none;
    outline: none;
    margin: 70px 0;
    width: 90%;
    height: 50px;
    border-radius: 40px;
    background: #00c6ff; /* fallback for old browsers */
    background: linear-gradient(to left, #1488cc, #0072ff);
    cursor: pointer;
    color: white;
  }
  label {
    display: block;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
  }
}
.input.focus::after {
  top: -100%;
  left: 0;
  font-size: 18px;
}
</style>
