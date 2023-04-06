<template>
  <div class="exercise"> 
    <h1>\exercise</h1>

    <!-- 左侧按钮 -->
    <el-row class="leftButton">
      <el-button type="primary" round  @click="addClick()">新添数据</el-button>
      <el-button type="primary" round @click="dialogTableVisible = true">查看详情</el-button>
    </el-row>


    <!-- 详情Table查看 -->
    <el-dialog title="查看详情" :visible.sync="dialogTableVisible" class="dialog">
      <el-table :data="exercises">
        <el-table-column property="id" label="序号" class="leng"></el-table-column>
        <el-table-column property="chapterId" label="章节id" class="leng"></el-table-column>
        <el-table-column property="topic" label="题目" class="leng"></el-table-column>
        <el-table-column property="correct" label="正确答案" class="leng"></el-table-column>
        <el-table-column property="a" label="选项A" class="leng"></el-table-column>
        <el-table-column property="b" label="选项B" class="leng"></el-table-column>
        <el-table-column property="c" label="选项C" class="leng"></el-table-column>
        <el-table-column property="d" label="选项D" class="leng"></el-table-column>
        <el-table-column property="title" label="题库章节" class="leng"></el-table-column>
      </el-table>
    </el-dialog>


        
    <!-- 新添Form -->  
    <el-dialog title="新添数据信息" :visible.sync="dialogFormVisible"  @close="resetForm('addForm')">
      <h4> 要记得填写内容噢</h4>
      <el-form :model="exercise" ref='addForm'>
        <!-- <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="exercise.id" autocomplete="off"></el-input>
        </el-form-item> -->

        <el-form-item label="章节id" :label-width="formLabelWidth">
          <el-input v-model="exercise.chapterId" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="exercise.topic" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="正确答案" :label-width="formLabelWidth">
          <el-input v-model="exercise.correct" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="选项A" :label-width="formLabelWidth">
          <el-input v-model="exercise.a" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="选项B" :label-width="formLabelWidth">
          <el-input v-model="exercise.b" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="选项C" :label-width="formLabelWidth">
          <el-input v-model="exercise.c" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="选项D" :label-width="formLabelWidth">
          <el-input v-model="exercise.d" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="题库章节" :label-width="formLabelWidth">
          <el-input v-model="exercise.title" autocomplete="off"></el-input>
        </el-form-item>
     
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>



    <!-- 主表格 -->
    <el-table
      :data="exercises"
      size="mini"
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
        prop="chapterId"
        label="章节id"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.chapterId" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.chapterId}}</div> -->
        </div>
      </el-table-column>
      <el-table-column
        prop="topic"
        label="题目"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.topic" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.topic}}</div> -->
        </div>
      </el-table-column>
      <el-table-column
        prop="correct"
        label="正确答案"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.correct" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.correct}}</div> -->
        </div>
      </el-table-column>
      <el-table-column
        prop="a"
        label="选项A"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.a" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.a}}</div> -->
        </div>
      </el-table-column>
      <el-table-column
        prop="b"
        label="选项B"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.b" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.b}}</div> -->
        </div>
      </el-table-column>
      <el-table-column
        prop="c"
        label="选项C"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.c" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.c}}</div> -->
        </div>
      </el-table-column>
      <el-table-column
        prop="d"
        label="选项D"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.d" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.d}}</div> -->
        </div>
      </el-table-column>
      <el-table-column
        prop="title"
        label="题库章节"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.title" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.title}}</div> -->
        </div>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        class="leng">
        <template slot-scope="scope">
          <el-button @click="handleSaveClick(scope.row)" type="primary" plain size="mini">保存</el-button>
          <el-button type="danger" plain size="mini" @click="handleDeleteClick(scope.row)">删除</el-button>
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
        this.exercise.id='';
        this.exercise.chapterId='';
        this.exercise.topic='';
        this.exercise.correct='';
        this.exercise.a='';
        this.exercise.b='';
        this.exercise.c='';
        this.exercise.d='';
        this.exercise.title='';
        
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
        console.log(this.exercise);

        axios.post('http://8.130.32.153:8090/exercises', {
          chapterId:  Number(this.exercise.chapterId),
          topic: this.exercise.topic,
          correct: this.exercise.correct,
          a: this.exercise.a,
          b: this.exercise.b,
          c: this.exercise.c,
          d: this.exercise.d,
          title: this.exercise.title,
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
      console.log(row.topic)
      console.log(row.correct)
      console.log(row.a)
      axios.put('http://8.130.32.153:8090/exercises', {
        id: row.id,
        chapterId: row.chapterId,
        correct: row.correct,
        a: row.a,
        b: row.b,
        c: row.c,
        d: row.d,
        title: row.title,
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
          .delete(`http://8.130.32.153:8090/exercises/${row.id}`)
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
        // http://8.130.32.153:8090/exercises
        axios
          .get("http://8.130.32.153:8090/exercises")
          .then((response) =>{
            console.log(response.data);
            this.exercises = response.data;
            console.log("exercises=",this.exercises)
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
        exercises:[],
        exercise:{},
        dialogTableVisible: false,
        dialogFormVisible: false,
        // 下拉选项
      options: [],

        
        form: {
          // id: '',
          chapterId: '',
          topic: '',
          correct: '',
          a: '',
          b: '',
          c: '',
          d: '',
          title: '',
        
        },
        formLabelWidth: '80px'
      }
    }
  }
</script>

<style>
  .leng {
    width:"100";
  }
  .leftButton{
    float: left;
  }
  .el-dialog{
    width: 1200px;
  }
</style>