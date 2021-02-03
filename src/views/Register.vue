<template>
 <div class="vertical-center">
    <div class="inner-block">   
        <form>
            <h3>Preencha o formulário</h3>

            <div class="form-group">
                <label>Nome</label>
                <input type="text" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Data Nascimento</label>
                <input type="date" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Registar</button>
            <p class="login text-right mt-2 mb-4">
                <router-link to="/login">Login</router-link>
            </p>
        </form>
    </div>
 </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>
<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }
 
  .vertical-center {
    display:flex;
    align-items:center;
    margin: 0 auto;
    display: flex;
    text-align: left;
    justify-content: center;
    flex-direction: column;    
  }
  
  .inner-block {
    width: 450px;
    margin: auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 15px;
    transition: all .3s;
  }

  .vertical-center h3 {
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 20px;
  }
  
  label {
    font-weight: 500;
  }
   .login,
  .login a {
    text-align: right;
    font-size: 13px;
    padding-top: 10px;
    color: #7a7a7a;
    margin: 0;
  }
  
  .login a {
    color: #2554FF;
  }
</style>