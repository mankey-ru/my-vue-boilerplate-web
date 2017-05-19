<script>
	import mixins from './../vue-mixins.js' // глобальные миксины
	import request from 'superagent' // плагин для аякса

	export default {
		name: 'MainPage',
		data: function () {
			return {
				search: {
					text: ''
				},
				mylist: []
			}
		},
		computed: {
			// здесь будут вычисляемые свойства, например в data есть некий текст, здесь можно выводить его длину
			filteredList: function(){
				if (!this.search.text) {
					return this.mylist
				}
				else {
					return this.mylist.filter((item)=>{
						return item.name.indexOf(this.search.text)>0
					})
				}
				
			}
		},
		methods: {
			// здесь будут методы, например "получить список чего-либо" или "удалить из списка некий элемент"	
			fetchList: function () {
				request.get('https://jsonplaceholder.typicode.com/comments')
				.end((err, res) => {
					if (err) {
						console.log(err);
						return
					}
					this.mylist = res.body;
				})
			},
			filterList: function(){

			}
		},
		mixins: [mixins], // глобальные миксины
		components: {
			// здесь будут подключаемые компоненты, например дейтпикер
		},
		mounted: function () {
			// здесь код который выполняется при инициализации данного компонента
			this.fetchList();
		}
	}
</script>

<template>
	<div>
		<h1>{{$route.meta.title}}</h1>
		<form class="anyClass">
			<input placeholder="Фильтр" v-model="search.text" /> 
		</form>
		<h4 v-if="mylist.length===0">Загрузка...</h4>
		<table v-else>
			<tr v-for="myitem in filteredList">
				<td class="idCol">
					{{myitem.id}}
				</td>
				<td>
					{{myitem.name}}
				</td>
			</tr>
		</table>
	</div>
</template>

<style scoped lang="less"> 
/*
	здесь стили для
	атрибут scoped указывает на то что стили 
	будут применены только к элементам данного компонента
	т.е. никакой БЭМ и префиксы не нужны
	если ВДРУГ помимо scoped-стиля нужно переопределить что-то глобальное
	то можно написать вторую секцию style без атрибута scoped
	*/
	.anyClass {
		padding-bottom: 1em;
	}
	.idCol {
		font-weight: bold;
		padding-right: 2em;
	}
</style>