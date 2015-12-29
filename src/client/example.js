var example = angular.module('example', ['ngZen'])

example.config(['ngZenActionsProvider', function (ngZenActionsProvider) {

	var VisibilityActions = {
		visible: true,
		toggleVisibility: function () {
			this.visible = !this.visible
		}
	}

	var SetAndGetActions = {
		getProperty: function (key) {
			return this[key]
		},
		setProperty: function (key, value) {
			this[key] = value
		}
	}

	var EventGetActions = {

		getInputValue: function (event) {
			var value;
			if (event && event.target) {
				value = event.target.value
			}
			return value
		},

		inputValueSet: function (key, event) {
			var value = this.getInputValue(event)
			this[key] = value
		}

	}

	var CollectionActions = {
		collection: [],

		removeItemFromCollection: function (index) {
			if (this.collection && this.collection[index]) {
				this.collection.splice(index, 1)
			}
		},

		addItemToCollection: function (item) {
			this.collection.push(item)
		}

	}

	var ElementGetActions = {
		getChild: function (element, child) {
			if (_.isFunction(element.children)) {
				return element.children().eq(child)
			}
		}
	}

	var Mixins = {
		"SET_GET_ACTIONS":     SetAndGetActions,
		"VISIBILITY_ACTIONS":  VisibilityActions,
		"EVENT_GET_ACTIONS":   EventGetActions,
		"COLLECTION_ACTIONS":  CollectionActions,
		"ELEMENT_GET_ACTIONS": ElementGetActions
	}
	_.mapObject(Mixins, function (value, key) {
		ngZenActionsProvider.registerMixin(key, value)
	})
}])

