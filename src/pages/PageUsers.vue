<template>
  <q-page class="flex q-pa-md">
  	<q-list
  		class="full-width"
  		separator>
  	  <q-item
  	  	v-for="user in users"
  	  	:key="user.id"
  	  	to="/chat"
  	  	clickable
  	  	v-ripple>
  	    <q-item-section avatar>
  	      <q-avatar color="primary" text-color="white">
            <img
              alt="Quasar logo"
              src="~assets/logo.png"
              style="width: 100%; height:100%"
            >
  	      </q-avatar>
  	    </q-item-section>

  	    <q-item-section>
  	      <q-item-label>{{ user.name }}</q-item-label>
  	    </q-item-section>

  	    <q-item-section side>
  	      <q-badge
  	      	:color="user.online ? 'light-green-5' : 'grey-4'">
            {{ user.online ? 'Online' : 'Offline' }}
          </q-badge>
  	    </q-item-section>
  	  </q-item>

  	</q-list>

<div class="mt-40">
	<q-chart 
	identifier="myChart1"
	stilo="height:28vh; width: 100%"
		type="bar"  
		:datasets="datasets"
		:options="options"
		:labels="labels"

	/>
</div>

<div class="mt-40">
<q-chart 
  identifier="myChart2"
	stilo="height:28vh; width: 100%"
 	type="bubble"  
	 :datasets="datasets1"
	 :options="options1"
	   :labels="labels1"

/> 
</div>

<div class="mt-40">
<q-chart 
  identifier="myChart3"
	stilo="height:28vh; width: 100%"
 	type="polarArea"  
	 :datasets="datasets2"
	 :options="options2"
	   :labels="labels2"

/>
</div>

  </q-page>
</template>

<script>
 // import PieChart from "../components";
import QChart from 'quasar-components-chart'

  export default {
	   components: { QChart },
	  data () {
	    return {
			labels:["Jan","Feb", "Mar","Apr","May","Jun","Jul"],
		options:{
				responsive: true,
				plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Bar Chart'
				}
				}
			},
		datasets: [
		{
			data: [2,1,0,-5,-6.5,6,2],
			label: 'Banking Chatbot',
			borderColor: "#ec1c24",
     		 backgroundColor:  "#ec1c24",
		}, 
		{
		  	data: [2, 7,1,2,3,4,-3],
			label: 'Entertainment ChatBot',
			borderColor: "#EA6124",
     		 backgroundColor:  "#EA6124",
		}, 
		],
		

		labels1:["Jan","Feb", "Mar","Apr","May","Jun","Jul"],
		options1:{
				responsive: true,
				plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Bubble Chart'
				}
				}
			},
		datasets1: [
		{
			data: [{
				x: 20,
				y: 30,
				r: 15
				}, {
				x: 45,
				y: 10,
				r: 10
				}],
			label: 'Banking Chatbot',
			borderColor: "#282566",
     		 backgroundColor:  "#282566",
		}, 
		{
		  	data: [{
				x: 5,
				y: 20,
				r: 15
				}, {
				x: 45,
				y: 10,
				r: 7
				}],
			label: 'Entertainment ChatBot',
			borderColor: "#4b318f",
     		 backgroundColor:  "#4b318f",
		}, 
		],




	labels2:["Jan","Feb", "Mar","Apr","May"],
		options2:{
				responsive: true,
				plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Polar Area Chart'
				}
				}
			},
		datasets2: [
		{
			data: [11, 16, 7, 3],
			label: 'Banking Chatbot',
			borderColor: "#2424",
     		backgroundColor: [
      '#ec1c24',
      '#EA6124',
      '#282566',
      '#4b318f'    ]
		}, 
		{
		  	data: [11, 16, 7, 3 ],
			label: 'Entertainment ChatBot',
			backgroundColor: [
     '#ec1c24',
      '#EA6124',
      '#282566',
      '#4b318f' 
    ]
		}, 
		],


	      users: [{
      	  id: 1,
      	  name: 'Banking Chatbot',
      	  online: true
      	}, {
      	  id: 2,
      	  name: 'Entertainment Chatbot',
      	  online: false
      	}]
	    }
	  },
    mounted() {
      console.log('PageUsers.vue mounted.')
      console.log(this.$store.state)
    }
  }
</script>

<style>
</style>
