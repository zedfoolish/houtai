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





  </div>

</template>

<script>
export default {
    data() {
      return {
        rem:'1',
        url:'',
        fileList:[{}],
        form:{},
        form:{url:null,title:"testTitle",content:"testContent",lecturerId:"wang",name:"Mr.X"},
      }
    },
    methods: {
      handlePreview(file) {
          console.log("等待中");
          console.log(this.rem);

      },     
      handleSuccess(res, file) {
          console.log("res.data=",res.data);
          alert("上传成功");
          this.rem = res.data;
          console.log("rem=",this.rem);
          this.open();
      },
      handleRemove(file, fileList) {
          console.log(file, fileList);
      },
      open() {
        // 一键复制
        this.$alert(this.rem ,'上传视频地址,记得复制一下哟', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'success ',
              message: "嘟嘟嘟嘟嘟嘟..."
            });
          },
          
        });
      },
  

    },
}
</script>

<style>
.bold{
  font-weight: bold;
}
</style>