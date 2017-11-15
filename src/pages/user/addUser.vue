<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
       
    </panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
           <el-form :inline="false" ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="用户名:" prop="username">
              <el-input v-model="form.username" :disabled="isView"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input v-model="form.password" :disabled="isView"></el-input>
            </el-form-item>
            <el-form-item label="权限:" prop="roles">
               <el-select v-model="form.roles" multiple placeholder="权限" :disabled="isView">
                  <el-option
                    v-for="item in roles_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading" :disabled="isView">立即提交</el-button>
              <el-button type="danger" @click="on_reset_form" :disabled="isView">重置</el-button> 
              <el-button type="primary" @click="on_edit_form" :disabled="!isView">编辑</el-button>             
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>

           </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/javascript">
import {panelTitle, bottomToolBar} from '@/components'

  export default{
    data(){
      return {
        form: {
          username: '',
          password: '',
          roles: []
        },
        isView:true,
        route_id: this.$route.params.id,
        rules: {
 
        },
        load_data: false,
        on_submit_loading: false,
        roles_options:[
          {
          value: 'ROLE_user',
          label: '普通用户'
        }, {
          value: 'ROLE_admin',
          label: '管理员'
        }]
      }
    },
    created(){
     // this.route_id && this.get_form_data()
      if(this.route_id)
        this.get_form_data()
       else{
         this.isView = false;
        }
    },
    methods: {
      //获取数据
      get_form_data(){
        this.load_data = true
        this.$fetch.api_user.get({
          id: this.route_id
        })
          .then((res) => {
            console.log('get form data',res);
            let res_form = res;
           // res_form.roles = JSON.parse(res.roles)         
            this.form = res_form
            this.load_data = false
          })
          .catch(() => {
            console.log('get form data');            
            this.load_data = false
          })
      },

      //提交
      on_submit_form(){
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          let post_form = this.form
          //post_form.roles = JSON.stringify(this.form.roles)     

          if(this.route_id)
          {
            this.$fetch.api_user.update(post_form)
                    .then((res) => {
                      this.$message.success("操作成功")
                      setTimeout(this.$router.back(), 500)
                    })
                    .catch(() => {
                      this.on_submit_loading = false
                    })
          }else{
            this.$fetch.api_user.save(post_form)
                    .then((res) => {
                      this.$message.success("操作成功")
                      setTimeout(this.$router.back(), 500)
                    })
                    .catch(() => {
                      this.on_submit_loading = false
                    })
          }   
        })
      },
           //提交
      on_reset_form(){
       this.$refs.form.resetFields();
      },
      //编辑
      on_edit_form(){
        this.isView = false;
      }
    },
    components: {
      panelTitle
    }
  }
</script>
