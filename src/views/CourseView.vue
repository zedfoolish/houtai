<template>
  <div class="course"> 
    <h1>This is a course page</h1>

    <el-steps :active="3" align-center>
      <el-step title="上传课程视频" class="bold"  description="在下面的方框里上传视频"></el-step>
      <el-step title="获取视频地址" class="bold" description="在上传完视频后会有提示返回视频地址"></el-step>
      <el-step title="填写课程信息" class="bold" description="将刚复制的视频地址填写到对应的课程视频地址处"></el-step>
    </el-steps>
    <br/><br/>

    <div>
      <el-upload
        class="upload-demo"
        drag
        action="http://8.130.32.153:8090/common/upload"
        multiple
        :file-list="fileList"
        :on-success="handleSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        >
        <div>请在这里上传视频</div>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">不能上传超过2G的文件，支持.mp4、.wmv、.avi等视频格式文件</div>
      </el-upload>
    </div>

    <template>
      <el-button v-if="false" type="text" @click="open">点击打开 Message Box</el-button>
    </template>

    <br/><br/>

    <!-- 左侧按钮 -->
    <el-row class="leftButton">
      <el-button type="primary" round  @click="addClick()">新添数据</el-button>
      <el-button type="primary" round @click="dialogTableVisible = true">查看详情</el-button>
    </el-row>


    <!-- 详情Table查看 -->
    <el-dialog title="查看详情" :visible.sync="dialogTableVisible" class="dialog">
      <el-table :data="courses">
        <el-table-column property="id" label="序号" class="leng"></el-table-column>
        <el-table-column property="name" label="课程分类名称" class="leng"></el-table-column>
        <el-table-column property="title" label="课程标题" class="leng"></el-table-column>
        <el-table-column property="content" label="介绍内容" class="leng"></el-table-column>
        <el-table-column property="lecturerId" label="讲师" class="leng"></el-table-column>
        <el-table-column property="resourceUrl" label="视频地址" class="leng"></el-table-column>
      </el-table>
    </el-dialog>


        
    <!-- 新添Form -->  
    <el-dialog title="新添数据信息" :visible.sync="dialogFormVisible"  @close="resetForm('addForm')">
      <h4> 要记得填写内容噢</h4>
      <el-form :model="course" ref='addForm'>
        <!-- <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="course.id" autocomplete="off"></el-input>
        </el-form-item> -->

        <el-form-item label="课程分类名称" :label-width="formLabelWidth">
          <el-input v-model="course.name" autocomplete="off"  placeholder="请输入课程分类名称"></el-input>
        </el-form-item>

        <el-form-item label="课程标题" :label-width="formLabelWidth">
          <el-input v-model="course.title" autocomplete="off"  placeholder="请输入课程标题"></el-input>
        </el-form-item>

        <el-form-item label="介绍内容" :label-width="formLabelWidth">
          <el-input v-model="course.content" autocomplete="off"  placeholder="请输入介绍内容"></el-input>
        </el-form-item>

        <el-form-item label="讲师" :label-width="formLabelWidth">
          <el-input v-model="course.lecturerId" autocomplete="off"  placeholder="请输入讲师"></el-input>
        </el-form-item>

        <el-form-item label="视频地址" :label-width="formLabelWidth">
          <el-input v-model="course.resourceUrl" autocomplete="off"  placeholder="请输入视频地址"></el-input>
        </el-form-item>
     
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>




<!-- 主表格 -->
  <el-table
      :data="courses"
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
        label="课程分类名称"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.name" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.name}}</div> -->
        </div>
      </el-table-column>

      <el-table-column
        prop="title"
        label="课程标题"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.title" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.title}}</div> -->
        </div>
      </el-table-column>

      <el-table-column
        prop="content"
        label="介绍内容"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.content" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.content}}</div> -->
        </div>
      </el-table-column>

      <el-table-column
        prop="lecturerId"
        label="讲师"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.lecturerId" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.lecturerId}}</div> -->
        </div>
      </el-table-column>
      
      <el-table-column
        prop="resourceUrl"
        label="视频地址"
        class="leng">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.resourceUrl" placeholder="请输入内容"></el-input>
          <!-- <div class="item__txt">{{scope.row.resourceUrl}}</div> -->
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
import axios from 'axios';
export default {
    data() {
      return {
        rem:'1',
        url:'',
        fileList:[{}],
        form:{},
        form:{url:null,title:"testTitle",content:"testContent",lecturerId:"wang",name:"Mr.X"},
        

        // 列表展示
         courses:[],
        // 新添获取
        course:{},
        dialogTableVisible: false,
        dialogFormVisible: false,

        // 下拉选项
        options: [],
        
        form1: {
          id: '',
          name: '',
          title: '',
          content: '',
          lecturerId: '',
          resourceUrl: '',
        
        },
        formLabelWidth: '80px'
      }
    },
    mounted(){
      this.openFullScreen2();
      this.getlist();
      this.$message({
              duration:2000,
              type: 'warning',
              message: '在上传完视频后会有提示返回视频地址 要记得复制(O.o)...'
            });
      
    },  
    computed: {
      foodLabel () {
        return (val) => {
          return this.options.find(o => o.value === val).label
        }
      }
    },
    methods: {
      handlePreview(file) {
          console.log("等待中");
          console.log(this.rem);

      },     

      openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 400);
      },
      handleSuccess(res, file) {
          console.log("res.data=",res.data);
          // alert("上传成功");
          this.rem = res.data;
          console.log("rem=",this.rem);
          this.open();
      },
      handleRemove(file, fileList) {
          console.log(file, fileList);
      },
      open() {
        // 一键复制
        this.$alert(this.rem ,'上传成功,上传视频地址,记得复制一下哟', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'success ',
              message: "嘟嘟嘟嘟嘟嘟..."
            });
            location.reload ()
          },
          
        });
      },


      handleClick(row) {
        console.log(row);
      }, 

      // 清空新添表单
      resetForm(form1){
        this.course.id='';
        this.course.name='';
        this.course.title='';
        this.course.content='';
        this.course.resourceUrl='';
        
        // 关键就是这句话！
        this.$refs[form1].clearValidate();
      },
      cancel() {
       this.dialogFormVisible = false;
       console.log("cancel");
       
      },
      confirm(){
        this.dialogFormVisible = false;
        console.log("confirm");
        console.log(this.course);

        axios.post('http://8.130.32.153:8090/courses', {
          name: this.course.name,
          title: this.course.title,
          content: this.course.content,
          lecturerId: this.course.lecturerId,
          resourceUrl: this.course.resourceUrl,
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
      console.log(row.title)
      console.log(row.resourceUrl)
      console.log(row.lecturerId)
      axios.put('http://8.130.32.153:8090/courses', {
        id: row.id,
        name: row.name,
        title: row.title,
        resourceUrl: row.resourceUrl,
        lecturerId: row.lecturerId,
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
          .delete(`http://8.130.32.153:8090/courses/${row.id}`)
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
        // http://8.130.32.153:8090/courses
        axios
          .get("http://8.130.32.153:8090/courses")
          .then((response) =>{
            // console.log(response.data);
            this.courses = response.data;
            // console.log("courses=",this.courses)
          })
          .catch((error) =>{
            console.log(error);
          })

    },
  }
}
</script>

<style>
.bold{
  font-weight: bold;
}
.leng {
    width:20%;
  }
.leftButton{
  float: left;
}
.el-dialog{
  width: 1250px;
}
</style>