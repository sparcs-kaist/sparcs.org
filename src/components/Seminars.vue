<template>
	<div>
		<div class="ui vertical masthead center aligned basic segment">
      <div class="ui text container">
        <h1 class="ui header">Seminars</h1>
        <h2>Made in SPARCS, SPARCS의 세미나 자료를 공개합니다.</h2>
      </div>
		</div>
		<div class="ui inverted large attached menu">
			<div class="ui container">
				<a class="active yellow item">All</a>
				<a class="yellow item">Freshman</a>
				<a class="yellow item">Wheel</a>
				<a class="yellow item">Etc.</a>
        <div class="ui small search right item">
          <div class="ui icon input">
            <input class="prompt" type="text" placeholder="Search slides...">
            <i class="search icon"></i>
          </div>
        </div>
        <button class="ui red attached button" id="newfile">Upload</button>
      </div>
		</div>
    <div style="margin: 20px"></div> <!-- To be deleted-->
    <div class="ui container">
      <table class="ui single line table">
        <thead>
          <tr>
            <th class="two wide">Date</th>
            <th class="ten wide">Topic</th>
            <th class="two wide">File</th>
            <th class="two wide">Speaker</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2017.00.00</td>
            <td>2017 봄 신입생 세미나 - 3. Web, HTML, CSS overview</td>
            <td><i class="file icon"></i> 12.5 MB</td>
            <td>gunwoo</td>
          </tr>
          <tr>
            <td>2017.00.00</td>
            <td>2017 봄 신입생 세미나 - 5. Django</td>
            <td><i class="file icon"></i> 12.5 MB</td>
            <td>gunwoo</td>
          </tr>
          <tr>
            <td>2017.00.00</td>
            <td>2017 봄 신입생 세미나 - 6. Git</td>
            <td><i class="file icon"></i> 12.5 MB</td>
            <td>gunwoo</td>
          </tr>
        </tbody>
      </table>
    </div>
	</div>
</template>

<script>
export default {
  name: 'Seminars',
  mounted() {
    $(document).ready(() => {
      $('.ui.menu a.item').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
      })
    })
  },
}
</script>

<style></style>
