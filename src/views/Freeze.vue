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
					<el-tabs type="border-card">
						<el-tab-pane label="未冻结用户">
							<div style="">
								<el-table style="width: 100%" :data="tableData5.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))">
									<el-table-column label="用户ID" prop="userid" width="150px" sortable></el-table-column>
									<el-table-column label="用户名" prop="username"></el-table-column>
									<el-table-column label="用户邮箱" prop="useremail" width="300px"></el-table-column>
									<el-table-column label="最近登陆时间" prop="time" sortable></el-table-column>
									<el-table-column align="right">
										<template slot="header" slot-scope="scope">
											<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
										</template>
										<template slot-scope="scope" width="200px">
											<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">冻结</el-button>
										</template>
									</el-table-column>
								</el-table>
								
								<el-pagination class="fy" @current-change="handleCurrentChange"  :current-page="page" background layout="prev, pager, next" :total="totl" :page-size="5">
								</el-pagination>
							</div>
						</el-tab-pane>
						
						<el-tab-pane label="已冻结用户">
							<div style="">
								<el-table style="width: 100%" :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))">
									<el-table-column label="用户ID" prop="userid" width="150px" sortable></el-table-column>
									<el-table-column label="用户名" prop="username"></el-table-column>
									<el-table-column label="用户邮箱" prop="useremail" width="300px"></el-table-column>
									<el-table-column label="最近登陆时间" prop="time" sortable></el-table-column>
									<el-table-column align="right">
										<template slot="header" slot-scope="scope">
											<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
										</template>
										<template slot-scope="scope" width="200px">
											<el-button v-if="scope.row.freeze == 0" size="mini" @click="handleEdit1(scope.$index, scope.row)">解冻</el-button>
										</template>
									</el-table-column>
								</el-table>
								
								<el-pagination class="fy" @current-change="handleCurrentChange1" :current-page="page1" background layout="prev, pager, next" :total="totl1" :page-size="5">
								</el-pagination>
							</div>
						</el-tab-pane>
					</el-tabs>
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
				isCollapse: true,
				adminname: '',
				search: '',
				tableData5: [{
					userid: '',
					username: '',
					useremail: '',
					freeze: '',
					time : ''
				}],
				tableData: [{
					userid: '',
					username: '',
					useremail: '',
					freeze: '',
					time : ''
				}],
				page: 1,
				totl: 0,
				page1 : 1,
				totl1 :0
			};
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.$axios.get('xyuser/findPageNotFrozen.do', {
					params: {
						page: this.page,
						origin: window.location.origin
					}
				})
				.then(rs => {
					var qwe = Math.ceil(rs.data.count);
					this.totl = qwe;
					this.tableData5 = rs.data.xyuser
				}).catch(err => {
				});
			},
			handleCurrentChange1(val) {
				this.page1 = val;
				this.$axios.get('xyuser/findPageFrozen.do', {
					params: {
						page: this.page1,
						origin: window.location.origin
					}
				})
				.then(rs => {
					var qwe = Math.ceil(rs.data.count);
					this.totl1 = qwe;
					this.tableData = rs.data.xyuser
				}).catch(err => {
				});
			},
			handleOpen(key, keyPath) {
			},
			handleClose(key, keyPath) {
			},
			handleEdit(index, row) {
				var self = this;
				this.$confirm('此操作将冻结该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.$axios.get('xyuser/updateByUserIdF.do', {
						params: {
							userid: row.userid
						}
					})
					.then(rs => {
						self.$message({
							message: '操作成功',
							type: 'success',
							onClose: function() {
								self.reload();
							}
						})
					}).catch(err => {
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
			},
			handleEdit1(index, row) {
				var self = this;
				this.$confirm('此操作将解冻该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.$axios.get('xyuser/updateByUserIdNotF.do', {
						params: {
							userid: row.userid
						}
					})
					.then(rs => {
						self.$message({
							message: '操作成功',
							type: 'success',
							onClose: function() {
								self.reload();
							}
						})
					}).catch(err => {
						//console.log(err)
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
				//console.log(index, row);
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

			this.$axios.get('xyuser/findPageNotFrozen.do', {
				params: {
					page: self.page,
					origin: window.location.origin
				}
			})
			.then(rs => {
				var qwe = Math.ceil(rs.data.count);
				self.totl = qwe;
				//console.log(rs.data)
				this.tableData5 = rs.data.xyuser
			}).catch(err => {
				//console.log(err)
			});
			
			
			this.$axios.get('xyuser/findPageFrozen.do', {
				params: {
					page: self.page1,
					origin: window.location.origin
				}
			})
			.then(rs => {
				var qwe = Math.ceil(rs.data.count);
				self.totl1 = qwe;
				//console.log(rs.data)
				this.tableData = rs.data.xyuser
			}).catch(err => {
				//console.log(err)
			});
		}
	}
</script>

<style>
	.el-pagination__editor.el-input .el-input__inner {
		width: 50px;
	}
	.el-pagination .el-select .el-input .el-input__inner {
		width: 100px;
	}
	.el-tooltip__popper{
		max-width:50%
	}
	.el-icon-plus:before{
		top: 20px;
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
		background-color: white;
	}

	.el-main {
		min-width: 800px;
		min-height: 590px;
		overflow: hidden;
		background-color: #F2F6FC;
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
	
	.fy {
		text-align: center;
		margin-top: 20px;
	}
	
	.card {
		text-align: left;
		float: left;
		margin-left: 20px;
	}

	.item {
		margin-top: 30px;
	}

	.el-input__inner{
		width: 200px;
	}
</style>

<style lang="scss">
	.main-header {
		/* background-color: #07c4a8; */
		.el-dropdown {
			cursor: pointer;
			float: right;
		}
	}
</style>
