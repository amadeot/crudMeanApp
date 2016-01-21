angular.module('PersonApp').controller('PeopleController', PeopleController);

function PeopleController ($http) {
  var people = this;
  people.listAll;
  people.newPerson = {};
  people.newPerson.items = [];
  people.findAll = function(){
    $http.get('/api/people').then(function(response){
      people.listAll = response.data;
      console.log(people.listAll)
    });
  }
  people.add = function(){
    console.log(people.newPerson)
    $http.post('/api/people', people.newPerson).then(function(response){
      console.log(response.data);
      people.findAll();
    })
  }
  people.findAll()
}