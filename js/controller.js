function randd(min, max) {
  return Math.floor(arguments.length > 1 ? (max - min + 1) * Math.random() + min : (min + 1) * Math.random());
};

Vue.component('searchfield', {
	props: {
		id: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: ""
		},
		value: {
			type: String,
			default: ""
		}
	},
	data: function(){
		return {};
	},
	methods: {
		input: function(oEvent){
			this.$emit('input', oEvent.target.value);
		},
		clear: function(){
			this.$emit('input', "");
		},
		random: function(){
			this.$emit('searchrndom');
		}
	},
	computed: {
		innerId: function(){
			return "sf_"+this.id;
		}
	},

	template: `<div :id="id">
	<label class='filterLabel' :for="innerId">{{title}}</label>
	<div style="display: flex">
		<div class="customInput">
			<input :id="innerId" type="text" :value='value' @input="input">
			<span class="cross" @click="clear"></span>
		</div>
		<a href="#random" class="bt flexChild" id="bRandom" title="Случайная черта" @click.stop="random">🎲</a>
	</div>
</div>`
});


Vue.component('comboboxItem', {
	props: {
		val: {
			type: String,
			default: '0'
		},
		title: {
			type: String,
			default: ""
		},
		checked: {
			type: Boolean,
			default: false
		}
	},
	data: function(){
		return {};
	},
	methods: {
		labelClick: function(oEvent){
			this.$emit('lclick', this.val);
		}
	},
	computed: {
		id: function(){
			return "ch_"+this.val;
		}
	},
	created: function(){
		
	},
	template: `<div>
	<input type="checkbox" :value="val" :id="id" :checked="checked">
	<label data-hierarchy="root" v-html="title" @click="labelClick"></label>
</div>`
});

Vue.component('combobox', {
	props: {
		value: {
			type: String,
			default: '0'
		},
		id: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: "#7986CB"
		},
		items: {
			type: Array,
			default: []
		},
		bOpen: {
			type: Boolean,
			default: false
		}
	},
	data: function(){
		return {
			open: null
		};
	},
	computed: {
		isOpen: function(){
			return (this.open!=null)?this.open : this.bOpen || false;
		}
	},
	methods: {
		toggle: function(){
			this.open = !this.open;
			let el = $("#"+this.id).find(".combo_box_content");
			if(this.open) {
				el.slideDown();
			} else {
				el.slideUp();
			}
		},
		itemclick: function(oEvent){ 
			this.$emit('iclick', oEvent);
		}
	},
	mounted: function(){
		if(!this.isOpen){
			let el = $("#"+this.id).find(".combo_box_content");
			el.hide();
		}
	},
	template: `<div :id="id" class="combo_box" :data-text="title" >
	<div class="combo_box_title" @click="toggle">{{title}}</div>
		<div class="combo_box_content">
			<comboboxItem v-for="item in items"
				:key="item.key"
				:val="item.key"
				:checked="item.checked"
				:title="item.title"
				@lclick="itemclick"
			>
			</comboboxItem>
		</div>
	<div class="combo_box_arrow" @click="toggle">
		<span class="arr_down" v-show="!isOpen">
			<i class="fa fa-arrow-down"></i>
		</span>
		<span class="arr_up" v-show="isOpen">
			<i class="fa fa-arrow-up"></i>
		</span>
	</div>
</div>`
});

Vue.component('custom-select', {
	props: {
		selected: {
			type: String,
			default: ''
		},
		id: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: "#7986CB"
		},
		items: {
			type: Array,
			default: []
		},
		bOpen: {
			type: Boolean,
			default: false
		}
	},
	data: function(){
		return {
			open: null
		};
	},
	computed: {
		isOpen: function(){
			return (this.open!=null)?this.open : this.bOpen || false;
		}
	},
	methods: {
		toggle: function(){
			this.open = !this.open;
			let el = $("#"+this.id).find(".list");
			if(this.open) {
				el.slideDown(200);
			} else {
				el.slideUp(300);
			}
		},
		itemclick: function(sKey){ 
			this.toggle();
			this.$emit('iclick', sKey);
		}
	},
	mounted: function(){
		if(!this.isOpen){
			let el = $("#"+this.id).find(".combo_box_content");
			el.hide();
		}
	},
	template: `<div :id="id">
	<label class='filterLabel'>{{title}}</label>
	<button  class="customSelect" @click="toggle">
		<div class="label">{{selected}}</div>
		<ul class="list" style="display: none;">
			<li 
				v-for="item in items"
				:key="item.key"
				class="option"
				@click.stop="itemclick(item.key)"
				>{{item.title}}</li>
		</ul>
	</button>
</div>`
});

