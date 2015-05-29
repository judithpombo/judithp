var Contactos = {
			index: window.localStorage.getItem("Contactos:index"),
			$table: document.getElementById("tabla"),
			$form: document.getElementById("form"),
			$button_save: document.getElementById("guardar"),
			$button_discard: document.getElementById("borrar"),

			init: function() {
				// Inicializa storage index
				if (!Contactos.index) {
					window.localStorage.setItem("Contactos:index", Contactos.index = 1);
				}

				// Inicializa el formulario
				Contactos.$form.reset();
				Contactos.$button_discard.addEventListener("click", function(event) {
					Contactos.$form.reset();
					Contactos.$form.id_entry.value = 0;
				}, true);
				Contactos.$form.addEventListener("submit", function(event) {
					var entry = {
						id: parseInt(this.id_entry.value),
						first_name: this.first_name.value,
						last_name: this.last_name.value,
						email: this.email.value
					};
					if (entry.id == 0) { // add
						Contactos.storeAdd(entry);
						Contactos.tableAdd(entry);
					}
					else { // edit
						Contactos.storeEdit(entry);
						Contactos.tableEdit(entry);
					}

					this.reset();
					this.id_entry.value = 0;
					event.preventDefault();
				}, true);

				// initialize table
				if (window.localStorage.length - 1) {
					var Contactos_list = [], i, key;
					for (i = 0; i < window.localStorage.length; i++) {
						key = window.localStorage.key(i);
						if (/Contactos:\d+/.test(key)) {
							Contactos_list.push(JSON.parse(window.localStorage.getItem(key)));
						}
					}

					if (Contactos_list.length) {
						Contactos_list
							.sort(function(a, b) {
								return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
							})
							.forEach(Contactos.tableAdd);
					}
				}
				Contactos.$table.addEventListener("click", function(event) {
					var op = event.target.getAttribute("data-op");
					if (/Editar|Eliminar/.test(op)) {
						var entry = JSON.parse(window.localStorage.getItem("Contactos:"+ event.target.getAttribute("data-id")));
						if (op == "Editar") {
							Contactos.$form.first_name.value = entry.first_name;
							Contactos.$form.last_name.value = entry.last_name;
							Contactos.$form.email.value = entry.email;
							Contactos.$form.id_entry.value = entry.id;
						}
						else if (op == "Eliminar") {
							if (confirm('¿Seguro quieres eliminar este registro "'+ entry.first_name +' '+ entry.last_name +'" de tus  Contactos?')) {
								Contactos.storeRemove(entry);
								Contactos.tableRemove(entry);
							}
						}
						event.preventDefault();
					}
				}, true);
			},

			storeAdd: function(entry) {
				entry.id = Contactos.index;
				window.localStorage.setItem("Contactos:index", ++Contactos.index);
				window.localStorage.setItem("Contactos:"+ entry.id, JSON.stringify(entry));
			},
			storeEdit: function(entry) {
				window.localStorage.setItem("Contactos:"+ entry.id, JSON.stringify(entry));
			},
			storeRemove: function(entry) {
				window.localStorage.removeItem("Contactos:"+ entry.id);
			},

			tableAdd: function(entry) {
				var $tr = document.createElement("tr"), $td, key;
				for (key in entry) {
					if (entry.hasOwnProperty(key)) {
						$td = document.createElement("td");
						$td.appendChild(document.createTextNode(entry[key]));
						$tr.appendChild($td);
					}
				}
				$td = document.createElement("td");
				$td.innerHTML = '<a data-op="Editar" data-id="'+ entry.id +'">Editar</a> | <a data-op="Eliminar" data-id="'+ entry.id +'">Eliminar</a>';
				$tr.appendChild($td);
				$tr.setAttribute("id", "entry-"+ entry.id);
				Contactos.$table.appendChild($tr);
			},
			tableEdit: function(entry) {
				var $tr = document.getElementById("entry-"+ entry.id), $td, key;
				$tr.innerHTML = "";
				for (key in entry) {
					if (entry.hasOwnProperty(key)) {
						$td = document.createElement("td");
						$td.appendChild(document.createTextNode(entry[key]));
						$tr.appendChild($td);
					}
				}
				$td = document.createElement("td");
				$td.innerHTML = '<a data-op="Editar" data-id="'+ entry.id +'">Editar</a> | <a data-op="Eliminar" data-id="'+ entry.id +'">Eliminar</a>';
				$tr.appendChild($td);
			},
			tableRemove: function(entry) {
				Contactos.$table.removeChild(document.getElementById("entry-"+ entry.id));
			}
                       
		};
                  function localizar()
        {
           navigatior.geolocation.getCurrentPosition(mapa,error); 
            
        }
        function mapa (pos)
        {
            var latitud = pos.coords.latitude;
            var longitud = pos.coords.longitude;
            var precision = pos.coords.accuracy;
            alert("lat ="+latitud+"long="+longitud+"precision="+precision);
       }     
      function error(errorC)
      {
       if(errorC.code == 0)
       alert("error desconocido");
   else if (errorC.code == 1 )
       alert("no me dejaste ubicarte");
   else if (errorC.code == 2 )
       alert("posicion no disponible");
   else if (errorC.code == 3 )
       alert("me rendi");
   var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;	
}
   
   
      }
		Contactos.init();