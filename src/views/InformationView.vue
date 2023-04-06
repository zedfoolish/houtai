<template>
  <div class="information"> 
    <h1> information\</h1>

    <el-table
      :data="informations"
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
      
        // 下拉选项
      options: [],
   
 


      }
    }
  
}
</script>

<style>
 .leng {
    width:20%;
  }
</style>