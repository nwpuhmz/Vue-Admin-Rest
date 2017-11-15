<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'userAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">新增用户</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        @selection-change="on_batch_select"
        style="width: 100%;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="username"
          label="账号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          >
        </el-table-column>
        <el-table-column
          prop="roles"
          label="权限"
          >
          <template scope="props">           
            <div slot="reference" class="name-wrapper">
              <el-tag type="success" v-text="props.row.roles"></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template scope="props">
            <router-link :to="{name: 'userUpdate', params: {id: props.row.id}}" tag="span">
              <el-button type="info" size="small" icon="view">查看</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button
          type="danger"
          icon="delete"
          size="small"
          :disabled="batch_select.length === 0"
          @click="on_batch_del"
          slot="handler">
          <span>批量删除</span>
        </el-button>
        <div slot="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="count"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>

<script type="text/javascript">
import {panelTitle, bottomToolBar} from '@/components'

  export default{
    data(){
      return {
        table_data: [],
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        count: 20,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: []
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    created(){
      this.get_table_data()
    },
    methods: {
      //刷新
      on_refresh(){
        this.get_table_data()
      },
      //获取数据
      get_table_data(){ 
        this.load_data = true
        this.$fetch.api_user.listWithPage({
          page: this.currentPage,
          count: this.count
        })
          .then( res => {
            this.table_data = res.data
            this.currentPage = res.currentPage
            this.total = res.totalCount
            this.load_data = false
          })
          .catch((err) => {
            this.load_data = false
            this.$message.error(err.data.message);
          })
      },
      //单个删除
      delete_data(item){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            let para = { id: item.id };
            this.$fetch.api_user.del(para)
              .then( res => {
                this.get_table_data()
                this.$message.success("删除成功")
              })
              .catch(() => {
                this.load_data = false;                              
              })
          })
          .catch(() => {
                this.load_data = false;                          
          })
      },
      //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_table_data()
      },
      //批量选择
      on_batch_select(val){
        this.batch_select = val
      },
      //批量删除
      on_batch_del(){
        this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            let ids = this.batch_select.map(item => item.id);
            let para = { ids: ids };
            this.$fetch.api_item.batch_del(ids)
              .then(res => {
                this.load_data = false;                
                this.$message.success("批量删除成功")
                this.get_table_data()
              })
              .catch(() => {
                this.load_data = false;              
              })
          })
          .catch(() => {
            this.load_data = false;
          })
      }
    }
  }
</script>
