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
						<el-tab-pane label="视频管理">
								<el-table style="width: 100%" :data="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)">
									<el-table-column type="expand">
										<template slot-scope="props">
											<el-form label-position="left" inline class="demo-table-expand">
												<el-form-item label="视频ID"><span>{{ props.row.videoid }}</span></el-form-item>
												<el-form-item label="视频标题"><span>{{ props.row.title }}</span></el-form-item>
												<el-form-item label="视频名称"><span>{{ props.row.videoname }}</span></el-form-item>
												<el-form-item label="视频地址">
													<a :href="props.row.videourl" target="_blank" 
													style="display:inline-block; width:600px;overflow: hidden;word-break: keep-all;white-space: nowrap;text-overflow: ellipsis;">
													{{props.row.videourl}}</a>
												</el-form-item>
												<el-form-item label="视频截图">
													<img :preview="1" :src="props.row.picture" style="width: 250px; height: 170px;"/>
												</el-form-item>
												<el-form-item label="视频描述"><span>{{ props.row.videonote }}</span></el-form-item>
												<el-form-item label="类型"><span>{{ props.row.xyvideotype.typename }}</span></el-form-item>
												<el-form-item label="点击率"><span>{{ props.row.click }}</span></el-form-item>
												<el-form-item label="上传时间"><span>{{ props.row.time }}</span></el-form-item>
												<el-form-item label="上传用户"><span>{{ props.row.xyuser.username }}</span></el-form-item>
												<el-button type="text" @click="xiangqin(props.$index,props.row)">查看更多详情</el-button>
											</el-form>
										</template>
									</el-table-column>
									<el-table-column label="视频ID" prop="videoid" width="100px" sortable></el-table-column>
									<el-table-column :show-overflow-tooltip="true" label="搜索标签" prop="label"></el-table-column>
									<el-table-column :show-overflow-tooltip="true" label="视频标题" prop="title"></el-table-column>
									<el-table-column :show-overflow-tooltip="true" label="视频名称" prop="videoname"></el-table-column>
									<el-table-column :show-overflow-tooltip="true" label="视频地址">
									    <template slot-scope="scope">
											<a :href="scope.row.videourl" target="_blank" class="buttonText">{{scope.row.videourl}}</a>
									    </template>
									</el-table-column>
									<el-table-column label="上传时间" prop="time" sortable></el-table-column>
									<el-table-column label="上传用户" width="150px" prop="xyuser.username" sortable></el-table-column>
									<el-table-column align="right">
										<template slot="header" slot-scope="scope">
											<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
										</template>
										<template slot-scope="scope" width="200px">
											<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
											<!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
								
								<!-- <el-pagination class="fy"  @current-change="handleCurrentChange"  :current-page="page" background layout="prev, pager, next"
								 :total="totl" :page-size="5"></el-pagination> -->
								 
								<el-dialog title="编辑视频信息" :center="true" :fullscreen="true" :visible.sync="dialogFormVisible">
									<el-form style="margin-left: 35%;" :model="ruleForm" size="mini" ref="ruleForm" label-width="100px"
									 class="demo-ruleForm">
										<el-form-item label="视频名称" prop="videoname">
											<el-input style="width: 30%;" v-model="ruleForm.videoname"></el-input>
										</el-form-item>
										<el-form-item label="视频封面" prop="picture">
											<el-upload class="avatar-uploader" name="videopicture"
												action="http://111.230.247.223/SameBWeb/xyvideo/updateVideoPicture.do" 
												:show-file-list="false" 
												:on-success="handleAvatarSuccess" 
												accept="image/png,image/gif,image/jpg,image/jpeg" 
												:on-progress="uploadPhotoProcess">
												<img v-if=" ruleForm.picture != '' && photoFlag == false" style="height: 160px;width: 300px;" :src="ruleForm.picture" class="avatar">
												<i v-else-if="ruleForm.picture =='' && photoFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
												<el-progress v-if="photoFlag == true" type="circle" :percentage="photoUploadPercent" style="padding-left: 40px; margin-top:15px;width: 160px;" ></el-progress> 
											</el-upload>
										</el-form-item>
										<el-form-item label="上传视频" prop="videourl">
											<el-upload class="video-uploader" 
												name="videofile" 
												action="http://111.230.247.223/SameBWeb/xyvideo/updateVideo.do"
												:show-file-list="false" 
												:on-success="handleAvatarSuccess1" 
												:before-upload="beforeUploadVideo" 
												accept=".mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb"
												:on-progress="uploadVideoProcess">
												<video id="videofile" v-if=" ruleForm.videourl != '' && videoFlag == false" style="width: 280px;height: 160px;" :src="ruleForm.videourl" controls="controls"></video>
												<i v-else-if=" ruleForm.videourl =='' && videoFlag == false" class="el-icon-plus avatar-uploader-icon" ></i> 
												<el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="padding-left: 40px; margin-top:15px;width: 160px;"></el-progress>
											</el-upload>
										</el-form-item>
										<el-form-item label="上传时间" required>
											<el-col :span="5">
												<el-form-item prop="birthday">
													<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.time"></el-date-picker>
												</el-form-item>
											</el-col>
										</el-form-item>
										<el-form-item label="视频标签" prop="label">
											<el-input type="phone" style="width: 30%;" v-model="ruleForm.label"></el-input>
										</el-form-item>
										<el-form-item label="视频标题" prop="title">
											<el-input type="phone" style="width: 30%;" v-model="ruleForm.title"></el-input>
										</el-form-item>
										<el-form-item label="视频类型" prop="typeid">
											<el-select v-model="ruleForm.typeid" placeholder="请选择类型">
												<el-option v-for="item in type" :key="item.id" :label="item.typename" :value="item.typeid"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="视频时长" prop="timelong">
											<el-input style="width: 30%;" v-model="ruleForm.timelong"></el-input>
										</el-form-item>
										<el-form-item label="点赞" prop="clickup">
											<el-input style="width: 30%;" v-model="ruleForm.clickup"></el-input>
										</el-form-item>
										<el-form-item label="点击率" prop="click">
											<el-input style="width: 30%;" v-model="ruleForm.click"></el-input>
										</el-form-item>
										<el-form-item label="视频地址" prop="videourl">
											<el-input style="width: 30%;" v-model="ruleForm.videourl"></el-input>
										</el-form-item>
										<el-form-item label="视频描述" prop="videonote">
											<el-input type="textarea" style="width: 40%;" v-model="ruleForm.videonote"></el-input>
										</el-form-item>
										<el-form-item>
											<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
											<el-button @click="resetForm('ruleForm')">重置</el-button>
										</el-form-item>
									</el-form>
								</el-dialog>
								
								<el-dialog title="视频详情" :visible.sync="dialogTableVisible" top="30px" width="90%">
										<el-form label-position="left" inline style="" size="mini" class="yhxq">
											<el-form-item label="视频ID"><span>{{videoid}}</span></el-form-item>
											<el-form-item label="视频标题"><span>{{title}}</span></el-form-item>
											<el-form-item label="视频名称"><span>{{videoname}}</span></el-form-item>
											<el-form-item label="视频地址" overflow="hidden">
													<a :href="videourl" target="_blank" 
													style="display:inline-block; width:600px;overflow: hidden;word-break: keep-all;white-space: nowrap;text-overflow: ellipsis;">
													{{videourl}}</a>
											</el-form-item>
											<el-form-item label="视频截图">
												<img :src="picture" style="width: 250px;height: 170px;"/>
											</el-form-item>
											<el-form-item label="视频描述"><span>{{videonote}}</span></el-form-item>
											<el-form-item label="类型"><span>{{xyvideotype}}</span></el-form-item>
											<el-form-item label="点击率"><span>{{click}}</span></el-form-item>
											<el-form-item label="搜索标签"><span>{{label}}</span></el-form-item>
											<el-form-item label="审核状态"><span>{{checke}}</span></el-form-item>
											<el-form-item label="推荐的总次数"><span>{{commendcount}}</span></el-form-item>
											<el-form-item label="是否推荐"><span>{{iscommend}}</span></el-form-item>
											<el-form-item label="视频格式转换状态"><span>{{ischange}}</span></el-form-item>
										</el-form>
								</el-dialog>
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
				pageSize: 5, // 每页大小默认值
				pageIndex: 1, // 默认第一页
				expands: [],
				photoFlag:false,   
				videoFlag:false,
				photoUploadPercent: '0%', 
				videoUploadPercent: '0%',
				imageUrl: '',
				isCollapse: true,
				adminname: '',
				dialogTableVisible: false,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				fileList: [],
				type : [{
					typeid : '',
					typename : ''
				}],
				form : {
					name: '',
					desc: '',
				},
				ruleForm: {
					videoid: '',
					videoname: '',
					videourl: '',
					typeid: '',
					picture: '',
					click: '',
					clickup: '',
					videonote: '',
					time: '',
					title: '',
					label: '',
					timelong : '',
				},
				search: '',
				tableData5: [{
					userid : '',
					typeid : '',
					xyvideotype : [{typename:''}],
					title : '',
					time : '',
					picture : '',
					videoid: '',
					xyuser : [{username:''}],
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
				userid : '',
				typeid : '',
				xyvideotype : '',
				title : '',
				time : '',
				picture : '',
				videoid: '',
				xyuser : '',
				videoname: '',
				videourl: '',
				videonote: '',
				label: '',
				iscommend: '',
				ischange: '',
				commendcount: '',
				click: '',
				checke: '',
			};
		},
		methods: {
			beforeUploadVideo(file) { //视频上传之前判断他的大小
				const isLt10M = file.size / 1024 / 1024 < 2000;
				if (!isLt10M) {
					this.$message.error('上传视频大小不能超过2000MB哦!');
					return false;
				}
			},
			handleAvatarSuccess1(res, file) {
				//console.log(res)
				this.ruleForm.videourl = res.xyuser;
				this.ruleForm.timelong = res.timelong;
				this.videoFlag = false;
				this.videoUploadPercent = 0;
			},
			uploadVideoProcess(event, file, fileList) {
				this.videoFlag = true;
				this.videoUploadPercent = parseInt(file.percentage);
			},
			
			handleAvatarSuccess(res, file) {
				this.photoFlag = false;
				this.photoUploadPercent = 0;
				this.ruleForm.picture = res.xyuser;
			},
			uploadPhotoProcess(event, file, fileList){
				this.photoFlag = true;
				this.photoUploadPercent = parseInt(file.percentage);
			},
			handleOpen(key, keyPath) {
				//console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				//console.log(key, keyPath);
			},
			onSubmit() {
				//console.log('submit!');
			},
			handleEdit(index, row){
				this.dialogFormVisible = true;
				this.$axios.get('xyvideo/findById.do', {
						params: {
							videoid: row.videoid
						}
					})
					.then(rs => {
						this.ruleForm = rs.data.xyuser
					}).catch(err => {
						//console.log(err)
					})
				//console.log(index, row);
			},
			/* handleDelete(index, row) { //删除
				var self = this;
				this.$confirm('此操作将永久删除该视频, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => { 
					this.$axios.get('xyvideo/updateVideoNotPass.do', {
						params: {
							videoid : row.videoid
						}
					})
					.then(rs => {
						//console.log(rs)
						this.$message({
							message: '操作成功!',
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
						message: '已取消删除'
					});
				});
			}, */
			xiangqin(index, row) { //视频详情
				this.dialogTableVisible = true;
				this.$axios.get('xyvideo/findByIdcom.do', {
					params: {
						videoid: row.videoid
					}
				})
				.then(rs => {
					if (rs.data.xyuser.checke === "1") {
						rs.data.xyuser.checke = '审核通过'
					} else {
						rs.data.xyuser.checke = '审核未通过'
					}
					if (rs.data.xyuser.iscommend === "1") {
						rs.data.xyuser.iscommend = '推荐'
					} else {
						rs.data.xyuser.iscommend = '不推荐'
					}
					if (rs.data.xyuser.ischange === "1") {
						rs.data.xyuser.ischange = '已转换'
					} else {
						rs.data.xyuser.ischange = '未转换'
					}
					//console.log(rs.data)
					this.userid = rs.data.xyuser.userid;
					this.typeid = rs.data.xyuser.typeid;
					this.xyvideotype = rs.data.xyuser.xyvideotype.typename;
					this.title = rs.data.xyuser.title;
					this.time = rs.data.xyuser.time;
					this.picture = rs.data.xyuser.picture;
					this.videoid = rs.data.xyuser.videoid;
					this.videoname = rs.data.xyuser.videoname;
					this.videourl = rs.data.xyuser.videourl;
					this.videonote = rs.data.xyuser.videonote;
					this.label = rs.data.xyuser.label;
					this.iscommend = rs.data.xyuser.iscommend;
					this.ischange = rs.data.xyuser.ischange;
					this.commendcount = rs.data.xyuser.commendcount;
					this.click = rs.data.xyuser.click;
					this.checke = rs.data.xyuser.checke;
				}).catch(err => {
					//console.log(err)
				})
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var self = this;
						this.$axios({
							method: 'post',
							url: 'xyvideo/updateVideoByVideoIdBack.do',
							data: {
								videoid: self.ruleForm.videoid,
								videoname: self.ruleForm.videoname,
								videourl: self.ruleForm.videourl,
								time: self.ruleForm.time,
								picture: self.ruleForm.picture,
								click: self.ruleForm.click,
								timelong: self.ruleForm.timelong,
								clickup: self.ruleForm.clickup,
								videonote: self.ruleForm.videonote,
								typeid: self.ruleForm.typeid,
								title: self.ruleForm.title,
								label:self.ruleForm.label,
							},
							withCredentials: true,
						}).then(function(res) {
							self.$message({
								message: '修改成功',
								type: 'success',
								onClose: function() {
									self.reload();
								}
							})
						});
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
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

			/* this.$axios.get('xyvideo/findPage.do', {
				params: {
					page: self.page,
					origin: window.location.origin
				}
			})
			.then(rs => {
				var qwe = Math.ceil(rs.data.count);
				self.totl = qwe;
				//console.log(rs.data.xyuser)
				//console.log(rs.data)
				this.tableData5 = rs.data.xyuser
			}).catch(err => {
				//console.log(err)
			}); */
			
			this.$axios.get('xyvideo/findAll.do')
			.then(rs => {
				this.tableData5 = rs.data.xyuser
			}).catch(err => {
				//console.log(err)
			});
			
			this.$axios.get('xyvideotype/findAll.do') //查询视频类型
			.then(rs => {
				this.type = rs.data.xyvideotype
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