Vue.component('card', {
	props: {
		name: {
			type: String,
			default: ""
		},
		text: {
			type: String,
			default: ""
		},
		src: {
			type: String,
			default: ""
		},
		source: {
			type: String,
			default: ""
		},
		type: {
			type: String,
			default: ""
		},
		pre: {
			type: String,
			default: ""
		}
	},
	data: function(){
		return {
			
		};
	},
	computed: {
		srcTitle: function(){
			return "Источник: "+ this.source;
		}
	},
	methods: {
		
	},

	template: `<div  class="cardContainer textView">
	<div class='ItemCard'>
		<div class="content">
			<div class='header_info'>
				<h1>{{name}}</h1>
				<div>{{type}}</div>
				<div>{{pre}}</div>
			</div>
			<div v-html="text" class='info'></div>
			<div class='source' :title="srcTitle">{{src}}</div>
		</div>
	</div>
</div>`
});
	
  var app = new Vue({
    el: '#app',
    data: {
			selectedLanguage: "ru",
			aSources: oSources,
			aTypes: oTypes,
			aLanguages: oLanguages,
			aItems: allItems,
			sLang: "ru",
			sSearch: ""
    },

		computed: {
			aSrcList: function(){
				let a=[];
				for (var key in this.aSources){
					if(this.aSources[key].visible !== false){
						a.push({
							key: key,
							title: this.aSources[key].text.en.title + "<br>" + this.aSources[key].text.ru.title,
							checked: this.aSources[key].checked
						});
					}
				}
				return a;
			},
			aSrcSelected: function(){
				let aFiltered = this.aSrcList.filter(item => item.checked);
				return (aFiltered.length>0)? aFiltered.map(item => item.key) : this.aSrcList.map(item => item.key);
			},
			aTypeList: function(){
				let a=[];
				for (var key in this.aTypes){
					if(this.aTypes[key].visible !== false){
						a.push({
							key: key,
							title: this.aTypes[key].text.en.title + "<br>" + this.aTypes[key].text.ru.title,
							checked: this.aTypes[key].checked
						});
					}
				}
				return a;
			},
			aTypeSelected: function(){
				let aFiltered = this.aTypeList.filter(item => item.checked);
				return (aFiltered.length>0)? aFiltered.map(item => item.key) : this.aTypeList.map(item => item.key);
			},
			aLanguageList: function(){
				let a=[];
				for (var key in this.aLanguages){
					if(this.aLanguages[key].visible !== false){
						a.push({
							key: key,
							title: this.aLanguages[key].text[this.sLang].title
						});
					}
				}
				return a;
			},
			sLangSelected: function(){
				return this.aLanguages[this.sLang].text[this.sLang].title;
			},
			
			sNameInput: function(){
				return this.sSearch.toLowerCase();
			},
			
			aItemsList: function(){
				let aFiltered = this.aItems.filter(function(oItem){
					return (
						this.aSrcSelected.indexOf(oItem.en.source)>-1 && 
						this.aTypeSelected.indexOf(oItem.en.type)>-1 && 
							(
							oItem.en.name.toLowerCase().indexOf(this.sNameInput)>-1 || 
							oItem.ru.name.toLowerCase().indexOf(this.sNameInput)>-1
							)
						) 
				}.bind(this));
				return aFiltered.map(function(oItem){
					let o={
						"name": oItem[this.sLang].name || oItem.en.name,
						"text": oItem[this.sLang].text || oItem.en.text,
						"src": oItem[this.sLang].source || oItem.en.source,
						"source": this.aSources[oItem.en.source].text[this.sLang].title,
						"type": this.aTypes[oItem.en.type].text[this.sLang].title
					};
					if(oItem[this.sLang].pre || oItem.en.pre) {
						o.pre = oItem[this.sLang].pre || oItem.en.pre;
					}
					return o;
				}.bind(this));
			}
		},
		mounted: function() {
			this.hideInfo();
		},
		methods: {
			onSourceChange: function(sKey){
				this.aSources[sKey].checked = !this.aSources[sKey].checked; 
				//this.filterCards();
			},
			onTypeChange: function(sKey){
				this.aTypes[sKey].checked = !this.aTypes[sKey].checked; 
				//this.filterCards();
			},
			onLanguageChange: function(sKey){
				//this.aTypes[sKey].checked = !this.aTypes[sKey].checked; 
				//this.filterCards();
				this.sLang = sKey;
				
			},
			onSearchName: function(sValue){
				//this.aTypes[sKey].checked = !this.aTypes[sKey].checked; 
				//this.filterCards();
				this.sSearch = sValue;
			},
			getRandomItem: function(){
				this.sSearch = "";
				this.sSearch = this.aItemsList[randd(0, this.aItemsList.length-1)].name;
			},
			
			hideInfo(){
				$("#info_text").hide();
			}
		}
  });