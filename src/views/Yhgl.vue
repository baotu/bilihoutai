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
					<el-tabs type="border-card">
						<el-tab-pane label="用户管理">
							<el-table style="width: 100%" :data="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)">
								<el-table-column type="expand">
									<template slot-scope="props">
										<el-form label-position="left" inline class="demo-table-expand">
											<el-form-item label="用户ID"><span>{{ props.row.userid }}</span></el-form-item>
											<el-form-item label="用户名"><span>{{ props.row.username }}</span></el-form-item>
											<!-- <el-form-item label="密码"><span>{{ props.row.password }}</span></el-form-item> -->
											<el-form-item label="等级"><span>{{ props.row.gradeid }}</span></el-form-item>
											<el-form-item label="总积分"><span>{{ props.row.totalintegral }}</span></el-form-item>
											<!-- <el-form-item label="可用积分"><span>{{ props.row.userfulintegral }}</span></el-form-item> -->
											<el-form-item label="邮箱"><span>{{ props.row.useremail }}</span></el-form-item>
											<el-form-item label="可用金币"><span>{{ props.row.usefulgold }}</span></el-form-item>
											<el-form-item label="是否冻结">
												<span v-if="props.row.freeze == 1">未冻结</span>
												<span v-else>已冻结</span>
											</el-form-item>
											<el-form-item label="最近登陆时间"><span>{{ props.row.time }}</span></el-form-item>
											<el-button type="text" @click="xiangqin(props.$index,props.row)">查看更多详情</el-button>
										</el-form>
									</template>
								</el-table-column>
								<el-table-column label="用户ID" prop="userid" sortable></el-table-column>
								<el-table-column label="用户名" prop="username"></el-table-column>
								<el-table-column label="等级" prop="gradeid" sortable></el-table-column>
								<el-table-column label="最近登陆时间" prop="time" sortable></el-table-column>
								<el-table-column label="是否冻结">
									<template slot-scope="header">
										<el-input size="mini" placeholder="是否冻结" />
									</template>
									<template slot-scope="props">
										<span v-if="props.row.freeze == 1">未冻结</span>
										<span v-else>已冻结</span>
									</template>
								</el-table-column>
								<el-table-column align="right">
									<template slot="header" slot-scope="scope">
										<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
									</template>
									<template slot-scope="scope" width="200px">
										<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
										<el-button v-if="scope.row.freeze == 1" size="mini" @click="handleDelete(scope.$index, scope.row)">冻结</el-button>
										<el-button v-else size="mini" @click="handleDelete(scope.$index, scope.row)">解冻</el-button>
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

							<el-dialog title="用户详情" :visible.sync="dialogTableVisible" top="30px" width="50%">
								<el-form label-position="left" inline style="margin-left: 12%;" size="mini" class="yhxq">
									<img style=" border-radius:50%;width: 140px;height: 140px;margin-left: 28%;margin-bottom: 20px;" :src="userphoto" />
									<br />
									<el-form-item style="margin-left: 0px;" label="用户ID"><span>{{ userid }}</span></el-form-item>
									<el-form-item label="用户名"><span>{{ username }}</span></el-form-item>
									<el-form-item label="密码">
										<input id="pass" type="password" @click="dj" :value="password" :readonly="true" style="border:none;"/>
									</el-form-item>
									<el-form-item label="生日"><span>{{ birthday }}</span></el-form-item>
									<el-form-item label="性别"><span>{{ sex }}</span></el-form-item>
									<el-form-item label="电话"><span>{{ phone }}</span></el-form-item>
									<el-form-item label="学历"><span>{{ schooling }}</span></el-form-item>
									<el-form-item label="个人月收入"><span>{{ monthincoming }}</span></el-form-item>
									<el-form-item label="所在城市"><span>{{ city }}</span></el-form-item>
									<el-form-item label="职业"><span>{{ work }}</span></el-form-item>
									<el-form-item label="家庭月收入"><span>{{ homeincoming }}</span></el-form-item>
									<el-form-item label="QQ"><span>{{ qq }}</span></el-form-item>
									<el-form-item label="MSN"><span>{{ msn }}</span></el-form-item>
									<el-form-item label="等级"><span>{{ gradeid }}</span></el-form-item>
									<el-form-item label="总积分"><span>{{ totalintegral }}</span></el-form-item>
									<!-- <el-form-item label="可用积分"><span>{{ userfulintegral }}</span></el-form-item> -->
									<el-form-item label="邮箱"><span>{{ useremail }}</span></el-form-item>
									<el-form-item label="可用金币"><span>{{ usefulgold }}</span></el-form-item>
									<el-form-item label="是否冻结"><span>未冻结</span></el-form-item>
									<el-form-item label="最近登陆时间"><span>{{ time }}</span></el-form-item>
								</el-form>
							</el-dialog>

							<el-dialog title="编辑用户信息" :center="true" :fullscreen="true" :visible.sync="dialogFormVisible">
								<el-form style="margin-left: 35%;" :model="ruleForm" size="mini" :rules="rules" ref="ruleForm" label-width="100px"
								 class="demo-ruleForm">
									<el-form-item label="用户名" prop="username">
										<el-input style="width: 30%;" v-model="ruleForm.username" :readonly="true"></el-input>
									</el-form-item>
									<el-form-item label="用户照片" prop="userphoto">
										<el-upload class="avatar-uploader" name="userphoto"
											action="http://111.230.247.223/SameBWeb/xyuserinfo/updateHeadBack.do"
											:show-file-list="false" 
											:on-success="handleAvatarSuccess" 
											accept="image/png,image/gif,image/jpg,image/jpeg" 
											:on-progress="uploadPhotoProcess">
											<img v-if=" ruleForm.userphoto != '' && photoFlag == false" style="width: 200px;" :src="ruleForm.userphoto" class="avatar">
											<i v-else-if="ruleForm.userphoto =='' && photoFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
											<el-progress v-if="photoFlag == true" type="circle" :percentage="photoUploadPercent" style="padding-left: 40px; margin-top:15px;width: 160px;" ></el-progress> 
										</el-upload>
									</el-form-item>
									<el-form-item label="所在城市" prop="city">
										<el-select v-model="ruleForm.city" placeholder="请选择所在城市">
											<el-option label="上海" value="上海"></el-option>
											<el-option label="北京" value="北京"></el-option>
											<el-option label="永州" value="永州"></el-option>
											<el-option label="长沙" value="长沙"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="生日" required>
										<el-col :span="5">
											<el-form-item prop="birthday">
												<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday"></el-date-picker>
											</el-form-item>
										</el-col>
									</el-form-item>
									<el-form-item label="性别" prop="sex">
										<el-radio-group v-model="ruleForm.sex">
											<el-radio label="男" value="男"></el-radio>
											<el-radio label="女" value="女"></el-radio>
										</el-radio-group>
									</el-form-item>
									<el-form-item label="邮箱" prop="useremail">
										<el-input style="width: 30%;" v-model="ruleForm.useremail" :readonly="true"></el-input>
									</el-form-item>
									<el-form-item label="用户签名" prop="usershow">
										<el-input style="width: 30%;" v-model="ruleForm.usershow"></el-input>
									</el-form-item>
									<el-form-item label="电话" prop="phone">
										<el-input type="phone" style="width: 30%;" v-model="ruleForm.phone"></el-input>
									</el-form-item>
									<el-form-item label="学历" prop="schooling">
										<el-select v-model="ruleForm.schooling" placeholder="请选择学历">
											<el-option label="博士" value="博士"></el-option>
											<el-option label="研究生" value="研究生"></el-option>
											<el-option label="本科" value="本科"></el-option>
											<el-option label="大专" value="大专"></el-option>
											<el-option label="高中及以下" value="高中及以下"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="个人月收入" prop="monthincoming">
										<el-input style="width: 30%;" v-model.number="ruleForm.monthincoming"></el-input>
									</el-form-item>
									<el-form-item label="职业" prop="work">
										<el-input style="width: 30%;" v-model="ruleForm.work"></el-input>
									</el-form-item>
									<el-form-item label="家庭月收入" prop="homeincoming">
										<el-input style="width: 30%;" v-model.number="ruleForm.homeincoming"></el-input>
									</el-form-item>
									<el-form-item label="QQ" prop="qq">
										<el-input style="width: 30%;" v-model="ruleForm.qq"></el-input>
									</el-form-item>
									<el-form-item label="MSN" prop="msn">
										<el-input style="width: 30%;" v-model="ruleForm.msn"></el-input>
									</el-form-item>
									<el-form-item>
										<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
										<el-button @click="resetForm('ruleForm')">重置</el-button>
									</el-form-item>
								</el-form>
							</el-dialog>
						</el-tab-pane>
						
						<el-tab-pane label="添加用户">
							<el-form status-icon ref="form" :model="form" :rules="rules1" label-width="80px">
								<el-col :span="10">
									<el-form-item label="用户名" prop="username">
										<el-input v-model="form.username" autocomplete="off"></el-input>
									</el-form-item>
									<el-form-item label="密码" prop="password">
										<el-input type="password" v-model="form.password" autocomplete="off"></el-input>
									</el-form-item>
									<el-form-item label="邮箱" prop="useremail">
										<el-input v-model="form.useremail" autocomplete="off"></el-input>
									</el-form-item>
									<el-form-item>
										<el-button type="primary" @click="onSubmit('form')">提交</el-button>
										<el-button @click="resetForm1('form')">重置</el-button>
									</el-form-item>
								</el-col>
							</el-form>
						</el-tab-pane>
						
						<el-tab-pane v-if="adminid === 1 " label="添加管理员">
							<el-form status-icon ref="form1" :model="form1" :rules="rules2" label-width="80px">
								<el-col :span="10">
									<el-form-item label="用户名" prop="adminname">
										<el-input v-model="form1.adminname" autocomplete="off"></el-input>
									</el-form-item>
									<el-form-item label="密码" prop="adminpassword">
										<el-input type="password" v-model="form1.adminpassword" autocomplete="off"></el-input>
									</el-form-item>
									<el-form-item>
										<el-button type="primary" @click="onSubmit1('form1')">提交</el-button>
										<el-button @click="resetForm2('form1')">重置</el-button>
									</el-form-item>
								</el-col>
							</el-form>
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
				photoFlag:false,    
				photoUploadPercent: '0%', 
				imageUrl: '',
				expands: [],
				isCollapse: true,
				adminid : '',
				adminname: '',
				dialogTableVisible: false,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				form: {
					username: '',
					password: '',
					useremail: '',
				},
				form1: {
					adminname: '',
					adminpassword: '',
				},
				rules1: {
					username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
					password: [{ required: true, message: '请选择密码', trigger: 'change' }],
					useremail: [{ type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'change' }],
				},
				rules2: {
					adminname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
					adminpassword : [{ required: true, message: '请选择密码', trigger: 'change' }],
				},
				ruleForm: {
					userid: '',
					username: '',
					userphoto: '',
					city: '',
					birthday: '',
					sex: '男',
					phone: '',
					useremail: '',
					usershow: '',
					schooling: '',
					monthincoming: '',
					work: '',
					homeincoming: '',
					qq: '',
					msn: ''
				},
				rules: {
					username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' } ],
					city: [{
						required: true,
						message: '请选择城市',
						trigger: 'change'
					}],
					birthday: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					usershow: [{
						trigger: 'blur'
					}],
					useremail: [{
						required: true,
						type: 'email',
						message: '请输入正确的邮箱格式',
						trigger: 'blur'
					}],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					phone: [{
						required: true,
						message: '请填写电话',
						trigger: 'blur'
					}],
					schooling: [{
						message: '请选择学历',
						trigger: 'change'
					}],
					work: [{
						trigger: 'blur'
					}],
					qq: [{
						trigger: 'blur'
					}],
					msn: [{
						trigger: 'blur'
					}]
				},
				search: '',
				tableData5: [{
					userid: '',
					username: '',
					password: '',
					gradeid: '',
					totalintegral: '',
					userfulintegral: '',
					useremail: '',
					usefulgold: '',
					freeze: '',
					time: '',
				}],
				page: 1,
				totl: 0,
				userid: '',
				username: '',
				password: '',
				gradeid: '',
				totalintegral: '',
				userfulintegral: '',
				useremail: '',
				usefulgold: '',
				freeze: '',
				time: '',
				birthday: '',
				city: '',
				homeincoming: '',
				monthincoming: '',
				msn: '',
				phone: '',
				qq: '',
				schooling: '',
				sex: '',
				usershow: '',
				userphoto: '',
				work: '',
			};
		},
		methods: {
			dj(){
				var pass = document.getElementById("pass");
				if (pass.type == "password") {
					pass.type = "text";
				}else {
					pass.type = "password";
				}
			},
			xiangqin(index, row) {
				this.dialogTableVisible = true;
				this.$axios.get('xyuser/findUserinfoById.do', {
						params: {
							userid: row.userid
						}
					})
					.then(rs => {
						this.userid = rs.data.xyuser.userid;
						this.username = rs.data.xyuser.username;
						this.password = rs.data.xyuser.password;
						this.gradeid = rs.data.xyuser.gradeid;
						if (rs.data.xyuser.freeze === 1) {
							rs.data.xyuser.freeze = '未冻结'
						} else {
							rs.data.xyuser.freeze = '已冻结'
						}
						this.freeze = rs.data.xyuser.freeze;
						this.totalintegral = rs.data.xyuser.totalintegral;
						this.userfulintegral = rs.data.xyuser.userfulintegral;
						this.useremail = rs.data.xyuser.useremail;
						this.usefulgold = rs.data.xyuser.usefulgold;
						this.time = rs.data.xyuser.time;
						this.birthday = rs.data.xyuser.xyuserinfo.birthday;
						this.city = rs.data.xyuser.xyuserinfo.city;
						this.homeincoming = rs.data.xyuser.xyuserinfo.homeincoming;
						this.monthincoming = rs.data.xyuser.xyuserinfo.monthincoming;
						this.msn = rs.data.xyuser.xyuserinfo.msn;
						this.phone = rs.data.xyuser.xyuserinfo.phone;
						this.qq = rs.data.xyuser.xyuserinfo.qq;
						this.schooling = rs.data.xyuser.xyuserinfo.schooling;
						this.sex = rs.data.xyuser.xyuserinfo.sex;
						this.usershow = rs.data.xyuser.xyuserinfo.usershow;
						this.work = rs.data.xyuser.xyuserinfo.work;
						this.userphoto = rs.data.xyuser.xyuserinfo.userphoto;
					}).catch(err => {
						//console.log(err)
					})
			},
			handleAvatarSuccess(res, file) {
				this.photoFlag = false;
				this.photoUploadPercent = 0;
				this.ruleForm.userphoto = res.xyuser;
			},
			uploadPhotoProcess(event, file, fileList){
				this.photoFlag = true;
				this.photoUploadPercent = parseInt(file.percentage);
				//console.log(this.photoUploadPercent)
			},
			handleOpen(key, keyPath) {
				//console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				//console.log(key, keyPath);
			},
			handleEdit(index, row) { //根据userid查询
				this.dialogFormVisible = true;
				this.$axios.get('xyuser/findUserinfoById.do', {
					params: {
						userid: row.userid
					}
				})
				.then(rs => {
					this.ruleForm.userid = rs.data.xyuser.userid;
					this.ruleForm.username = rs.data.xyuser.username;
					this.ruleForm.userphoto = rs.data.xyuser.xyuserinfo.userphoto;
					this.ruleForm.city = rs.data.xyuser.xyuserinfo.city;
					this.ruleForm.birthday = this.toDate(rs.data.xyuser.xyuserinfo.birthday);
					this.ruleForm.sex = rs.data.xyuser.xyuserinfo.sex;
					this.ruleForm.phone = rs.data.xyuser.xyuserinfo.phone;
					this.ruleForm.useremail = rs.data.xyuser.useremail;
					this.ruleForm.usershow = rs.data.xyuser.xyuserinfo.usershow;
					this.ruleForm.schooling = rs.data.xyuser.xyuserinfo.schooling;
					this.ruleForm.monthincoming = rs.data.xyuser.xyuserinfo.monthincoming;
					this.ruleForm.work = rs.data.xyuser.xyuserinfo.work;
					this.ruleForm.homeincoming = rs.data.xyuser.xyuserinfo.homeincoming;
					this.ruleForm.qq = rs.data.xyuser.xyuserinfo.qq;
					this.ruleForm.msn = rs.data.xyuser.xyuserinfo.msn;
				}).catch(err => {
					//console.log(err)
				})
			},
			onSubmit(formName) {  //新增用户
				var self = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$axios.post('xyuser/insertuser.do', {
								username: this.form.username,
								password: this.form.password,
								useremail: this.form.useremail,
								origin: window.location.origin
							})
							.then(rs => {
								this.$notify({
									title: '添加成功',
									message: '新增用户成功',
									type: 'success',
									onClose: function() {
										self.reload();
									}
								});
							}).catch(err => {
								//console.log(err)
								this.$notify.error({
									title: '错误',
									message: '新增用户失败'
								});
							})
					} else {
						//console.log('error submit!!');
						return false;
					}
				});
			},
			onSubmit1(formName) {  //新增管理员
				var self = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$axios.get('xyadministrator/insertByAdmin.do', {
							params:{
								adminname: this.form1.adminname,
								adminpassword: this.form1.adminpassword,
							}
						})
						.then(rs => {
							this.$notify({
								title: '添加成功',
								message: '新增管理员成功',
								type: 'success',
								onClose: function() {
									self.reload();
								}
							});
						}).catch(err => {
							//console.log(err)
							this.$notify.error({
								title: '错误',
								message: '新增用户失败'
							});
						})
					} else {
						//console.log('error submit!!');
						return false;
					}
				});
			},
			handleDelete(index, row) {   //冻结或解冻用户
				var self = this;
				if(row.freeze == 1){
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
							//console.log(err)
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消操作'
						});
					});
				}else{
					this.$confirm('此操作将解除此冻结用户, 是否继续?', '提示', {
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
				}
			},
			submitForm(formName) {  //提交修改用户信息
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var self = this;
						this.$axios({
							method: 'post',
							url: 'xyuserinfo/updateByUserId.do',
							data: {
								userid: self.ruleForm.userid,
								userphoto: self.ruleForm.userphoto,
								city: self.ruleForm.city,
								birthday: this.format(self.ruleForm.birthday),
								sex: self.ruleForm.sex,
								phone: self.ruleForm.phone,
								usershow: self.ruleForm.usershow,
								schooling: self.ruleForm.schooling,
								monthincoming: self.ruleForm.monthincoming,
								work: self.ruleForm.work,
								homeincoming: self.ruleForm.homeincoming,
								qq: self.ruleForm.qq,
								msn: self.ruleForm.msn
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
			resetForm(formName) { //重置
				this.$refs[formName].resetFields();
			},
			resetForm1(formName) {
				this.$refs[formName].resetFields();
			},
			resetForm2(formName) {
				this.$refs[formName].resetFields();
			},
			logout() { //退出
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
								self.$router.push({
									path: '/login'
								});
							}
						})
					}).catch(err => {
						//console.log(err)
					})
				}).catch(() => {
					//console.log(err)
				})
			},
			format(Date) { 				// date 转 string
				var Y = Date.getFullYear();
				var M = Date.getMonth() +1;
				M = M < 10 ? '0' + M : M; // 不够两位补充0
				var D = Date.getDate();
				D = D < 10 ? '0' + D : D;
				return Y + '-' + M + '-' + D;
			},
			toDate(dateString) { 		//string 转 date
				var DATE_REGEXP = new RegExp("(\\d{4})-(\\d{2})-(\\d{2})([T\\s](\\d{2}):(\\d{2}):(\\d{2})(\\.(\\d{3}))?)?.*");
				if (DATE_REGEXP.test(dateString)) {
					var timestamp = dateString.replace(DATE_REGEXP, function($all, $year, $month, $day, $part1, $hour, $minute,
						$second, $part2, $milliscond) {
						var date = new Date($year, $month-1, $day, $hour || "00", $minute || "00", $second || "00", $milliscond || "00");
						return date.getTime();
					});
					var date = new Date();
					date.setTime(timestamp);
					return date;
				}
				return null;
			},
			fomat (val) {
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
			this.$axios.get('xyadministrator/findSession.do')
			.then(rs => {
				self.adminid = rs.data.xyuser.adminid;
				self.adminname = rs.data.xyuser.adminname;
				if (self.adminname === '') {
					self.$router.push({ path: '/login' });
				}
			}).catch(err => {
				//console.log(err)
			});

			
			this.$axios.get('xyuser/findAll.do')
			.then(rs => {
				this.tableData5 = rs.data.xyuser
				//console.log(rs.data.xyuser)
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
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 150px;
		height: 150px;
		line-height: 150px;
		text-align: center;
	}

	.avatar {
		width: 150px;
		height: 150px;
		display: block;
	}

	.el-icon-plus:before {
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

	.el-input__inner {
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
