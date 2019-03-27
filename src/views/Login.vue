<template>
		<div class="wrapper">
			<div class="container">
				<h1 class="B">BiLi 后台登陆</h1>
				<form class="form">
					<input class="B" type="text" v-model="loginForm.adminname" placeholder="Username">
					<input class="B" type="password" v-model="loginForm.adminpassword" placeholder="Password"><br>
					<button type="submit" id="login-button" @click="login"><strong>登陆</strong></button>
				</form>
			</div>
			<ul class="bg-bubbles">
				<li></li>
				<li></li>
			</ul>
		</div>
</template>

<script>
	import store from '../store.js'
	
	export default {
		data() {
			return {
				loginForm: {
					adminname: '',
					adminpassword: ''
				}
			};
		},
		methods:{
			login(){
				var self = this ;
				var adminname = self.loginForm.adminname;
				var adminpassword = self.loginForm.adminpassword;
				if(this.loginForm.username === '' || this.loginForm.password === ''){
					this.$message.error('账号和密码不能为空');
				}else{
					this.$axios.get('xyadministrator/findLogin.do',{
						params : {
							adminname : adminname,
							adminpassword : adminpassword
						}
					}).then( rs => {
						if(rs.data.zt === '登陆成功'){
							this.$message({
								showClose: true,
								message : '登陆成功',
								type: 'success',
								onClose : function(){
									const loading = self.$loading({
										lock: true,
										text: '登陆成功，正在跳转......',
										spinner: 'el-icon-loading',
										background: 'rgba(255, 255, 255, 1)'
									});
									setTimeout(() => {
										loading.close();
									}, 2000);
									self.$router.push('/index');
								}
							});
						}else{
							this.$message.error('账号或密码错误，请重新输入！');
						}
					}).catch(err =>{
						this.$message.error('网络异常！');
					})
				}
			}
		},
	}
</script>

<style>
	.B{
		color: white;
	}
	body ::-webkit-input-placeholder {
	  font-family: 'Source Sans Pro', sans-serif;
	  color: white;
	  font-weight: 300;
	}
</style>
<style src='../../public/css/styles.css' scoped>

</style>
	

