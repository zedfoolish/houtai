<template>
  <div class="information"> 
    <h1> information\</h1>

    <!-- 左侧按钮 -->
    <el-row class="leftButton">
      <el-button type="primary" round  @click="addClick()">新添数据</el-button>
      <el-button type="primary" round @click="dialogTableVisible = true">查看详情</el-button>
    </el-row>


        <!-- 详情Table查看 -->
        <el-dialog title="查看详情" :visible.sync="dialogTableVisible" class="dialog">
      <el-table :data="informations">
        <el-table-column property="id" label="序号" class="leng"></el-table-column>
        <el-table-column property="title" label="标题" class="leng"></el-table-column>
        <el-table-column property="content" label="内容" class="leng"></el-table-column>
      
      </el-table>
    </el-dialog>

            
     <!-- 新添Form -->  
     <el-dialog title="新添数据信息" :visible.sync="dialogFormVisible"  @close="resetForm('addForm')">
      <h4> 要记得填写内容噢</h4>
      <el-form :model="information" ref='addForm'>
        <!-- <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="teacher.id" autocomplete="off"></el-input>
        </el-form-item> -->

        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="information.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="information.content" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>




    <!-- 主表格 -->
    <el-table
      :data="informations"
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
        prop="title"
        label="标题"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.title" placeholder="请输入内容" ></el-input>
          <!-- <div class="item__txt">{{scope.row.title}}</div> -->
        </div>
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.content" placeholder="请输入内容" ></el-input>
          <!-- <div class="item__txt">{{scope.row.content}}</div> -->
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

        this.information.title='';
        this.information.content='';

        
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
        console.log(this.information);

        axios.post('http://8.130.32.153:8090/informations', {
          title: this.information.title,
          content: this.information.content,
      })
      .then(response => {
        console.log(response);
        // alert("新添成功");
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
      console.log(row.title)
      console.log(row.content)
      axios.put('http://8.130.32.153:8090/informations', {
        id: row.id,
        title: row.title,
        content: row.content,
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
          type: 'success'
        });
      },
    open2() {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      },

      handleDeleteClick(row) {
        console.log(row);
        console.log("delete");
        console.log(row.id)
        axios
          .delete(`http://8.130.32.153:8090/informations/${row.id}`)
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
        // http://8.130.32.153:8090/informations
        axios
          .get("http://8.130.32.153:8090/informations")
          .then((response) =>{
            console.log(response.data);
            this.informations = response.data;
            console.log("informations=",this.informations)
          })
          .catch((error) =>{
            console.log(error);
          })
      },

    },
    mounted(){
      this.getlist();
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
        informations:[],
        information:{},
        // 下拉选项
      options: [],
      
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
          // id: '',
          title: '',
          content: '',

        
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