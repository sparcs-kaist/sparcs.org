<template>
	<div id="members">
    <div class="ui text container">
      <h1></h1>
      <h1 class="ui dividing header">Staff</h1>
      <h4></h4>
      <div class="ui four column grid">
        <div class="column" v-for="n in 10">
          <div class="ui items">
            <div class="item content">
              <div class="content">
                <div class="header">이주영</div>
                <div class="meta">회장, KAIST 15</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  /* eslint-disable */
	export default {
		name: 'Members'
	}

</script>

<style>

</style>
