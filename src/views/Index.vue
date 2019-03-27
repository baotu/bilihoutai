<template>
	<el-container>
		<el-header class="main-header" style="height: 80px;">
			<h1 class="title" style="font-size: 30px;">B I L I 视 频 管 理 系 统</h1>
			<el-dropdown>
				<span class="el-dropdown-link">
					<img src="" alt="">
					<p class="yhmz">欢迎您：{{ adminname }}</p>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item><a @click="logout">退出登录</a></el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-header>
		<el-container>
			<el-aside width="65px">
				<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
				 :unique-opened="true" :collapse="isCollapse" :router="true">
					<el-menu-item index="/index">
						<i class="el-icon-loading"></i>
						<span slot="title">后台首页</span>
					</el-menu-item>
					<el-submenu index="2">
						<template slot="title">
							<svg class="icon1" aria-hidden="true">
								<use xlink:href="#iconshipin1"></use>
							</svg>
							<span slot="title">视频信息管理</span>
						</template>
						<el-menu-item index="/video">查看所有视频</el-menu-item>
						<el-menu-item index="/videoaudit">视频审核</el-menu-item>
						<el-menu-item index="/videotype">视频类型管理</el-menu-item>
						<el-submenu index="2-4">
							<span slot="title">视频评论管理</span>
							<el-menu-item index="/videoreview">视频评论</el-menu-item>
							<el-menu-item index="/Allcomment">所有评论</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<svg class="icon1" aria-hidden="true">
								<use xlink:href="#iconyonghu"></use>
							</svg>
							<span slot="title">用户信息管理</span>
						</template>
						<el-submenu index="3-4">
							<span slot="title">用户信息管理</span>
							<el-menu-item index="/yhgl">全部用户信息</el-menu-item>
							<el-menu-item index="/freeze">用户冻结管理</el-menu-item>
						</el-submenu>
						<el-menu-item index="/integral">用户积分管理</el-menu-item>
						<el-menu-item index="/gold">用户金币管理</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title">
							<svg class="icon1" aria-hidden="true">
								<use xlink:href="#icongongneng"></use>
							</svg>
							<span slot="title">辅佐功能</span>
						</template>
						<el-menu-item index="/digitalnews">数码新闻管理</el-menu-item>
						<!-- <el-menu-item index="/goldbuy">金币购买申请审核</el-menu-item> -->
						<el-menu-item index="/propertytransfer">财产转账</el-menu-item>
					</el-submenu>
					<!-- <el-menu-item index="/webplate">
						<svg class="icon1" aria-hidden="true">
							<use xlink:href="#iconbankuai"></use>
						</svg>
						<span slot="title">网站版块管理</span>
					</el-menu-item> -->
					<el-submenu index="6">
						<template slot="title">
							<i class="el-icon-tickets"></i>
							<span slot="title">日志和相册管理</span>
						</template>
						<el-menu-item index="/userjournal">用户日志</el-menu-item>
						<el-menu-item index="/photoalbum">相册管理</el-menu-item>
					</el-submenu>
					<el-menu-item index="/mass">
						<svg class="icon1" aria-hidden="true">
							<use xlink:href="#iconqunfa"></use>
						</svg>
						<span slot="title">群发信息维护</span>
					</el-menu-item>
					<!-- <el-menu-item index="/set">
						<i class="el-icon-setting"></i>
						<span slot="title">设置</span>
					</el-menu-item> -->
				</el-menu>

			</el-aside>
			<el-container>
				<el-main class="el-main">
					<div style="">
						<el-row :gutter="12">
							<el-col :span="8">
								<el-card shadow="hover" :body-style="{ height: '40px' }">
									<div style="float: left;">
										<svg class="icon" aria-hidden="true">
											<use xlink:href="#iconyonghu"></use>
										</svg>
									</div>
									<div class="card">
										<p class="card-p1">总用户数</p>
										<p class="card-p2">{{ yhcount }}</p>
									</div>
								</el-card>
							</el-col>
							<el-col :span="8">
								<el-card shadow="hover" :body-style="{ height: '40px' }">
									<svg class="icon" style="float: left;" aria-hidden="true">
										<use xlink:href="#iconshipin1"></use>
									</svg>
									<div class="card">
										<p class="card-p1">总视频数</p>
										<p class="card-p2">{{videocount}}</p>
									</div>
								</el-card>
							</el-col>
							<el-col :span="8">
								<el-card shadow="hover" :body-style="{ height: '40px' }">
									<svg class="icon" style="float: left;" aria-hidden="true">
										<use xlink:href="#icongonggao"></use>
									</svg>
									<div class="card">
										<p class="card-p1">新闻公告数</p>
										<p class="card-p2">{{ newscount }}</p>
									</div>
								</el-card>
							</el-col>
						</el-row>
					</div>

					<div style="margin-top: 40px;">
						<el-col :span="10">
							<el-card class="box-card" >
								<div>
									<h1>网站信息</h1>
								</div>
								<div class="text item">动画<el-progress :percentage="80"></el-progress></div>
								<div class="text item">国创<el-progress :percentage="70"></el-progress></div>
								<div class="text item">娱乐<el-progress :percentage="50" color="#8e71c7"></el-progress></div>
								<div class="text item">鬼畜<el-progress :percentage="60" color="#8e71c7"></el-progress></div>
								<div class="text item">生活<el-progress :percentage="65" color="#8e71c7"></el-progress></div>
							</el-card>
						</el-col>
						
						<el-col :span="12">
							<el-card class="box-card" style="margin-left: 100px;">
								<div>
									<h1>服务器信息</h1>
								</div>
								<div class="text item">服务器环境 <span style="margin-left: 20px;">windows7</span></div>
								<div class="text item">服务器IP地址 <span style="margin-left: 20px;">111.230.247.223</span></div>
								<div class="text item">服务器域名 <span style="margin-left: 20px;">ouyangwende.club</span></div>
								<div class="text item">数据库信息 <span style="margin-left: 20px;">mysql</span></div>
								<div class="text item">服务器当前时间	<span style="margin-left: 10px;">{{ date }}</span></div>
								<div class="text item">当前后台系统 <span style="margin-left: 20px;">V5.2版本 </span></div>
							</el-card>
						</el-col>
					</div>
				</el-main>
				<el-footer class="el-footer">
					<p>Copyright © 2013-2019 bilibili runoob.com All Rights Reserved.</p>
				</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				isCollapse: true,
				yhcount : '',
				videocount : '',
				newscount:'',
				adminname: '',
				date: new Date(),
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				//console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				//console.log(key, keyPath);
			},
			logout() {
				var self = this;
				self.$confirm('您确定要退出吗?', '退出管理平台', {
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(() => {
					this.$axios.get('xyuser/desSession.do', {
						params: {
							origin: window.location.origin
						}
					})
					.then(rs => {
						self.$message({
							message: '退出登陆成功',
							type: 'success',
							onClose: function() {
								self.$router.push({path: '/login'});
							}
						})
					}).catch(err => {
						//console.log(err)
					});
				}).catch(err => {
					//console.log(err)
				})
			},
			
		},
		mounted() {
			var self = this; //声明一个变量指向vue实例this,保证作用域一致
			this.timer = setInterval(function() {
			    self.date = new Date();//修改数据date
			}, 1000);
			
			
			this.$axios.get('xyadministrator/findSession.do', {
				params: {
					origin: window.location.origin
				}
			})
			.then(rs => {
				self.adminname = rs.data.xyuser.adminname;
				if(self.adminname === ''){
					self.$router.push({ path: '/login' });
				}
			}).catch(err => {
				//console.log(err)
			});
			
			this.$axios.get('xyuser/findAll.do', {
				params: {
					origin: window.location.origin
				}
			})
			.then(rs => {
				this.yhcount = rs.data.count
			}).catch(err => {
				//console.log(err)
			});
			
			this.$axios.get('xyvideo/findAll.do', {
				params: {
					origin: window.location.origin
				}
			})
			.then(rs => {
				this.videocount = rs.data.count
			}).catch(err => {
				//console.log(err)
			});
			
			this.$axios.get('xynews/findAll.do')
			.then(rs => {
				this.newscount = rs.data.count
			}).catch(err => {
				//console.log(err)
			});
		},
		beforeDestroy () {
            if(this.timer) {
                clearInterval(this.timer);//在vue实例销毁钱，清除我们的定时器
			}
		}
	}
</script>

<style>
	.icon {
		width: 40px;
		height: 40px;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}

	.icon1 {
		width: 1.3em;
		height: 1.3em;
		vertical-align: -0.15em;
		margin-left: 3px;
		margin-right: 8px;
		fill: currentColor;
		overflow: hidden;
	}

	.main-header {
		background-color: white /* #b3c0d1 */;
	}

	.el-main {
		/* height: 70vh; */
		min-width: 800px;
		min-height: 590px;
		overflow: hidden;
		background-color: #F2F6FC /* #f0f0f0 */;
	}

	.el-footer {
		background-color: white;
		text-align: center;
		color: #000000;
		line-height: 60px;
	}

	.yhmz {
		margin-top: -30px;
		font-size: 18px;
	}

	.card {
		text-align: left;
		float: left;
		margin-left: 20px;
	}

	.item {
		margin-top: 30px;
	}
</style>

<style lang="scss">
	/* $header-height:60px; */
	.main-header {

		/* background-color: #07c4a8; */
		.el-dropdown {
			cursor: pointer;
			float: right;
		}
	}
</style>
