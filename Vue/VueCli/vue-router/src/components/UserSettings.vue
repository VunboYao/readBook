<template>
  <div>组件UserSettings
      <a-layout>
        <a-layout-header>
           <router-link to="emails">
          <a-button>UserEmailsSubscriptions</a-button>
        </router-link>
       <router-link to="profile">
          <a-button>UserProfilePreview</a-button>
        </router-link>
        </a-layout-header>
      </a-layout>

      <div class="view">
      <router-view class="item"></router-view>
      <router-view class="item" name="helper"></router-view>
      </div>
  </div>

</template>

<script>
export default {
  name: 'UserSettings'
}
</script>

<style lang='scss'>
div {
  font-size: 20px;
  font-weight: 600;
  line-height: 2;
}
.view {
  display: flex;
}
.item {
  width: 50%;
  &:first-child {
    background-color: pink;
  }
  &:last-child {
    background-color: darkgreen;
  }
}
</style>
