(function($){
	"use strict";
	var global_player = $('<div id="global_player"><h4><span class="time"></span></h4><audio controls="controls" preload="metadata" src=""></audio></div>');
	$("body").append(global_player);
	
	$(document).ready(function(){
		$("div.audio").each(function(){
			var a_tag = $(this).find('a.play_btn');
			a_tag.click(function(){
				global_player.show();
				window.showLoading(a_tag);
				$(global_player).find('h4').text($(this).attr('alt'));
				global_player.find('audio').prop('src',$(this).attr('data-file'));
				global_player.find('audio').trigger('load');
				global_player.find('audio').trigger('play');
				window.showAudioTime(global_player.find('audio'));
				window.hideLoading(global_player.find('audio'),a_tag);
			});
		});
	});
	
	window.showLoading = function(a_tag){
		a_tag.addClass('loading');
	};
	window.hideLoading = function(audio,a_tag){
		if (audio !== 'undefined' && audio[0].readyState !== 4){
			a_tag.removeClass('loading');
		}
	};
	window.showAudioTime = function(audio){
		if (audio !== 'undefined' && audio[0].readyState !== 4){
			setTimeout(function(){
				window.showAudioTime(audio);
			},500);
			return false;
		}
		var length = Math.round(audio.prop('duration'));
		var mins = Math.floor(length/60);
		var secs = length - (mins*60);
		global_player.find('h4').append('<span class="time"> ('+mins+':'+secs+')</span>');
	};
}(jQuery));