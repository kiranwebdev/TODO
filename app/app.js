import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App = Ember.Application.create({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
});

Ember.MODEL_FACTORY_INJECTIONS = true;

App.IndexRoute = Ember.Route.extend({
  actions: {
    createNew: function(){
$foldable.append('<div class="panel panel-default panel-new"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#'+$random_string+'"><span class="glyphicon glyphicon-chevron-right"></span> <span class="to-change-title">Creating New ToDo</span></a></h4></div><div id="'+$random_string+'" class="panel-collapse collapse"><div class="panel-body"><div class="form-group"><h2>Date Due</h2><div class="input-group"  style="width: 250px"><input type="text" id="new_date" class="form-control date-picker" placeholder="Click to enter date" aria-describedby="basic-addon2"><span class="input-group-addon" id="basic-addon2"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span></span></div></div><div class="form-group"><h2>Todo Title</h2><input type="text"  class="form-control" id="new_title" placeholder="Enter Todo title"/></div><div class="form-group"><h2>Description</h2><textarea id="new_description" name="" placeholder="Enter Description" id="" rows="4" class="form-control"></textarea></div><div class="form-group"><button class="btn btn-primary" {{action "addNew"}} id="submit-button">Submit</button> <button class="btn btn-success">Discard</button></div></div></div></div>');
$(".panel-new .date-picker").datepicker();	
$('.panel-new a').trigger('click');
    }
  }
});



loadInitializers(App, config.modulePrefix);

export default App;
