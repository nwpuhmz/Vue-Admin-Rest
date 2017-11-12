<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
           <el-form :inline="false" ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="飞机号:" prop="flight">
              <el-select v-model="form.flight" placeholder="选择飞机号" >
               <el-option-group
                  v-for="group in flight_options"
                  :key="group.label"
                  :label="group.label">
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                 </el-option>
               </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item label="类型:" prop="flightFx_Hx_DM">
               <el-select v-model="form.flightFx_Hx_DM" filterable placeholder="选择飞行类型" >
                    <el-option
                      v-for="item in flightFx_Hx_DM_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="飞行架次:" prop="flight_count" style="width: 80%;">
              <el-input v-model="form.flight_count" number></el-input>
            </el-form-item>
            <el-form-item label="飞行日期:" prop="flightDate">
              <el-date-picker
                v-model="form.flightDate"
                type="date"
                format="yyyy-MM-dd"
                :editable="false"    
                 @change="on_change_flightDate"     
                placeholder="2017-01-01">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="起止时间:" prop="start_end_time">
               <el-time-picker
                  is-range
                  v-model="form.start_end_time"
                  placeholder="选择时间范围">
                </el-time-picker>
            </el-form-item>
            <el-form-item label="盘号:" prop="ssd_number">
               <el-select v-model="form.ssd_number" filterable placeholder="选择盘号" >
                    <el-option
                      v-for="item in ssd_number_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="文件号:" prop="file_number">
               <el-select v-model="form.file_number" filterable placeholder="选择文件号" >
                    <el-option
                      v-for="item in file_number_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="数据类型:" prop="dataType">
               <el-select v-model="form.dataType" multiple placeholder="数据类型">
                  <el-option
                    v-for="item in dataType_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="item_desc">
              <el-input type="textarea" v-model="form.item_desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交</el-button>
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
          flight: '',
          flightFx_Hx_DM: '',
          flight_count:null,
          flightDate: '',
          start_end_time:[],
          ssd_number:'',
          file_number:'',
          dataType: [],
          item_desc:''
        },
        route_id: this.$route.params.id,
        rules: {
          flight: [{required: true, message: '型号不能为空', trigger: 'change'}],
          flightFx_Hx_DM: [{required: true, message: '飞行类型不能为空', trigger: 'change'}],
          flight_count: [{type:'number',required: true, message: '架次不能为空', trigger: 'blur'}],
          flightDate: [{required: true, message: '飞行日期不能为空', trigger: 'change'}],
          start_end_time: [{type: 'array',required: true, message: '飞行起始时间不能为空', trigger: 'change'}],
          ssd_number: [{required: true, message: '盘号不能为空', trigger: 'change'}],
          file_number: [{required: true, message: '文件号不能为空', trigger: 'change'}],
          dataType: [{type: 'array',required: true, message: '数据类型不能为空', trigger: 'change'}]
        },
        load_data: false,
        on_submit_loading: false,
        flight_options: [{
          label: '型号1',
          options: [{
            value: '型号1_001',
            label: '型号1_001'
          }, {
            value: '型号1_002',
            label: '型号1_001'
          }]
        }, {
          label: '型号2',
          options: [{
            value: '型号2_001',
            label: '型号2_001'
          }, {
            value: '型号2_002',
            label: '型号2_002'
          }, {
            value: '型号2_003',
            label: '型号2_001'
          }, {
            value: '型号2_0014',
            label: '型号2_004'
          }]
        }],
        flightFx_Hx_DM_options: [{
          value: 'Fx',
          label: 'Fx'
        }, {
          value: 'Hx',
          label: 'Hx'
        }, {
          value: 'Dm',
          label: 'Dm'
        }],
        dataType_options:[
          {
          value: 'Pcm',
          label: 'Pcm'
        }, {
          value: 'Enet',
          label: 'Enet'
        }, {
          value: 'Anolog',
          label: 'Anolog'
        },{
          value: '1553B',
          label: '1553B'
        }],
        ssd_number_options:[
          {
          value: 'No.123123',
          label: 'No.123123'
        }, {
          value: 'No.222',
          label: 'No.222'
        }, {
          value: 'No.666',
          label: 'No.666'
        }
        ],
        file_number_options:[
           {
          value: '1',
          label: 'file1'
        }, {
          value: '2',
          label: 'file2'
        }, {
          value: '3',
          label: 'file3'
        }
        ]
      }
    },
    created(){
      this.route_id && this.get_form_data()
    },
    methods: {
      //获取数据
      get_form_data(){
        this.load_data = true
        this.$fetch.api_item.get({
          id: this.route_id
        })
          .then((res) => {
            console.log('get form data',res);
            let res_form = res;
            res_form.dataType = JSON.parse(res.dataType)
            res_form.start_end_time = JSON.parse(res.start_end_time)
            this.form = res_form
            this.load_data = false
          })
          .catch(() => {
            console.log('get form data');            
            this.load_data = false
          })
      },
      //时间选择改变时
       on_change_flightDate(val){
        this.$set(this.form, 'flightDate', val)
      },
      //提交
      on_submit_form(){
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          let post_form = this.form
          post_form.start_end_time = JSON.stringify(this.form.start_end_time)
          post_form.dataType = JSON.stringify(this.form.dataType)          
          this.$fetch.api_item.save(post_form)
            .then((res) => {
              this.$message.success("操作成功")
              setTimeout(this.$router.back(), 500)
            })
            .catch(() => {
              this.on_submit_loading = false
            })
        })
      }
    },
    components: {
      panelTitle
    }
  }
</script>
