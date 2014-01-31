	var api = {
		client : function (method, callback, opt) {
			if (!opt) {
				opt = {test: 'test'};
			}
			var url = 'http://prettylovable.com/api/' + method;
			$.ajax({
				type: 'post',
				async: false,
				url: url,
				data: opt,
				dataType: 'json',
				success: function(response) {
					try {
						if (response.hasOwnProperty('error')) {
							throw {name: response.error, message: response.message};
						}
						callback(response);
						if (response.message) {
						}
					} catch(e) {
					}
				}
			});
		},
		call : function (method, callback, opt) {
			return this.client(method, callback, opt);
		}
	};
	
	var image = {
			next : function() {
				$('#main').attr('src', $('#main').attr('data-next-src'));
				$('#main').attr('data-uid', $('#main').attr('data-next-uid'));
				this.random();
			},
			random : function() {
				api.call('image/random', function(data){
					$('#main').attr('data-next-uid', data.uid);
					$('#main').attr('data-next-src', data.image_url);
					var next_image = new Image();
					next_image.src = data.image_url;
					
				});
				return;
			},
			load : function(uid) {
				api.call('image/get', function(data){
					$('#main').attr('src', data.image_url);
					$('#main').attr('data-uid', data.src);
				}, {image: uid});    
			}
	}
		
	image.random();
	
	if (cards.kik.message) {
		image.load(cards.kik.message.uid);
	} else {
		image.next();
	}
	
	$('#share').on('click', function() {
		cards.kik.send({
	    title : 'Pretty Lovable Pics' ,
	    text  : 'Check this out!'  ,
	    pic   : $('#main').attr('src'),
			big		: true,
	    data  : { uid : $('#main').attr('data-uid') }
		});
  });
	
	$('#next').on('click', function() {
		image.next();
  });
	
	cards.metrics.enableGoogleAnalytics('UA-126218-10', 'kik.prettylovable.com');