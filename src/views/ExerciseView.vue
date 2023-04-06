<template>
  <div class="exercise"> 
    <h1>\exercise</h1>

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
      
        // 下拉选项
      options: [],
  
      }
    }
  }
</script>

<style>
  .leng {
    width:"100";
  }
</style>