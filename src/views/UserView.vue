<template>
  <div class="user"> 
   <h1>This is an user page</h1>
      
       <!-- 左侧按钮 -->
       <el-row class="leftButton">
      <el-button type="primary" round  @click="addClick()">新添数据</el-button>
      <el-button type="primary" round @click="dialogTableVisible = true">查看详情</el-button>
    </el-row>


        <!-- 详情Table查看 -->
        <el-dialog title="查看详情" :visible.sync="dialogTableVisible" class="dialog">
      <el-table :data="users">
        <el-table-column property="id" label="序号" class="leng"></el-table-column>
        <el-table-column property="phone" label="账号" class="leng"></el-table-column>
        <el-table-column property="pass" label="密码" class="leng"></el-table-column>
      
      </el-table>
    </el-dialog>

            
     <!-- 新添Form -->  
     <el-dialog title="新添数据信息" :visible.sync="dialogFormVisible"  @close="resetForm('addForm')">
      <h4> 要记得填写内容噢</h4>
      <el-form :model="user" ref='addForm'>
        <!-- <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="teacher.id" autocomplete="off"></el-input>
        </el-form-item> -->

        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="user.phone" autocomplete="off"  placeholder="请输入账号"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.pass" autocomplete="off"  placeholder="请输入密码"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>


   <!-- 主表格 -->
   <el-table
      :data="users"
      size="small"
      style="width: 100%;"
      @cell-mouse-enter="handleCellEnter"
      @cell-mouse-leave="handleCellLeave"
    >
      <el-table-column
        prop="id"
        label="序号"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.id" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.id}}</div> -->
        </div>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="账号"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.phone" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.phone}}</div> -->
        </div>
      </el-table-column>
      <el-table-column
        prop="pass"
        label="密码"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.pass" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.pass}}</div> -->
        </div>
      </el-table-column>
      

      <el-table-column
        label="操作"
        class="leng">
        <template slot-scope="scope">
          <el-button @click="handleSaveClick(scope.row)" type="primary" plain size="small">保存</el-button>
          <el-button type="danger" plain size="small" @click="handleDeleteClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

  
</template>

<script>
import axios from "axios"
export default {


    methods: {
      handleClick(row) {
        console.log(row);
      }, 

      // 清空新添表单
      resetForm(form){

        this.user.phone='';
        this.user.pass='';

        // 关键就是这句话！
        this.$refs[form].clearValidate();
      },
      cancel() {
        this.dialogFormVisible = false;
        console.log("cancel");

      },
      confirm(){
        this.dialogFormVisible = false;
        console.log("confirm");
        console.log(this.user);

        axios.post('http://8.130.32.153:8090/users', {
          phone: this.user.phone,
          pass: this.user.pass,
      })
        .then(response => {
        console.log(response);
        // alert("新添成功");
        alert(`请点击该条新建数据后的"保存按钮"去刷新加密效果噢`);
        this.open3();
        this.getlist();
        


        })
        .catch(error => {
        console.log(error);
        });

      },

      // 新添按钮
      addClick(){
        // console.log("add");
        this.dialogFormVisible = true;
      },

      /** 鼠标移入cell */
    handleCellEnter (row, column, cell, event) {
      const property = column.property
      if (this.editProp.includes(property)) {
        cell.querySelector('.item__input').style.display = 'block'
        cell.querySelector('.item__txt').style.display = 'none'
      }
    },
    /** 鼠标移出cell */
    handleCellLeave (row, column, cell, event) {
      const property = column.property
      if (this.editProp.includes(property)) {
        // cell.querySelector('.item__input').style.display = 'none'
        cell.querySelector('.item__txt').style.display = 'block'
      }
    },
    handleSaveClick(row){
      console.log(row)
      console.log(row.id)
      console.log(row.phone)
      console.log(row.pass)
      axios.put('http://8.130.32.153:8090/users', {
        id: row.id,
        phone: row.phone,
        pass: row.pass,
      })
      .then(response => {
        console.log(response);
        // alert("修改成功");
        this.open2();
        this.getlist();
      })
      .catch(error => {
        console.log(error);
      });
    },
    open3() {
        this.$message({
          message: '新添成功',
          type: 'success',
          duration:2000
        });
      },
    open2() {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration:2000
        });
      },

      handleDeleteClick(row) {
        console.log(row);
        console.log("delete");
        console.log(row.id)
        axios
          .delete(`http://8.130.32.153:8090/users/${row.id}`)
          .then((response) =>{
            alert("删除成功");
            console.log(response.data);
            this.getlist();
          })
          .catch((error) =>{
            console.log(error);
          })
      },
      getlist(){
        // http://8.130.32.153:8090/users
        axios
          .get("http://8.130.32.153:8090/users")
          .then((response) =>{
            console.log(response.data);
            this.users = response.data;
            console.log("users=",this.users)
          })
          .catch((error) =>{
            console.log(error);
          })
      },

    },
    mounted(){
      this.getlist();
      this.$message({
          duration:2000,
          type: 'warning',
          message: '在新添用户后记得要点击“保存”按钮去使用加密功能噢',
        });
    },  
    computed: {
      foodLabel () {
        return (val) => {
          return this.options.find(o => o.value === val).label
        }
      }
    },
    data() {
      return {
        users:[],
        user:{},
      
        // 下拉选项
      options: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
          // phone: '',
          // pass: '',
        
        },
        formLabelWidth: '80px'
 

      }
    }
  
}
</script>

<style>
 .leng {
    width:20%;
  }
.leftButton{
  float: left;
}
.el-dialog{
  width: 1200px;
}
</style>