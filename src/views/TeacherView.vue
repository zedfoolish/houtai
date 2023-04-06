<template>
  <div class="teacher">
    <h1>This is a teacher page</h1>
<!-- 左侧按钮 -->
    <el-row class="leftButton">
      <el-button type="primary" round  @click="addClick()">新添数据</el-button>
      <el-button type="primary" round @click="dialogTableVisible = true">查看详情</el-button>
    </el-row>


    <!-- 详情Table查看 -->
    <el-dialog title="查看详情" :visible.sync="dialogTableVisible" class="dialog">
      <el-table :data="teachers">
        <el-table-column property="id" label="序号" class="leng"></el-table-column>
        <el-table-column property="name" label="姓名" class="leng"></el-table-column>
        <el-table-column property="imgUrl" label="图像地址" class="leng"></el-table-column>
        <el-table-column property="skill" label="主讲模块" class="leng"></el-table-column>
        <el-table-column property="intro" label="介绍" class="leng"></el-table-column>
      </el-table>
    </el-dialog>


        
    <!-- 新添Form -->  
    <el-dialog title="新添数据信息" :visible.sync="dialogFormVisible"  @close="resetForm('addForm')">
      <h4> 要记得填写内容噢</h4>
      <el-form :model="teacher" ref='addForm'>
        <!-- <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="teacher.id" autocomplete="off"></el-input>
        </el-form-item> -->

        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="teacher.name" autocomplete="off" placeholder="请输入名称"></el-input>
        </el-form-item>

        <el-form-item label="头像地址" :label-width="formLabelWidth">
          <el-input v-model="teacher.imgUrl" autocomplete="off"  placeholder="请输入头像地址"></el-input>
        </el-form-item>

        <el-form-item label="主讲模块" :label-width="formLabelWidth">
          <el-input v-model="teacher.skill" autocomplete="off"  placeholder="请输入主讲模块"></el-input>
        </el-form-item>

        <el-form-item label="介绍" :label-width="formLabelWidth">
          <el-input v-model="teacher.intro" autocomplete="off"  placeholder="请输入介绍"></el-input>
        </el-form-item>
     
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>




<!-- 主表格 -->
  <el-table
      :data="teachers"
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
        prop="name"
        label="名字"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.name" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.name}}</div> -->
        </div>
      </el-table-column>
      <el-table-column
        prop="skill"
        label="主讲模块"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.skill" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.skill}}</div> -->
        </div>
      </el-table-column>
      <el-table-column
        prop="imgUrl"
        label="头像地址"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.imgUrl" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.imgUrl}}</div> -->
        </div>
      </el-table-column>
      <el-table-column
        prop="intro"
        label="介绍"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.intro" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.intro}}</div> -->
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
        this.teacher.id='';
        this.teacher.name='';
        this.teacher.imgUrl='';
        this.teacher.skill='';
        this.teacher.intro='';
        
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
        console.log(this.teacher);

        axios.post('http://8.130.32.153:8090/teachers', {
          name: this.teacher.name,
          imgUrl: this.teacher.imgUrl,
          skill: this.teacher.skill,
          intro: this.teacher.intro,
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

// 可编辑表格
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
      console.log(row.name)
      console.log(row.imgUrl)
      console.log(row.intro)
      axios.put('http://8.130.32.153:8090/teachers', {
        id: row.id,
        name: row.name,
        imgUrl: row.imgUrl,
        intro: row.intro,
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
          .delete(`http://8.130.32.153:8090/teachers/${row.id}`)
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
        // http://8.130.32.153:8090/teachers
        axios
          .get("http://8.130.32.153:8090/teachers")
          .then((response) =>{
            // console.log(response.data);
            this.teachers = response.data;
            // console.log("teachers=",this.teachers)
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
        // 列表展示
        teachers:[],
        // 新添获取
        teacher:{},
        dialogTableVisible: false,
        dialogFormVisible: false,

        // 下拉选项
        options: [],
        
        form: {
          id: '',
          name: '',
          imgUrl: '',
          skill: '',
          intro: false,
        
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
