var FuryPopup = {
	initial:function(){
		var mainElem = document.getElementById("info-fury-mainPop");
		this.addListenerToOptions(mainElem)
		
	},
	addListenerToOptions:function(mainElem){
		optionElems = mainElem.children;
		console.log(optionElems);
		var self = this;
		for(var idx = 0 ; idx < optionElems.length;idx++){
			console.log(optionElems[idx])
			optionElems[idx].addEventListener("click",self.selectOption);
		}
	},
	selectOption:function(e){
		window.close();
		var port = chrome.extension.connect({name:e.target.id});
	}
}
FuryPopup.initial();

