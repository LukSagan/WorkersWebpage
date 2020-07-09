Todos = Ember.Application.create();
//**********************    MODEL   ***********************
Todos.Todo = Em.Object.extend({
  title: null,
  isDone: false
});

//**********************    CONTROLLER   ***********************
Todos.todosController = Em.ArrayProxy.create({
  content: [],

  createTodo: function(title) {
    var todo = Todos.Todo.create({ title: title });
    this.pushObject(todo);
  },

  clearCompletedTodos: function() {
    this.filterProperty('isDone', true).forEach(this.removeObject, this);
  },

  remaining: function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),

  allAreDone: function(key, value) {
    if (value !== undefined) {
      this.setEach('isDone', value);

      return value;
    } else {
      return !!this.get('length') && this.everyProperty('isDone', true);
    }
  }.property('@each.isDone')
});

//Todos.todosController.createTodo("ala123");



//**********************    VIEW   ***********************
Todos.StatsView = Em.View.extend({
  remainingBinding: 'Todos.todosController.remaining',

  remainingString: function() {
    var remaining = this.get('remaining');
    return remaining + (remaining === 1 ? " item" : " items");
  }.property('remaining')
});

Todos.CreateTodoView = Em.TextField.extend({
  insertNewline: function() {
    var value = this.get('value');

    if (value) {
      Todos.todosController.createTodo(value);
      this.set('value', '');
    }
  }
});

//-------------------------------------         MOJ       ------------------------------------------$$$$$$$$
var name, surn;
Pracow = Ember.Application.create();
//**********************    MODEL   ***********************
Pracow.Pracownik = Em.Object.extend({
  imie: null,
  nazwi: null,
  gw: null,
  dlugo_pracuje: null,
  jest: false
});
//**********************    CONTROLLER   ***********************
teraz = new Date();
godz=teraz.getHours();

Pracow.pracownicyController = Em.ArrayProxy.create({
    content: [],

    zrobPrac: function(nazwi,imie) {
    var pracownik = Pracow.Pracownik.create({ nazwi: nazwi, imie: imie});
    this.pushObject(pracownik);
	}, 
  
	allzrobPrac: function(nazwi,imie,gw) {
    var pracownik = Pracow.Pracownik.create({ imie: imie, nazwi: nazwi, gw: gw});
    this.pushObject(pracownik);
	}, 
	
	ilePrac: function() {
		return this.get('length');	
	},
	// sprawdzi czy juz jest wpisana godzina gw u osoby
	// NIE > wpisze g_w +     jest w pracy
	// TAK > wpisze g_w + nie jest w pracy

	godzina: function() {
		//var pom = this.filterProperty('nazw', surn).filterProperty('imie', name).get('g_we');
		alert("nazwisko w godzina: " + surn);
		alert(surn);
		//var pom_1 = Pracow.CreatePracImieView.get('value');
		//alert( "to jest pom_1: " + pom_1);
		
		/*
		var pom = this.filterProperty('nazw', surn).get('gw');
		if (pom === undefined){
			alert("pom");
			this.filterProperty('nazw', surn).filterProperty('imie', name).everyProperty(this.gw = godz, jest = true);
			
		}
		else {
			alert("pomylka");

		}

		*/
	}
	

	
	
	
});



// tworzenie pracownikow
Pracow.pracownicyController.zrobPrac("Kamon","Robert");
Pracow.pracownicyController.zrobPrac("Kowalski","Jan");
Pracow.pracownicyController.zrobPrac("Lawlo","Ola");
Pracow.pracownicyController.zrobPrac("Nowak","Karol");
Pracow.pracownicyController.allzrobPrac("qwe","qwe","11");
Pracow.pracownicyController.zrobPrac("Weba","Ala");

// alert ( Pracow.pracownikController.ilePrac() );  


//**********************    VIEW   ***********************

Pracow.CreatePracNazwView = Em.TextField.extend({
  insertNewline: function() {
    var nazw = this.get('value');
	//alert("to jest " + surn);
    if (nazw) {
		surn = nazw;
		//alert("to jest " + surn);
      this.set('value', '');
    }
  }
});
Pracow.CreatePracImieView = Em.TextField.extend({
  insertNewline: function() {
	var imie = this.get('value');
    if (imie) {
		name = imie;
		this.set('value', '');
	}
  }
});



// dodac reset values, a moze juz nie (dane przenoszone, wartosci resetowane)