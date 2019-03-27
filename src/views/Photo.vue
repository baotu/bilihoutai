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
						<el-menu-item index="/propertytransfer">财产转账</el-menu-item>
					</el-submenu>
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
				</el-menu>
			</el-aside>
			<el-container>
				<el-main class="el-main">
					<div style="background: white;box-shadow:0px 0px 5px black">
						<el-breadcrumb style="padding-left: 10px; padding-top: 10px;" separator="/">
							  <el-breadcrumb-item :to="{ path: '/photoalbum' }">返回相册</el-breadcrumb-item>
							  <el-breadcrumb-item>相片</el-breadcrumb-item>
						</el-breadcrumb>
						<ul class="ul">
							<li v-for ="(item, index) in pitcher" :key="index">
								<img v-preview="item.url" preview-nav-enable="true" preview-title-enable="true" class="pitcher" :src="item.url" alt="">
							</li>
						</ul>
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
		inject: ['reload'],
		data() {
			return {
				pageSize: 5, // 每页大小默认值
				pageIndex: 1, // 默认第一页
				isCollapse: true,
				adminname: '',
				form : {
					title: '',
					newtext: '',
					anthor: '',
					source: ''
				},
				pitcher : [],
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				//console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				//console.log(key, keyPath);
			},
			/* handleDelete(index,row) {
				var self = this;
				this.$confirm('此操作将永久删除该相册, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.$axios.get('xyalbum/deleteByAlbumid.do', {
						params: {
							albumid: row.albumid,
						}
					})
					.then(rs => {
						this.$message({
							type: 'success',
							message: '删除成功!',
							onClose:function(){
								self.reload();
							}
						});
					}).catch(err => {
						//console.log(err)
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}, */
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
						//console.log(rs.data.xyuser)
						self.$message({
							message: '退出登陆成功',
							type: 'success',
							onClose: function() {
								self.$router.push({path: '/login'});
							}
						})
					}).catch(err => {
						//console.log(err)
					})
				}).catch(() => {
					//console.log(err)
				})
			}
		},
		mounted() {
			var self = this;
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
			
			this.$axios.get('xyphoto/findByAlbumId.do',{
				params : {
					albumid : this.$route.query.albumid,
				}
			})
			.then(rs => {
				this.pitcher = rs.data.xyuser
				//console.log(rs.data.xyuser)
			}).catch(err => {
				//console.log(err)
			});
		},
	}
</script>

<style>
	.el-pagination__editor.el-input .el-input__inner {
		width: 50px;
	}
	.el-pagination .el-select .el-input .el-input__inner {
		width: 100px;
	}
	.ul{
		padding-bottom: 20px;
	}
	.ul li{
		list-style:none;
		display: inline;
	}
	.pitcher{
		width: 300px; 
		height: 200px;
		padding-left: 50px; 
		padding-top: 20px;
	}
	/* .img:hover{
		transition: all 0.6s;
		transform: scale(1.4);
	} */
	.el-tooltip__popper{
		max-width:50%
	}
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
		background-color: white
			/* #b3c0d1 */
		;
	}

	.el-main {
		/* height: 70vh; */
		min-width: 800px;
		min-height: 590px;
		overflow: hidden;
		background-color: #F2F6FC
			/* #f0f0f0 */
		;
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

	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 100px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 48%;
	}

	.yhxq .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 48%;
	}
</style>

<style lang="scss">
	.main-header {
		.el-dropdown {
			cursor: pointer;
			float: right;
		}
	}
</style>
