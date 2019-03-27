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
				<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :unique-opened="true" :collapse="isCollapse" :router="true">
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
					<el-tabs type="border-card">
						<el-tab-pane label="所有视频">
							<el-table style="width: 100%" :data="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)">
								<el-table-column label="视频ID" prop="videoid" width="100px" sortable></el-table-column>
								<el-table-column :show-overflow-tooltip="true" label="搜索标签" prop="label"></el-table-column>
								<el-table-column :show-overflow-tooltip="true" label="视频标题" prop="title" sortable></el-table-column>
								<el-table-column :show-overflow-tooltip="true" label="视频名称" prop="videoname"></el-table-column>
								<el-table-column align="right">
									<template slot="header" slot-scope="scope">
										<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
									</template>
									<template slot-scope="scope" width="200px">
										<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看评论</el-button>
									</template>
								</el-table-column>
							</el-table>
						
							<el-pagination
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="pageIndex"
								:page-sizes="[5, 6, 7, 8]"
								:page-size="pageSize"
								layout="total, sizes, prev, pager, next, jumper"
								:total="total">
							</el-pagination>
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
		data() {
			return {
				pageSize: 5, // 每页大小默认值
				pageIndex: 1, // 默认第一页
				isCollapse: true,
				adminname: '',
				search: '',
				tableData5: [{
					userid : '',
					typeid : '',
					title : '',
					time : '',
					picture : '',
					videoid: '',
					videoname: '',
					videourl: '',
					videonote: '',
					label: '',
					iscommend: '',
					ischange: '',
					commendcount: '',
					click: '',
					checke: '',
				}],
				page: 1,
				totl: 0,
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				//console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				//console.log(key, keyPath);
			},
			handleEdit(index, row) {
				//console.log(row.videoid)
				this.$router.push({path : '/videopl',query:{ videoid : row.videoid}})
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
			},
			format (val) {
				val = val.toString()
				if (val.indexOf(this.search) !== -1 && this.search !== '') {
					return val.replace(this.search, '<font color="red">' + this.search + '</font>')
				} else {
					return val
				}
			},
			handleSizeChange (val) {
				this.pageSize = val
			},
			handleCurrentChange (val) {
				this.pageIndex = val
			},
			siteTableHeader () {
				return 'sws-table-header'
			},
			tableRowClassName ({ row, rowIndex }) {
				if (rowIndex % 2) {
					return 'warning-row'
				} else {
					return 'success-row'
				}
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

			this.$axios.get('xyvideo/findAll.do')
			.then(rs => {
				this.tableData5 = rs.data.xyuser
			}).catch(err => {
				//console.log(err)
			});
		},
		computed: {
			// 前端过滤
			tables () {
			  const search = this.search
			  if (search) {
				return this.tableData5.filter(dataNews => {
				  return Object.keys(dataNews).some(key => {
					return String(dataNews[key]).toLowerCase().indexOf(search) > -1
				  })
				})
			  }
			  return this.tableData5
			},
			// 总条数
			total () {
			  return this.tables.length
			}
		},
		watch: {
		   // 检测表格数据过滤变化，自动跳到第一页
			tables () {
			  this.pageIndex = 1
			}
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

	.fy {
		text-align: center;
		margin-top: 20px;
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
