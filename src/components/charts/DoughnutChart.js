import { Doughnut } from 'vue-chartjs';
import database from '../../firebase.js'

export default {
  extends: Doughnut,
  data: function () {
    return {
        datacollection: {
            labels: ["Calories Burnt Today", "Burn more calories to reach your goal!"],
            datasets: [{
                label: "Population (millions)",
                backgroundColor: ["#FF8C00", "#D3D3D3"],
                data: []
              }]
        },
        options: {
            title: {
              display: true,
              text: "Calories Burnt Today vs. Goal",
              fontSize: 16
            },
            responsive: true,
            maintainAspectRatio: false
        }
      }
    },
    methods: {
      fetchItems: function () {
        const today = new Date();
        var calories = 0
        database.collection('inputs').where("userid", "==", "123432").get().then(querySnapShot => {
            querySnapShot.forEach(doc => {
                if (doc.data().date == today.getDate()) {
                    calories += doc.data().calories
                }
            })
            this.datacollection.datasets[0].data.push(calories)
            this.datacollection.datasets[0].data.push(3000-calories)
            //console.log(this.datacollection.datasets[0].data)          
            this.renderChart(this.datacollection, this.options);
        });
    }
},
created() {
    this.fetchItems();
}

}
//       fetchItems: function() {
//         database.collection('user').get().then(querySnapShot => { //add .doc(this.id) to identify specific user in the future
//           querySnapShot.forEach(doc => {
//             if (doc.data().id == 1) {
//               this.datacollection.datasets[0].data.push(doc.data().burnt)
//               this.datacollection.datasets[0].data.push(doc.data().goal - doc.data().burnt)
//               console.log(this.datacollection)
//             }
//           })
//           this.renderChart(this.datacollection, this.options);
//         })
//       }
//     },
//   created() {
//     this.fetchItems();
//   }
// }
