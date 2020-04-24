<template>
  <el-container id="layout">
    <!-- 侧边栏 -->
    <el-aside style="overflow:hidden" class="aside" :width="isCollapse?'64px':'200px'">
      <el-menu
        :collapse="isCollapse"
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#0085E8"
      >
        <div class="logo">
          <img src="../../assets/logo.png" alt />
        </div>

        <template v-for="(item,index) in getRoutes">
          <!-- 一级路由 -->
          <el-menu-item v-if="!item.children&&!item.hidden" :key="index" :index="item.path">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
          <!-- 二级路由 -->
          <el-submenu
            v-if="item.children&&item.children.length>=1&&!item.hidden"
            :key="index"
            :index="item.path"
          >
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span>{{item.meta.title}}</span>
            </template>
            <template v-for="(itemChild,indexChild) in item.children">
              <el-menu-item v-if="!itemChild.hidden" :key="indexChild" :index="item.path+'/'+itemChild.path">
                <i :class="itemChild.meta.icon"></i>
                {{itemChild.meta.title}}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <el-submenu index="userCenter">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>用户中心</span>
          </template>
          <el-menu-item index="/userJurisdiction">
            <i class="el-icon-lock"></i>
            <span slot="title">用户权限</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 侧边栏end -->
    <!-- 右侧内容 -->
    <div class="right">
      <el-header class="header">
        <div class="header-left">
          <i
            :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            @click="isCollapse=!isCollapse"
          ></i>
        </div>

        <el-dropdown trigger="hover">
          <div class="el-dropdown-link">
            <div>
              <el-avatar
                shape="square"
                :size="50"
                :src="userList.headImgUrl ? userList.headImgUrl : squareUrl"
              ></el-avatar>
            </div>

            <div class="el-dropdown-link-names">
              <span style="color:#0085E8;cursor:pointer">{{userList.nickName}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown" :split-button="true">
            <el-dropdown-item icon="el-icon-s-home">
              <span @click="gohome">首页</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" @click="quies">
              <span @click="quies">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 主要区域容器 -->
      <el-main>
        <span class="leables" :class=" $route.path=== '/home' ? 'active' : ''">
          <router-link to="/home">首页</router-link>
        </span>
        <Leables
          v-for="(item,index) in tableList"
          :key="index"
          :names="item"
          @removeTable="removeTable"
        />
        <router-view></router-view>
      </el-main>
      <!-- 底栏容器 -->
      <el-footer>------footer------</el-footer>
    </div>
    <!-- 右侧内容end -->
  </el-container>
</template>
<script>
import Leables from "@/components/Leables";
export default {
  components: {
    Leables
  },
  data() {
    return {
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      isCollapse: false,
      tableList: []
    };
  },
  methods: {
    gohome(){
this.$router.push("/home")
    },
    quies() {
      this.$router.push("/");
      localStorage.clear();
    },
    removeTable(tag) {
      for (let i = 0; i < this.tableList.length; i++) {
        if (this.tableList[i].path == tag) {
          this.tableList.splice(i, 1);
        }
      }
      if (this.$route.path == tag) {
        if (this.tableList.length > 0) {
          this.$router.push(this.tableList[this.tableList.length - 1].path);
        } else {
          this.$router.push("/home");
        }
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    userList() {
      return this.$store.state.load.userList;
    },
    router: function() {
      return this.$route;
    },
    getRoutes() {
      return JSON.parse(localStorage.getItem("menuList"));
    }
  },
  watch: {
    router: {
      handler(value, oldValue) {
        let offs = this.tableList.every((item, index) => {
          return item.path != value.path; //确保tableList中没有此路由
        });
        if (offs && value.path !== "/home") {
          this.tableList.push(value); //添加到tableList
        }
      },
      immediate: true //立即执行handler
    }
  }
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
<style scoped>
.el-dropdown-link {
  height: 60px;
  display: flex;
  align-items: center;
}
.header-left {
  height: 60px;
  line-height: 60px;
  font-size: 24px;
}
.aside {
  height: 100%;
  transition: all 0.4s;
}
.aside .el-menu {
  border-right: none;
}
.el-menu-vertical-demo {
  height: 100%;
  overflow-y: auto;
}
i {
  cursor: pointer;
}
#layout {
  height: 100%;
  display: flex;
}
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}
.logo {
  height: 60px;
  width: 100%;
  text-align: center;
  background-color: #0085E8;
}
.logo img {
  width: 60px;
  height: 60px;
}
.right {
  height: 100%;
  flex: auto;
}
.el-main {
  height: calc(100% - 120px);
}
.el-footer {
  text-align: center;
  line-height: 60px;
  background-color: #eee;
}
.leables {
  padding: 5px 10px;
  border: 1px solid #0085E8;
  border-radius: 2px;
  cursor: pointer;
  margin-right: 5px;
}
.leables a {
  color: #0085E8;
  text-decoration: none;
}
.active {
  background: #0085E8;
}
.active a {
  color: #ffffff !important;
}
</style>