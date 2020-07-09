$(document).ready(function () {
//**********************    MODEL   ***********************
	function Worker(surn,name){
		this.surn = surn;
		this.name = name;
		this.gw = null;
		this.dlugo_pracuje = "00.00";
		this.jest = false;		
	}
	function Worker_on(surn,name,hour){
		this.surn = surn;
		this.name = name;
		this.gw = hour;
		this.dlugo_pracuje = "00.00";
		this.jest = true;			
	}
	function Worker_on_pra(surn,name,hour,inn){
		this.surn = surn;
		this.name = name;
		this.gw = hour;
		this.dlugo_pracuje = inn;
		this.jest = false;		
	}
	function warpocz(){
		this.pok=false;
		this.ph=false;
		this.wprac=[];
		this.wnieprac=[];
	}
//**********************   ~CONTROLLER   ***********************
	var workers = [];
	poka = new warpocz();
	//czas
	//function czass(hh,mm){
	function czass(){
		teraz = new Date();
		godz=teraz.getHours();
		min=teraz.getMinutes();
		sek=teraz.getSeconds();
		//symulator godzin  //nieuzywany
		if (min>50){
			minn= min-50;
		}else if (min>40){
			minn= min-40;	
		}else if (min>30){
			minn= min-30;	
		}else if (min>20){
			minn= min-20;	
		}else if (min>10){
			minn= min-10;	
		}else{
			minn=min;	
		};
	//przyspieszenie
	godz = min;
	min = sek;
	//godz = 0;
	//min = 0;
		return [godz,min]
	};
	/*    //cos nie chce dzialac
	function alesa(){
		alert('I am displayed after 3 seconds!');
		var t = setTimeout(alesa(),3000);
	};	
	//alesa();
	*/
	function appe(workers,surn,name){
		workers [ workers.length ] = new Worker(surn,name);
	};
	function appe_on(workers,surn,name,hour){
		workers [ workers.length ] = new Worker_on(surn,name,hour);
	};
	function appe_on_pra(workers,surn,name,hour,inn){
		workers [ workers.length ] = new Worker_on_pra(surn,name,hour,inn);
	};
	function reset_prac(){
		for (var i=0; i<9; i++){
			//alert();
			workers[i].gw = "00.00";
			workers[i].dlugo_pracuje = "00.00";
			workers[i].jest = false;
		};
	};
	
	appe_on_pra(workers, "Arski","Tadeusz","08.55","02.00");
	//appe_on(workers, "Arski","Tadeusz","08.55");
	appe(workers, "Kamon","Robert");
	appe(workers, "Kowalski","Jan");
	appe(workers, "Lawlo","Ola");
	appe(workers, "Nowak","Karol");	
	appe_on(workers, "Potarski","Julian","09.00");
	//appe(workers, "Potarski","Julian");
	//appe_on_pra(workers, "Potarski","Julian","09.00","00.00");	
	//appe(workers, "Smal","Adam");
	appe_on_pra(workers, "Smal","Adam","11","05.00");
	appe(workers, "Weba","Ala");	
	appe_on(workers, "Zadre","Kamila","07.00");
	//appe(workers, "Zadre","Kamila");
	//appe_on_pra(workers, "Zadre","Kamila","07.00","00.00");
		
	function przelicz_prace(g_we,g_in){
		var godz,min,v;
		v = czass();		
		godz = v[0];
		min = v[1];
		//godz = 1;
		//min = 0;
		if (g_we[0]==='0'){
			var g_h = parseInt(g_we[0]) + parseInt(g_we[1]);
		}else{
			var g_h = parseInt(g_we[0] + g_we[1]);
		};
		if (g_we[3]==='0'){
			var g_m = parseInt(g_we[3]) + parseInt(g_we[4]);
		}else{
			var g_m = parseInt(g_we[3] + g_we[4]);
		};
		
		if (g_in){
			if (g_we[0]==='0'){
				var g_ih = parseInt(g_in[0]) + parseInt(g_in[1]);
			}else{
				var g_ih = parseInt(g_in[0] + g_in[1]);
			};
			if (g_we[3]==='0'){
				var g_im = parseInt(g_in[3]) + parseInt(g_in[4]);
			}else{
				var g_im = parseInt(g_in[3] + g_in[4]);
			};			
		}else{
			g_ih = 0;
			g_im  = 0;
		};
		if ( g_h<=godz ){
			g_h = parseInt(g_ih + godz - g_h);	
		}else{	//jak godzina wejscia jest wieksza od wyjscia (nie moze tak byc)
			g_h = parseInt(0 + g_ih);
		};
		g_m = parseInt(g_im + min - g_m);
		if (g_m < 0 ) {
			g_h -= 1;
			g_m = 60 + g_m;		
		};
		if (g_h < 10){
			g_h = '0'+g_h;
		};
		if (g_m < 10){
			g_m = '0'+g_m;
		};
		return g_h + '.' + g_m
	};
	
	//wpisz h wejscia
	function put_we(i){
		var godz,min,v;
		v = czass();		
		godz = v[0];
		min = v[1];
		if (godz<10){
			godz = '0' + godz;
		};
		if (min<10){
			min = '0' + min;
		};		
		workers[i].jest=true;
		workers[i].gw= godz + '.' + min;		
	};
	
	function add_wyk_pra(ind,i){
		var pom = przelicz_prace(workers[i].gw, workers[i].dlugo_pracuje);
		pom = parseInt(pom[0]+pom[1])+parseInt(pom[3]+pom[4])/100;
		return [  [ind-0.4,pom], [ind+0.4,pom] ]
	};
	
	function add_wyk_niepra(ind,i){
		return [  [ind-0.4,workers[i].dlugo_pracuje], [ind+0.4,workers[i].dlugo_pracuje] ]
	};
	
	
	function lad_przyc_pracuj(){
		//przyciski wyjdz z pracy
		$("a.aw0").click(function(){
			workers[0].jest=false;
			workers[0].dlugo_pracuje = przelicz_prace(workers[0].gw, workers[0].dlugo_pracuje);				
			przelad();
		});
		$("a.aw1").click(function(){
			workers[1].jest=false;
			workers[1].dlugo_pracuje = przelicz_prace(workers[1].gw), workers[1].dlugo_pracuje;		
			przelad();
		});	
		$("a.aw2").click(function(){
			workers[2].jest=false;
			workers[2].dlugo_pracuje = przelicz_prace(workers[2].gw, workers[2].dlugo_pracuje);		
			przelad();
		});	
		$("a.aw3").click(function(){
			workers[3].jest=false;
			workers[3].dlugo_pracuje = przelicz_prace(workers[3].gw, workers[3].dlugo_pracuje);		
			przelad();
		});
		$("a.aw4").click(function(){
			workers[4].jest=false;
			workers[4].dlugo_pracuje = przelicz_prace(workers[4].gw, workers[4].dlugo_pracuje);		
			przelad();
		});
		$("a.aw5").click(function(){
			workers[5].jest=false;
			workers[5].dlugo_pracuje = przelicz_prace(workers[5].gw, workers[5].dlugo_pracuje);		
			przelad();
		});	
		$("a.aw6").click(function(){
			workers[6].jest=false;
			workers[6].dlugo_pracuje = przelicz_prace(workers[6].gw, workers[6].dlugo_pracuje);		
			przelad();
		});	
		$("a.aw7").click(function(){
			workers[7].jest=false;
			workers[7].dlugo_pracuje = przelicz_prace(workers[7].gw, workers[7].dlugo_pracuje);		
			przelad();
		});	
		$("a.aw8").click(function(){
			workers[8].jest=false;
			workers[8].dlugo_pracuje = przelicz_prace(workers[8].gw, workers[8].dlugo_pracuje);		
			przelad();
		});		
	};
	
	function lad_przyc_niepracuj(){
		//przyciski wracam do pracy
		$("a.awy0").click(function(){
			put_we(0);
			przelad();
		});
		$("a.awy1").click(function(){
			put_we(1);
			przelad();
		});
		$("a.awy2").click(function(){
			put_we(2);
			przelad();
		});		
		$("a.awy3").click(function(){
			put_we(3);
			przelad();
		});		
		$("a.awy4").click(function(){
			put_we(4);
			przelad();
		});		
		$("a.awy5").click(function(){
			put_we(5);
			przelad();
		});
		$("a.awy6").click(function(){
			put_we(6);
			przelad();
		});	
		$("a.awy7").click(function(){
			put_we(7);
			przelad();
		});	
		$("a.awy8").click(function(){
			put_we(8);
			przelad();
		});	
	};
//**********************   ~VIEW   ***********************
		//rysowanie pracujacych
	function pracujacyView(){
		var data="";
		data = "<br> <b>Kto jest w pracy : </b><br>  <table CELLPADDING=8>";
		var ind=0;
		//reset tablicy do wykresow niepracujacych
		poka.wprac = [];
		for(var i=0; i<workers.length; i++) {
			if (workers[i].jest) {
				ind += 1;
				data += " <tr> <td>" + ind + ".</td><td>" + workers[i].surn + "</td><td>" + workers[i].name + "</td>";
				if (poka.ph){
					var pom = przelicz_prace(workers[i].gw, workers[i].dlugo_pracuje);
					data += "<td> £aczny czas: " + pom + "</td>";
					//dodawanie pracownika do wektora wykresu pracujacych
					poka.wprac[poka.wprac.length] = add_wyk_pra(ind,i);
				};	
				var pom = '<a class="aw' + i + '" href="#">Wyjdz z pracy</a>';
				data += "<td>" + pom + "</td></tr>";
			};				
		};
		data += '</table><br>';
		$('div#druk_text').html(data);
		lad_przyc_pracuj();
		$.plot($("#placeholder1"), poka.wprac , {lines: {show: true, fill: true }});
	};
	//wywolanie rysowania pracujacych
	pracujacyView();
	
	//rysowanie niepracujacych
	function niepracujacyView(){	
		var dat = "<br><table CELLPADDING=8>";
		var ind = 0;
		//reset tablicy do wykresow niepracujacych
		poka.wnieprac = [];
		for(var i=0; i<workers.length; i++) {			
			if (!workers[i].jest) {
				ind += 1;
				dat += " <tr> <td>" + ind + ".</td><td>" + workers[i].surn + "</td><td>" + workers[i].name + "</td>";
				if (poka.ph){					
					dat += "<td> £aczny czas: " + workers[i].dlugo_pracuje + "</td>";
					//dodawanie pracownika do wektora wykresu niepracujacych
					poka.wnieprac[poka.wnieprac.length] = add_wyk_niepra(ind,i);
				};				
				var pom = '<a class="awy' + i + '" href="#">Zaznacz obecnosæ</a>';
				dat += "<td>" + pom + "</td></tr>";
			};			
		};
		dat += '</table>';
		$('div#druk_nieob').html(dat);
		lad_przyc_niepracuj();
		$.plot($("#placeholder2"), poka.wnieprac, {lines: {show:true , fill: true }});
	};
	function przelad(){
		pracujacyView();
		if (poka.pok){
			niepracujacyView();
		};
	};
	//pokaz/chowaj nieobecnych
	$("button.b").click(function(){
		if (poka.pok){
			poka.pok = false;
			var dat = "";
			$('div#druk_nieob').html(dat);
			//reset tablicy do wykresow niepracujacych, zeby wylaczalo wykres przy chowaniu listy niepracujacych
			poka.wnieprac = [];
			$.plot($("#placeholder2"), poka.wnieprac, {lines: {show:true, fill: true }}); //, points: {show:true, radius: 2}   });
		}
		else{
			poka.pok = true;
			niepracujacyView();
		};		
	});
	$("button.bb").click(function(){
		poka.ph = true;
		//odswiez
		przelad();
	});
	$("button.bb_e").click(function(){
		poka.ph = false;
		//odswiez
		przelad();
	});
	//przycisk reset
	$("button.eee").click(function(){
		reset_prac();
		poka.ph = false;
		poka.pok = false;
		var dat = "";
		$('div#druk_nieob').html(dat);
		poka.wnieprac = [];
		$.plot($("#placeholder2"), poka.wnieprac, {lines: {show:true, fill: true }});
		przelad();
	});
	
});