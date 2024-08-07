<template>
	<div class="bg">
		<loading :active.sync="isLoading"></loading>
		<div class="container">
			<header>
				<h1 style="margin:0; color: #fff">各城市天氣查詢系統</h1>
			</header>
			<form>
				<select class="selectCity" v-model="filterLocation">
					<option value="all">請選擇城市</option>
					<option value="六都">六都</option>
					<option :value="item.locationName" v-for="item in location" :key="item.locationName">
						{{ item.locationName }}</option>
				</select>
			</form>
			<section>
				<div>
					<div v-for="item in locationNow" :key="item.locationName" class="card">
						<div class="flex dataTitle">
							<span style="margin-right:3px">{{ item.locationName }}</span>
							<span>{{ item.weatherElement[2].time[0].startTime | date }} -
								{{ item.weatherElement[2].time[0].endTime | date }}</span>
						</div>
						<div class="dataContent">
							<div>
								<span>{{ item.weatherElement[0].time[0].parameter.parameterName }}
									<i class="fas fa-cloud-rain"
										v-if="item.weatherElement[1].time[0].parameter.parameterName >= 50"></i>
									<i class="fas fa-cloud"
										v-if="item.weatherElement[1].time[0].parameter.parameterName > 20 && item.weatherElement[1].time[0].parameter.parameterName < 50"></i>
									<i class="fas fa-cloud-sun"
										v-if="item.weatherElement[1].time[0].parameter.parameterName > 0 && item.weatherElement[1].time[0].parameter.parameterName <= 20"></i>
									<i class="fas fa-sun"
										v-if="item.weatherElement[1].time[0].parameter.parameterName === 0"></i>
								</span>
							</div>
							<div class="flex">
								<span>{{ item.weatherElement[2].time[0].parameter.parameterName }}℃ -
									{{ item.weatherElement[4].time[0].parameter.parameterName }}℃</span>
								<span>降雨機率：{{ item.weatherElement[1].time[0].parameter.parameterName }} %</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			filterLocation: 'all'
		}
	},
	methods: {
		getWeather() {
			const vm = this
			vm.$store.dispatch('getWeather')
		}
	},
	created() {
		this.getWeather()
	},
	computed: {
		locationNow() {
			const vm = this
			if (vm.filterLocation === 'all') {
				return vm.location
			} else if (vm.filterLocation === '六都') {
				return vm.location.filter((item) => {
					return item.locationName === '臺北市' || item.locationName === '新北市' || item.locationName === '桃園市' || item.locationName === '臺中市' || item.locationName === '臺南市' || item.locationName === '高雄市'
				})
			} else {
				return vm.location.filter((item) => {
					return vm.filterLocation === item.locationName
				})
			}
		},
		isLoading() {
			return this.$store.state.isLoading
		},
		location() {
			return this.$store.state.location
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	max-width: 960px;
	margin: 0 auto;
	text-align: center;
	padding-top: 5rem;
	h1 {
		text-shadow: 1px 1px 2px #000;
	}
	form {
		margin:1rem auto;
	}
}

.selectCity {
	width: 50%;
	height: 50px;
	font-size: 20px;
	cursor: pointer;
	@media(max-width: 767px) {
		height: 30px;
		font-size: 15px
	}
}

.weatherList {
	width: 100%;
	margin-top: 1rem;
	border-collapse: collapse
}

.dataBorder {
	border-top: 1px solid #c0c0c0;
}

.card {
	display: inline-block;
	min-width: 28%;
	margin: 0.5rem;
	border: 1px solid #fff;
	text-align: left;

	@media(max-width: 768px) {
		min-width: 50%;
	}
}

.flex {
	display: flex;
	justify-content: space-between
}

.dataTitle {
	border-bottom: 1px solid gray;
	padding: 5px;
	background-color: rgba($color: #dbdbdb, $alpha: 0.7);

	@media(max-width: 767px) {
		font-size: 10px
	}
}

.dataContent {
	padding: 10px;
	background-color: rgba($color: #a0d7ff, $alpha: 1.0);
	@media(max-width: 767px) {
		font-size: 10px
	}
}

.bg {
	background-image:url(../assets/bg.jpg);
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
	background-attachment: fixed;
	min-height: 100vh;
}
</style>
